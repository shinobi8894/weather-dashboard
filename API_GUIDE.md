# Weather API Guide

## ✅ Your API Key is Working!

**OpenWeatherMap API Key**: `007069e319348c40934eab31effef161`

This key has been configured in your `.env.local` file and is working correctly!

---

## 🔑 API Endpoints Explained

### ❌ One Call API 3.0 (PAID ONLY)
```
https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={key}
```
**Status**: ❌ Requires paid subscription
**Error**: 401 Unauthorized (Invalid API Key)
**Why**: This is a premium endpoint

### ✅ Current Weather API 2.5 (FREE TIER)
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid={key}
```
**Status**: ✅ Works with free API keys
**Used by**: This application
**Rate Limit**: 1,000 calls/day, 60 calls/minute

### ✅ 5-Day Forecast API 2.5 (FREE TIER)
```
https://api.openweathermap.org/data/2.5/forecast?q=London&appid={key}
```
**Status**: ✅ Works with free API keys
**Used by**: This application
**Rate Limit**: 1,000 calls/day, 60 calls/minute

---

## 🎯 What This App Uses

The Weather Dashboard uses the **FREE tier** APIs:

1. **Current Weather**: `/data/2.5/weather`
   - City name
   - Temperature
   - Feels like
   - Humidity
   - Wind speed
   - Pressure
   - Weather condition

2. **5-Day Forecast**: `/data/2.5/forecast`
   - 5-day forecast
   - 3-hour intervals
   - Max/min temperatures
   - Weather conditions
   - Precipitation probability

---

## 🧪 Test Your API Key

### Test Current Weather
```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=007069e319348c40934eab31effef161"
```

**Expected**: 200 OK with weather data ✅

### Test Forecast
```bash
curl "https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=007069e319348c40934eab31effef161"
```

**Expected**: 200 OK with forecast data ✅

### Test with Units
```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=007069e319348c40934eab31effef161"
```

**Expected**: Temperature in Celsius ✅

---

## 🚀 Run the App

Your API key is now configured! Start the app:

```bash
npm run dev
```

Then open: http://localhost:3000

### What You Can Do:
1. ✅ Search for any city
2. ✅ See current weather
3. ✅ View 5-day forecast
4. ✅ Toggle between °C and °F
5. ✅ See dynamic theming based on weather

---

## 🔄 Get WeatherAPI Key (Optional)

To enable provider switching, get a second API key:

1. Visit: https://www.weatherapi.com/
2. Sign up (free)
3. Copy your API key
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_WEATHERAPI_KEY=your_weatherapi_key_here
   ```
5. Restart dev server

With both keys, you can switch between providers in the app!

---

## 📊 API Rate Limits

### OpenWeatherMap Free Tier
- **Calls per day**: 1,000
- **Calls per minute**: 60
- **Cost**: FREE

### WeatherAPI Free Tier
- **Calls per month**: 1,000,000
- **Cost**: FREE

**The app's caching system helps you stay within limits:**
- 10-minute cache per city
- LocalStorage persistence
- Stale-while-revalidate fallback

---

## ⚠️ Common Issues

### Issue 1: "401 Unauthorized"
**Cause**: Using wrong endpoint (e.g., `/data/3.0/onecall`)
**Solution**: App uses correct endpoints (`/data/2.5/*`)

### Issue 2: "API key not found"
**Cause**: `.env.local` not configured
**Solution**: Already fixed! ✅

### Issue 3: "Provider not configured"
**Cause**: Dev server not restarted after adding key
**Solution**: Restart with `npm run dev`

### Issue 4: Rate limit exceeded
**Cause**: Too many API calls
**Solution**: App caches for 10 minutes to prevent this

---

## 🎉 You're Ready!

Your OpenWeatherMap API key is configured and working correctly!

**Next Steps:**
1. ✅ API key configured
2. ✅ Dev server running
3. 👉 Open http://localhost:3000
4. 👉 Search for a city
5. 👉 Enjoy the app!

**Optional:**
- Get WeatherAPI key for provider switching
- Deploy to Cloudflare (see DEPLOYMENT.md)
- Create GitHub repo (see QUICKSTART.md)

---

**Happy weather tracking!** ☀️🌧️❄️
