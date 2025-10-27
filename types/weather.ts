export type WeatherCondition = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle' 
  | 'thunderstorm' 
  | 'snow' 
  | 'mist' 
  | 'fog' 
  | 'haze'
  | 'dust'
  | 'sand'
  | 'smoke';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
  timestamp: number;
}

export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: WeatherCondition;
  description: string;
  icon: string;
  precipitationChance?: number;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastDay[];
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherAdapter {
  fetchWeather(city: string, unit: TemperatureUnit): Promise<WeatherResponse>;
  getName(): string;
}

export interface WeatherTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  gradientFrom: string;
  gradientTo: string;
}
