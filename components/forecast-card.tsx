'use client';

import { ForecastDay, TemperatureUnit } from '@/types/weather';
import { formatDate, getWeatherEmoji } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CloudRain } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastDay[];
  unit: TemperatureUnit;
}

export function ForecastCard({ forecast, unit }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl"
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/30">
        <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center"
            >
              <p className="text-white/90 font-medium mb-3">{formatDate(day.date)}</p>
              <div className="text-4xl mb-3">{getWeatherEmoji(day.condition)}</div>
              <p className="text-sm text-white/70 capitalize mb-3">{day.description}</p>
              <div className="flex justify-center gap-2 items-center mb-2">
                <span className="text-xl font-bold text-white">
                  {day.maxTemp}°
                </span>
                <span className="text-lg text-white/60">
                  {day.minTemp}°
                </span>
              </div>
              {day.precipitationChance !== undefined && day.precipitationChance > 0 && (
                <div className="flex items-center justify-center gap-1 text-xs text-white/70">
                  <CloudRain size={14} />
                  <span>{day.precipitationChance}%</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
