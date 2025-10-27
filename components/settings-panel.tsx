'use client';

import { TemperatureUnit } from '@/types/weather';
import { WeatherProvider } from '@/lib/weather/weather-service';
import { motion } from 'framer-motion';
import { Settings, Thermometer, Cloud } from 'lucide-react';
import { useState } from 'react';

interface SettingsPanelProps {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
  provider: WeatherProvider;
  onProviderChange: (provider: WeatherProvider) => void;
  availableProviders: WeatherProvider[];
}

export function SettingsPanel({
  unit,
  onUnitChange,
  provider,
  onProviderChange,
  availableProviders,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getProviderName = (p: WeatherProvider) => {
    return p === 'openweather' ? 'OpenWeatherMap' : 'WeatherAPI';
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white 
                 hover:bg-white/30 transition-all duration-200 shadow-lg"
        aria-label="Settings"
      >
        <Settings size={24} />
      </motion.button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl 
                     shadow-2xl border border-white/50 p-6 z-50"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Settings size={20} />
              Settings
            </h3>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <Thermometer size={16} />
                  Temperature Unit
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUnitChange('celsius')}
                    className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                      unit === 'celsius'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => onUnitChange('fahrenheit')}
                    className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                      unit === 'fahrenheit'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    °F
                  </button>
                </div>
              </div>

              {availableProviders.length > 1 && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Cloud size={16} />
                    Weather Provider
                  </label>
                  <div className="space-y-2">
                    {availableProviders.map((p) => (
                      <button
                        key={p}
                        onClick={() => onProviderChange(p)}
                        className={`w-full py-2 px-4 rounded-xl text-left font-medium transition-all duration-200 ${
                          provider === p
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {getProviderName(p)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
