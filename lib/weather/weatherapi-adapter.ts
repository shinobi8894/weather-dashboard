import { WeatherAdapter, WeatherResponse, WeatherCondition, TemperatureUnit } from '@/types/weather';

interface WeatherAPIResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    pressure_mb: number;
    last_updated_epoch: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        daily_chance_of_rain: number;
        daily_chance_of_snow: number;
      };
    }>;
  };
}

export class WeatherAPIAdapter implements WeatherAdapter {
  private apiKey: string;
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  getName(): string {
    return 'WeatherAPI';
  }

  private normalizeCondition(text: string, code: number): WeatherCondition {
    const normalized = text.toLowerCase();
    
    if (code === 1000) return 'clear';
    if ([1003, 1006, 1009].includes(code)) return 'clouds';
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return 'rain';
    if ([1150, 1153, 1168, 1171].includes(code)) return 'drizzle';
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return 'thunderstorm';
    if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(code)) return 'snow';
    if ([1030].includes(code)) return 'mist';
    if ([1135, 1147].includes(code)) return 'fog';
    if (normalized.includes('haze')) return 'haze';
    if (normalized.includes('dust')) return 'dust';
    if (normalized.includes('sand')) return 'sand';
    if (normalized.includes('smoke')) return 'smoke';
    
    return 'clear';
  }

  async fetchWeather(city: string, unit: TemperatureUnit): Promise<WeatherResponse> {
    const response = await fetch(
      `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(city)}&days=5&aqi=no`
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || 'Failed to fetch weather data');
    }

    const data: WeatherAPIResponse = await response.json();
    const isCelsius = unit === 'celsius';

    return {
      current: {
        city: data.location.name,
        country: data.location.country,
        temperature: Math.round(isCelsius ? data.current.temp_c : data.current.temp_f),
        feelsLike: Math.round(isCelsius ? data.current.feelslike_c : data.current.feelslike_f),
        condition: this.normalizeCondition(data.current.condition.text, data.current.condition.code),
        description: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: Math.round(isCelsius ? data.current.wind_kph : data.current.wind_mph),
        pressure: Math.round(data.current.pressure_mb),
        icon: data.current.condition.icon,
        timestamp: data.current.last_updated_epoch,
      },
      forecast: data.forecast.forecastday.map(day => ({
        date: day.date,
        maxTemp: Math.round(isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f),
        minTemp: Math.round(isCelsius ? day.day.mintemp_c : day.day.mintemp_f),
        condition: this.normalizeCondition(day.day.condition.text, day.day.condition.code),
        description: day.day.condition.text,
        icon: day.day.condition.icon,
        precipitationChance: Math.max(day.day.daily_chance_of_rain, day.day.daily_chance_of_snow),
      })),
    };
  }
}
