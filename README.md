# Weather Dashboard ☀️

A beautiful, production-grade weather dashboard built with Next.js 15, TypeScript, and TailwindCSS. Features dynamic theming based on weather conditions and temperature, real-time forecasts from multiple providers, and full keyboard navigation.

![Weather Dashboard](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-f38020?style=for-the-badge&logo=cloudflare)

## ✨ Features

### Core Functionality
- 🌍 **City Search**: Search for any city worldwide and get real-time weather data
- 🔄 **Dual Provider Support**: Switch between OpenWeatherMap and WeatherAPI.com
- 📊 **5-Day Forecast**: Detailed forecast with temperature ranges and precipitation chances
- 🌡️ **Temperature Toggle**: Switch between Celsius and Fahrenheit
- 💾 **Offline-First Caching**: Keeps last successful fetch for offline access

### Design & UX
- 🎨 **Dynamic Theming**: Background and colors adapt to weather conditions
- 🌈 **Temperature-Based Hues**: Color intensity and hue shift based on temperature
- ✨ **Smooth Transitions**: Framer Motion animations throughout
- 📱 **Fully Responsive**: Beautiful on mobile, tablet, and desktop
- ⌨️ **Keyboard Navigation**: Complete keyboard control with shortcuts overlay
- ♿ **Accessible**: ARIA labels, focus management, and semantic HTML

### Technical Excellence
- 🏗️ **Adapter Pattern**: Clean architecture for swappable weather providers
- 🚀 **Cloudflare Workers**: Deployed with OpenNext adapter
- 🔒 **Type-Safe**: Full TypeScript coverage
- 🎯 **Production-Ready**: Error handling, loading states, and edge cases covered

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- API keys from weather providers (see below)

### 1. Clone and Install

```bash
git clone <repository-url>
cd weather-dashboard
npm install
```

### 2. Get API Keys

**OpenWeatherMap** (Primary Provider)
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key from your dashboard

> **Important**: This app uses the **FREE tier** API 2.5 endpoints (`/data/2.5/weather` and `/data/2.5/forecast`), NOT the paid One Call API 3.0. Your free API key will work perfectly!

