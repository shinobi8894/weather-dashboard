import { WeatherAdapter, WeatherResponse, WeatherCondition, TemperatureUnit } from '@/types/weather';

interface OpenWeatherResponse {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: { speed: number };
  dt: number;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    pop?: number;
  }>;
}

export class OpenWeatherAdapter implements WeatherAdapter {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  getName(): string {
    return 'OpenWeatherMap';
  }

  private normalizeCondition(condition: string): WeatherCondition {
    const normalized = condition.toLowerCase();
    if (normalized.includes('clear')) return 'clear';
    if (normalized.includes('cloud')) return 'clouds';
    if (normalized.includes('rain')) return 'rain';
    if (normalized.includes('drizzle')) return 'drizzle';
    if (normalized.includes('thunder')) return 'thunderstorm';
    if (normalized.includes('snow')) return 'snow';
    if (normalized.includes('mist')) return 'mist';
    if (normalized.includes('fog')) return 'fog';
    if (normalized.includes('haze')) return 'haze';
    if (normalized.includes('dust')) return 'dust';
    if (normalized.includes('sand')) return 'sand';
    if (normalized.includes('smoke')) return 'smoke';
    return 'clear';
  }

  async fetchWeather(city: string, unit: TemperatureUnit): Promise<WeatherResponse> {
    const units = unit === 'celsius' ? 'metric' : 'imperial';

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${this.apiKey}`
      ),
      fetch(
        `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${this.apiKey}`
      ),
    ]);

    if (!currentResponse.ok) {
      const error = await currentResponse.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch weather data');
    }

    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const currentData: OpenWeatherResponse = await currentResponse.json();
    const forecastData: OpenWeatherForecastResponse = await forecastResponse.json();

    const dailyForecasts = new Map<string, typeof forecastData.list[0]>();
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!dailyForecasts.has(date) || new Date(item.dt * 1000).getHours() === 12) {
        dailyForecasts.set(date, item);
      }
    });

    const forecast = Array.from(dailyForecasts.values())
      .slice(0, 5)
      .map(item => ({
        date: new Date(item.dt * 1000).toISOString().split('T')[0],
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        condition: this.normalizeCondition(item.weather[0].main),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        precipitationChance: item.pop ? Math.round(item.pop * 100) : undefined,
      }));

    return {
      current: {
        city: currentData.name,
        country: currentData.sys.country,
        temperature: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        condition: this.normalizeCondition(currentData.weather[0].main),
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed),
        pressure: currentData.main.pressure,
        icon: currentData.weather[0].icon,
        timestamp: currentData.dt,
      },
      forecast,
    };
  }
}
