import { TemperatureUnit } from '@/types/weather';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function convertTemperature(temp: number, from: TemperatureUnit, to: TemperatureUnit): number {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  
  return (temp - 32) * 5/9;
}

export function formatTemperature(temp: number, unit: TemperatureUnit): string {
  return `${Math.round(temp)}°${unit === 'celsius' ? 'C' : 'F'}`;
}

export function formatWindSpeed(speed: number, unit: TemperatureUnit): string {
  const speedUnit = unit === 'celsius' ? 'km/h' : 'mph';
  return `${speed} ${speedUnit}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getWeatherEmoji(condition: string): string {
  const emojiMap: Record<string, string> = {
    clear: '☀️',
    clouds: '☁️',
    rain: '🌧️',
    drizzle: '🌦️',
    thunderstorm: '⛈️',
    snow: '❄️',
    mist: '🌫️',
    fog: '🌫️',
    haze: '🌫️',
    dust: '💨',
    sand: '💨',
    smoke: '💨',
  };

  return emojiMap[condition.toLowerCase()] || '🌤️';
}