**WeatherAPI.com** (Secondary Provider)
1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Copy your API key from the dashboard

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_key_here
NEXT_PUBLIC_WEATHERAPI_KEY=your_weatherapi_key_here
NEXT_PUBLIC_DEFAULT_CITY=London
```

> **Note**: At least one API key is required. The app will automatically detect available providers.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## ☁️ Cloudflare Deployment

This project uses the OpenNext Cloudflare adapter for seamless deployment to Cloudflare Workers.

### Build for Cloudflare

```bash
npm run pages:build
```

This generates a `.open-next/worker` directory optimized for Cloudflare Workers.

### Deploy to Cloudflare

1. **Install Wrangler** (if not already installed):
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

3. **Configure wrangler.toml** (already set up):
```toml
name = "weather-dashboard"
compatibility_date = "2024-10-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".open-next/worker"
```

4. **Deploy**:
```bash
npm run pages:deploy
```

Or manually:
```bash
wrangler pages deploy .open-next/worker --project-name=weather-dashboard
```

### Environment Variables on Cloudflare

Add your environment variables in the Cloudflare dashboard:

1. Go to Workers & Pages > weather-dashboard
2. Navigate to Settings > Environment Variables
3. Add:
   - `NEXT_PUBLIC_OPENWEATHER_API_KEY`
   - `NEXT_PUBLIC_WEATHERAPI_KEY`
   - `NEXT_PUBLIC_DEFAULT_CITY` (optional)

### Test Locally with Wrangler

```bash
npm run pages:dev
```

This runs the app locally using the Cloudflare Workers runtime.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `Esc` | Clear search / Close dialogs |
| `?` | Toggle shortcuts menu |
| `C` | Toggle Celsius/Fahrenheit |
| `Tab` | Navigate between elements |
| `Enter` | Search for city |

## 🏗️ Architecture

### Project Structure

```
weather-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles with CSS variables
├── components/
│   ├── search-bar.tsx      # City search component
│   ├── weather-card.tsx    # Current weather display
│   ├── forecast-card.tsx   # 5-day forecast
│   ├── settings-panel.tsx  # Unit and provider settings
│   ├── keyboard-shortcuts.tsx  # Shortcuts overlay
│   ├── error-state.tsx     # Error handling UI
│   ├── loading-state.tsx   # Loading animations
│   └── empty-state.tsx     # Initial state
├── lib/
│   ├── weather/
│   │   ├── openweather-adapter.ts   # OpenWeatherMap implementation
│   │   ├── weatherapi-adapter.ts    # WeatherAPI implementation
│   │   └── weather-service.ts       # Service layer with caching
│   ├── theme/
│   │   └── weather-theme.ts         # Dynamic theming system
│   └── utils.ts            # Utility functions
├── types/
│   └── weather.ts          # TypeScript definitions
├── wrangler.toml           # Cloudflare Workers config
├── next.config.ts          # Next.js configuration
└── tailwind.config.ts      # Tailwind configuration
```

### Adapter Pattern

The weather service uses the adapter pattern to support multiple providers:

```typescript
interface WeatherAdapter {
  fetchWeather(city: string, unit: TemperatureUnit): Promise<WeatherResponse>;
  getName(): string;
}
```

**Benefits**:
- Easy to add new providers
- Consistent data format across providers
- Provider-specific logic isolated
- Swappable at runtime

### Theming System

Dynamic themes are generated based on:
1. **Weather Condition**: Base colors for clear, rain, snow, etc.
2. **Temperature**: Hue shifts and intensity adjustments
3. **CSS Variables**: Smooth transitions between themes

```typescript
const theme = getWeatherTheme(condition, temperature, isCelsius);
applyTheme(theme); // Updates CSS variables
```

### Caching Strategy

- **Local Storage**: 10-minute cache per city/provider/unit
- **Offline Support**: Falls back to stale cache on error
- **Automatic Invalidation**: Cache expires after duration

## 🎨 Design Decisions

### Color System
- **Clear/Sunny**: Blue with warm orange accents (intensity increases with heat)
- **Rainy**: Deep blue with subtle gradients
- **Cloudy**: Neutral grays with soft tones
- **Snow**: Light blues and whites
- **Storms**: Dark grays with yellow accents
- **Temperature Hues**: Reds for hot, blues for cold

### Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Hover States**: Scale and shadow effects for interactivity
- **Loading**: Animated clouds with staggered delays
- **Theme Transitions**: 0.8s cubic-bezier for smooth color changes

### Accessibility
- **ARIA Labels**: All interactive elements labeled
- **Focus Management**: Visible focus indicators
- **Keyboard Navigation**: Complete keyboard control
- **Semantic HTML**: Proper heading hierarchy
- **Color Contrast**: WCAG AA compliance

## 📦 Dependencies

### Core
- **next**: ^15.0.0
- **react**: ^19.0.0
- **typescript**: ^5

### UI & Styling
- **tailwindcss**: ^3.4.1
- **framer-motion**: ^11.5.4 (animations)
- **lucide-react**: ^0.390.0 (icons)

### Deployment
- **@opennextjs/cloudflare**: ^0.2.0 (Cloudflare adapter)
- **wrangler**: ^3.78.0 (Cloudflare CLI)

## 🔧 Configuration

### Next.js Config
- Remote image patterns for weather icons
- Optimized for Cloudflare Workers

### Tailwind Config
- Custom animations (fade-in, slide-in, pulse-slow)
- CSS variable integration
- Extended color palette

### TypeScript Config
- Strict mode enabled
- Path aliases (`@/*`)
- ES2017 target for Workers compatibility

## 🌐 API Information

### Rate Limits
- **OpenWeatherMap Free**: 1,000 calls/day, 60 calls/minute
- **WeatherAPI Free**: 1,000,000 calls/month

### Data Accuracy
Both providers offer accurate, real-time data. OpenWeatherMap has broader global coverage, while WeatherAPI provides more detailed forecast data.

## 🐛 Troubleshooting

### "Provider not configured" Error
- Ensure API keys are in `.env.local`
- Restart dev server after adding keys
- Check keys are prefixed with `NEXT_PUBLIC_`

### Cloudflare Deployment Issues
- Verify `wrangler.toml` is correctly configured
- Check environment variables in Cloudflare dashboard
- Ensure compatibility flags are set

### Build Errors
- Clear `.next` and `.open-next` directories
- Delete `node_modules` and reinstall
- Check Node.js version (18+ required)

## 📝 License

MIT License - feel free to use this project for learning or production.

## 🙏 Acknowledgments

- Weather data from [OpenWeatherMap](https://openweathermap.org/) and [WeatherAPI.com](https://www.weatherapi.com/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Cloudflare Workers](https://workers.cloudflare.com/)

---

Built with ❤️ for the Frontend Lead Challenge
