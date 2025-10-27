import { WeatherAdapter, WeatherResponse, TemperatureUnit } from '@/types/weather';
import { OpenWeatherAdapter } from './openweather-adapter';
import { WeatherAPIAdapter } from './weatherapi-adapter';

export type WeatherProvider = 'openweather' | 'weatherapi';

const CACHE_KEY_PREFIX = 'weather_cache_';
const CACHE_DURATION = 10 * 60 * 1000;

interface CachedData {
  data: WeatherResponse;
  timestamp: number;
  provider: WeatherProvider;
  unit: TemperatureUnit;
  city: string;
}

export class WeatherService {
  private adapters: Map<WeatherProvider, WeatherAdapter>;

  constructor() {
    this.adapters = new Map();
    
    const openWeatherKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const weatherApiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;

    if (openWeatherKey) {
      this.adapters.set('openweather', new OpenWeatherAdapter(openWeatherKey));
    }

    if (weatherApiKey) {
      this.adapters.set('weatherapi', new WeatherAPIAdapter(weatherApiKey));
    }
  }

  getAvailableProviders(): WeatherProvider[] {
    return Array.from(this.adapters.keys());
  }

  private getCacheKey(city: string, provider: WeatherProvider, unit: TemperatureUnit): string {
    return `${CACHE_KEY_PREFIX}${city.toLowerCase()}_${provider}_${unit}`;
  }

  private getFromCache(
    city: string, 
    provider: WeatherProvider, 
    unit: TemperatureUnit
  ): WeatherResponse | null {
    if (typeof window === 'undefined') return null;

    try {
      const cacheKey = this.getCacheKey(city, provider, unit);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;

      const parsedCache: CachedData = JSON.parse(cached);
      const now = Date.now();

      if (now - parsedCache.timestamp > CACHE_DURATION) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return parsedCache.data;
    } catch {
      return null;
    }
  }

  private saveToCache(
    city: string,
    provider: WeatherProvider,
    unit: TemperatureUnit,
    data: WeatherResponse
  ): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheKey = this.getCacheKey(city, provider, unit);
      const cacheData: CachedData = {
        data,
        timestamp: Date.now(),
        provider,
        unit,
        city: city.toLowerCase(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache weather data:', error);
    }
  }

  async fetchWeather(
    city: string,
    provider: WeatherProvider,
    unit: TemperatureUnit,
    useCache = true
  ): Promise<WeatherResponse> {
    const adapter = this.adapters.get(provider);
    
    if (!adapter) {
      throw new Error(`Weather provider "${provider}" is not configured. Please add API key.`);
    }

    if (useCache) {
      const cached = this.getFromCache(city, provider, unit);
      if (cached) {
        return cached;
      }
    }

    try {
      const data = await adapter.fetchWeather(city, unit);
      this.saveToCache(city, provider, unit, data);
      return data;
    } catch (error) {
      const cached = this.getFromCache(city, provider, unit);
      if (cached) {
        console.warn('Using stale cache due to fetch error:', error);
        return cached;
      }
      throw error;
    }
  }

  getProviderName(provider: WeatherProvider): string {
    const adapter = this.adapters.get(provider);
    return adapter?.getName() || provider;
  }
}

export const weatherService = new WeatherService();
