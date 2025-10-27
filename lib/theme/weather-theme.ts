import { WeatherCondition, WeatherTheme } from '@/types/weather';

interface TemperatureHue {
  hot: number;
  warm: number;
  mild: number;
  cool: number;
  cold: number;
}

const temperatureHues: TemperatureHue = {
  hot: 15,
  warm: 30,
  mild: 45,
  cool: 200,
  cold: 230,
};

const baseThemes: Record<WeatherCondition, Omit<WeatherTheme, 'gradientFrom' | 'gradientTo'>> = {
  clear: {
    primary: 'rgb(59, 130, 246)',
    secondary: 'rgb(96, 165, 250)',
    accent: 'rgb(251, 191, 36)',
    background: 'rgb(224, 242, 254)',
    foreground: 'rgb(30, 58, 138)',
  },
  clouds: {
    primary: 'rgb(100, 116, 139)',
    secondary: 'rgb(148, 163, 184)',
    accent: 'rgb(203, 213, 225)',
    background: 'rgb(241, 245, 249)',
    foreground: 'rgb(51, 65, 85)',
  },
  rain: {
    primary: 'rgb(59, 130, 246)',
    secondary: 'rgb(37, 99, 235)',
    accent: 'rgb(147, 197, 253)',
    background: 'rgb(219, 234, 254)',
    foreground: 'rgb(30, 64, 175)',
  },
  drizzle: {
    primary: 'rgb(96, 165, 250)',
    secondary: 'rgb(59, 130, 246)',
    accent: 'rgb(186, 230, 253)',
    background: 'rgb(224, 242, 254)',
    foreground: 'rgb(30, 58, 138)',
  },
  thunderstorm: {
    primary: 'rgb(71, 85, 105)',
    secondary: 'rgb(51, 65, 85)',
    accent: 'rgb(251, 191, 36)',
    background: 'rgb(148, 163, 184)',
    foreground: 'rgb(241, 245, 249)',
  },
  snow: {
    primary: 'rgb(147, 197, 253)',
    secondary: 'rgb(186, 230, 253)',
    accent: 'rgb(224, 242, 254)',
    background: 'rgb(241, 245, 249)',
    foreground: 'rgb(30, 58, 138)',
  },
  mist: {
    primary: 'rgb(148, 163, 184)',
    secondary: 'rgb(203, 213, 225)',
    accent: 'rgb(226, 232, 240)',
    background: 'rgb(248, 250, 252)',
    foreground: 'rgb(51, 65, 85)',
  },
  fog: {
    primary: 'rgb(156, 163, 175)',
    secondary: 'rgb(209, 213, 219)',
    accent: 'rgb(229, 231, 235)',
    background: 'rgb(249, 250, 251)',
    foreground: 'rgb(55, 65, 81)',
  },
  haze: {
    primary: 'rgb(161, 161, 170)',
    secondary: 'rgb(212, 212, 216)',
    accent: 'rgb(244, 244, 245)',
    background: 'rgb(250, 250, 250)',
    foreground: 'rgb(63, 63, 70)',
  },
  dust: {
    primary: 'rgb(217, 119, 6)',
    secondary: 'rgb(245, 158, 11)',
    accent: 'rgb(251, 191, 36)',
    background: 'rgb(254, 243, 199)',
    foreground: 'rgb(120, 53, 15)',
  },
  sand: {
    primary: 'rgb(217, 119, 6)',
    secondary: 'rgb(234, 179, 8)',
    accent: 'rgb(250, 204, 21)',
    background: 'rgb(254, 249, 195)',
    foreground: 'rgb(113, 63, 18)',
  },
  smoke: {
    primary: 'rgb(82, 82, 91)',
    secondary: 'rgb(113, 113, 122)',
    accent: 'rgb(161, 161, 170)',
    background: 'rgb(228, 228, 231)',
    foreground: 'rgb(39, 39, 42)',
  },
};

function adjustColorForTemperature(color: string, temperature: number, isCelsius: boolean): string {
  const temp = isCelsius ? temperature : (temperature - 32) * 5 / 9;
  
  let hueShift = 0;
  if (temp >= 30) hueShift = temperatureHues.hot;
  else if (temp >= 20) hueShift = temperatureHues.warm;
  else if (temp >= 10) hueShift = temperatureHues.mild;
  else if (temp >= 0) hueShift = temperatureHues.cool;
  else hueShift = temperatureHues.cold;

  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return color;

  const [, r, g, b] = match.map(Number);
  
  const intensity = Math.abs(temp) / 40;
  const factor = 1 + (intensity * 0.15);
  
  let newR = r, newG = g, newB = b;
  
  if (temp > 15) {
    newR = Math.min(255, r * factor);
    newG = Math.max(0, g * (1 - intensity * 0.1));
  } else if (temp < 5) {
    newB = Math.min(255, b * factor);
    newR = Math.max(0, r * (1 - intensity * 0.1));
  }

  return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
}

export function getWeatherTheme(
  condition: WeatherCondition,
  temperature: number,
  isCelsius = true
): WeatherTheme {
  const baseTheme = baseThemes[condition] || baseThemes.clear;
  
  const adjustedTheme = {
    primary: adjustColorForTemperature(baseTheme.primary, temperature, isCelsius),
    secondary: adjustColorForTemperature(baseTheme.secondary, temperature, isCelsius),
    accent: adjustColorForTemperature(baseTheme.accent, temperature, isCelsius),
    background: adjustColorForTemperature(baseTheme.background, temperature, isCelsius),
    foreground: baseTheme.foreground,
  };

  let gradientFrom = adjustedTheme.primary;
  let gradientTo = adjustedTheme.secondary;

  if (condition === 'clear' && temperature > 25) {
    gradientFrom = 'rgb(251, 191, 36)';
    gradientTo = 'rgb(249, 115, 22)';
  } else if (condition === 'thunderstorm') {
    gradientFrom = 'rgb(30, 41, 59)';
    gradientTo = 'rgb(71, 85, 105)';
  } else if (condition === 'snow') {
    gradientFrom = 'rgb(219, 234, 254)';
    gradientTo = 'rgb(186, 230, 253)';
  }

  return {
    ...adjustedTheme,
    gradientFrom,
    gradientTo,
  };
}

export function applyTheme(theme: WeatherTheme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-background', theme.background);
  root.style.setProperty('--theme-foreground', theme.foreground);
  root.style.setProperty('--theme-gradient-from', theme.gradientFrom);
  root.style.setProperty('--theme-gradient-to', theme.gradientTo);
}
