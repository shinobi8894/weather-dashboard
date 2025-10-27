'use client';

import { WeatherData, TemperatureUnit } from '@/types/weather';
import { formatTemperature, formatWindSpeed, getWeatherEmoji } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, MapPin } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export function WeatherCard({ weather, unit }: WeatherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl"
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <MapPin className="text-white" size={24} />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {weather.city}
              </h2>
              <p className="text-white/80 text-lg">{weather.country}</p>
            </div>
          </div>
          <div className="text-6xl">{getWeatherEmoji(weather.condition)}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl md:text-8xl font-bold text-white">
                {weather.temperature}
              </span>
              <span className="text-4xl text-white/90">
                °{unit === 'celsius' ? 'C' : 'F'}
              </span>
            </div>
            <p className="text-2xl text-white/90 mt-2 capitalize">
              {weather.description}
            </p>
            <p className="text-lg text-white/70 mt-1">
              Feels like {formatTemperature(weather.feelsLike, unit)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="text-white/80" size={20} />
                <span className="text-white/80 text-sm">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Wind className="text-white/80" size={20} />
                <span className="text-white/80 text-sm">Wind</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {formatWindSpeed(weather.windSpeed, unit)}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 col-span-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="text-white/80" size={20} />
                <span className="text-white/80 text-sm">Pressure</span>
              </div>
              <p className="text-2xl font-bold text-white">{weather.pressure} hPa</p>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/60 text-center">
          Last updated: {new Date(weather.timestamp * 1000).toLocaleString()}
        </div>
      </div>
    </motion.div>
  );
}
