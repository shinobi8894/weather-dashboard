'use client';

import { useState, useEffect, useRef } from 'react';
import { WeatherResponse, TemperatureUnit } from '@/types/weather';
import { WeatherProvider, weatherService } from '@/lib/weather/weather-service';
import { getWeatherTheme, applyTheme } from '@/lib/theme/weather-theme';
import { SearchBar } from '@/components/search-bar';
import { WeatherCard } from '@/components/weather-card';
import { ForecastCard } from '@/components/forecast-card';
import { SettingsPanel } from '@/components/settings-panel';
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { EmptyState } from '@/components/empty-state';

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [provider, setProvider] = useState<WeatherProvider>('openweather');
  const [availableProviders, setAvailableProviders] = useState<WeatherProvider[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const providers = weatherService.getAvailableProviders();
    setAvailableProviders(providers);
    if (providers.length > 0 && !providers.includes(provider)) {
      setProvider(providers[0]);
    }
  }, [provider]);

  useEffect(() => {
    if (weather) {
      const theme = getWeatherTheme(
        weather.current.condition,
        weather.current.temperature,
        unit === 'celsius'
      );
      applyTheme(theme);
    }
  }, [weather, unit]);

  useEffect(() => {
    const defaultCity = process.env.NEXT_PUBLIC_DEFAULT_CITY;
    if (defaultCity && !weather && !isLoading) {
      handleSearch(defaultCity);
    }
  }, []);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await weatherService.fetchWeather(city, provider, unit);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnitChange = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    if (weather) {
      handleSearch(weather.current.city);
    }
  };

  const handleProviderChange = (newProvider: WeatherProvider) => {
    setProvider(newProvider);
    if (weather) {
      handleSearch(weather.current.city);
    }
  };

  const toggleUnit = () => {
    handleUnitChange(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const focusSearch = () => {
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    searchInput?.focus();
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Weather Dashboard
            </h1>
            <p className="text-white/80 text-lg">
              Real-time forecasts powered by {weatherService.getProviderName(provider)}
            </p>
          </div>
          
          <div className="flex gap-3">
            <KeyboardShortcuts onToggleUnit={toggleUnit} onFocusSearch={focusSearch} />
            <SettingsPanel
              unit={unit}
              onUnitChange={handleUnitChange}
              provider={provider}
              onProviderChange={handleProviderChange}
              availableProviders={availableProviders}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            placeholder="Search for a city..."
          />

          {isLoading && <LoadingState />}

          {!isLoading && error && (
            <ErrorState error={error} onRetry={() => weather && handleSearch(weather.current.city)} />
          )}

          {!isLoading && !error && !weather && <EmptyState />}

          {!isLoading && !error && weather && (
            <>
              <WeatherCard weather={weather.current} unit={unit} />
              <ForecastCard forecast={weather.forecast} unit={unit} />
            </>
          )}
        </div>

        <footer className="mt-16 text-center text-white/60 text-sm">
          <p>Built with Next.js, TypeScript, and TailwindCSS</p>
          <p className="mt-1">Deployed on Cloudflare Workers</p>
        </footer>
      </div>
    </main>
  );
}
