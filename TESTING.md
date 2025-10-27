# Testing Guide - Weather Dashboard

Manual testing checklist and scenarios for the Weather Dashboard.

## Prerequisites

Before testing, ensure:
- [x] Dependencies installed (`npm install`)
- [x] API keys configured in `.env.local`
- [x] Dev server running (`npm run dev`)

## 🧪 Functional Testing

### 1. Search Functionality

#### Test Case 1.1: Basic Search
**Steps:**
1. Open app at http://localhost:3000
2. Type "London" in search bar
3. Click "Search" button

**Expected:**
- Loading animation appears
- Weather card displays with London data
- Forecast card shows 5-day forecast
- Theme changes to match weather

**Status:** [ ]

#### Test Case 1.2: Keyboard Search
**Steps:**
1. Press `/` key
2. Search bar gets focus
3. Type "New York"
4. Press Enter

**Expected:**
- Search executes
- New York weather displays
- Previous search cleared

**Status:** [ ]

#### Test Case 1.3: Invalid City
**Steps:**
1. Search for "XYZ123456"
2. Click Search

**Expected:**
- Error state displays
- Friendly error message
- "Try Again" button appears
- Previous weather cleared

**Status:** [ ]

#### Test Case 1.4: Empty Search
**Steps:**
1. Leave search bar empty
2. Try to submit

**Expected:**
- Search button disabled
- No API call made
- No state change

**Status:** [ ]

### 2. Temperature Unit Toggle

#### Test Case 2.1: Celsius to Fahrenheit
**Steps:**
1. Search for any city
2. Note temperature in °C
3. Click Settings ⚙️
4. Click °F button

**Expected:**
- Weather refreshes
- Temperature displays in °F
- Forecast updates to °F
- Wind speed changes to mph

**Status:** [ ]

#### Test Case 2.2: Keyboard Toggle
**Steps:**
1. Press `C` key
2. Unit should toggle

**Expected:**
- Temperature unit switches
- Data refreshes automatically

**Status:** [ ]

### 3. Provider Switching

#### Test Case 3.1: Switch Providers
**Steps:**
1. Search for a city
2. Note weather data
3. Open Settings
4. Switch to different provider

**Expected:**
- Data refreshes from new provider
- May show slightly different values
- UI remains consistent

**Status:** [ ]

#### Test Case 3.2: Single Provider
**Steps:**
1. Configure only one API key
2. Open app

**Expected:**
- Provider selector doesn't appear
- App works with single provider
- No errors

**Status:** [ ]

### 4. Keyboard Shortcuts

#### Test Case 4.1: Shortcuts Modal
**Steps:**
1. Press `?` key

**Expected:**
- Modal opens with shortcuts list
- Backdrop darkens
- Modal centered on screen

**Status:** [ ]

#### Test Case 4.2: Close Modal
**Steps:**
1. Open shortcuts modal
2. Press `Esc` key

**Expected:**
- Modal closes
- Returns to normal view

**Status:** [ ]

#### Test Case 4.3: Click Outside
**Steps:**
1. Open shortcuts modal
2. Click on backdrop

**Expected:**
- Modal closes

**Status:** [ ]

### 5. Caching & Offline

#### Test Case 5.1: Cache Storage
**Steps:**
1. Search for "Paris"
2. Open DevTools → Application → LocalStorage
3. Check for cache entry

**Expected:**
- Entry exists: `weather_cache_paris_{provider}_{unit}`
- Contains weather data
- Has timestamp

**Status:** [ ]

#### Test Case 5.2: Cache Hit
**Steps:**
1. Search for "London"
2. Wait for data
3. Immediately search "London" again

**Expected:**
- Instant response (from cache)
- No API call (check Network tab)
- Same data displays

**Status:** [ ]

#### Test Case 5.3: Offline Mode
**Steps:**
1. Search for a city
2. Open DevTools → Network
3. Set to "Offline"
4. Refresh page
5. Search for same city

**Expected:**
- Cached data displays
- No error message
- Possible "Using cached data" indicator

**Status:** [ ]

#### Test Case 5.4: Stale Cache Fallback
**Steps:**
1. Search for a city
2. Disconnect internet
3. Wait >10 minutes (or change system time)
4. Search again

**Expected:**
- Stale cache used as fallback
- Data still displays
- Possible warning about staleness

**Status:** [ ]

## 🎨 Visual & UI Testing

### 6. Theming

#### Test Case 6.1: Clear Sky Theme
**Steps:**
1. Search for a city with clear weather (e.g., "Dubai")

**Expected:**
- Blue gradient background
- Bright, sunny colors
- Appropriate emoji (☀️)

**Status:** [ ]

#### Test Case 6.2: Rainy Theme
**Steps:**
1. Search for a city with rain

**Expected:**
- Dark blue/gray gradient
- Cool, moody colors
- Rain emoji (🌧️)

**Status:** [ ]

#### Test Case 6.3: Temperature Influence
**Steps:**
1. Search hot city (>30°C)
2. Note warm tones
3. Search cold city (<0°C)
4. Note cool tones

**Expected:**
- Hot: Reds/oranges in theme
- Cold: Deep blues in theme
- Smooth transition between themes

**Status:** [ ]

### 7. Animations

#### Test Case 7.1: Entrance Animations
**Steps:**
1. Search for a city
2. Watch loading animation
3. Watch weather card appear
4. Watch forecast cards stagger in

**Expected:**
- Smooth fade-ins
- No jarring movements
- Staggered delays feel natural

**Status:** [ ]

#### Test Case 7.2: Hover Effects
**Steps:**
1. Hover over metric cards
2. Hover over forecast cards
3. Hover over buttons

**Expected:**
- Scale up slightly
- Shadow increases
- Smooth transition
- Lift effect on cards

**Status:** [ ]

#### Test Case 7.3: Theme Transition
**Steps:**
1. Search city with clear weather
2. Search city with rainy weather
3. Watch background transition

**Expected:**
- Smooth gradient change
- ~0.8s duration
- No flashing or jumping

**Status:** [ ]

### 8. Responsive Design

#### Test Case 8.1: Mobile View (375px)
**Steps:**
1. Open DevTools
2. Toggle device toolbar
3. Select iPhone SE or similar
4. Test all functionality

**Expected:**
- Single column layout
- Readable text
- Forecast cards in 2 columns
- Touch targets large enough
- No horizontal scroll

**Status:** [ ]

#### Test Case 8.2: Tablet View (768px)
**Steps:**
1. Set viewport to 768px width
2. Test all functionality

**Expected:**
- Adjusted layout
- Forecast in 3-4 columns
- Comfortable spacing
- All features accessible

**Status:** [ ]

#### Test Case 8.3: Desktop View (1920px)
**Steps:**
1. Set viewport to 1920px width
2. Test all functionality

**Expected:**
- Full layout visible
- Forecast in 5 columns
- Generous spacing
- Max-width containers prevent stretching

**Status:** [ ]

## ♿ Accessibility Testing

### 9. Keyboard Navigation

#### Test Case 9.1: Tab Order
**Steps:**
1. Load app
2. Press Tab repeatedly
3. Navigate through all interactive elements

**Expected:**
- Logical tab order
- All elements reachable
- Focus indicators visible
- No focus traps

**Status:** [ ]

#### Test Case 9.2: All Shortcuts Work
**Steps:**
Test each shortcut:
- `/` focuses search
- `Esc` clears/closes
- `?` toggles shortcuts
- `C` toggles units
- `Enter` submits search

**Expected:**
- All shortcuts work
- No conflicts
- Context-aware (e.g., ignore when typing)

**Status:** [ ]

### 10. Screen Reader

#### Test Case 10.1: ARIA Labels
**Steps:**
1. Inspect elements in DevTools
2. Check for aria-label attributes

**Expected:**
- Search input has label
- Buttons have labels
- Icons have labels
- Regions have landmarks

**Status:** [ ]

#### Test Case 10.2: Semantic HTML
**Steps:**
1. View page structure in DevTools

**Expected:**
- Proper heading hierarchy (h1, h2, h3)
- Semantic elements (header, main, footer)
- Proper form elements
- Button elements (not divs)

**Status:** [ ]

### 11. Color Contrast

#### Test Case 11.1: WCAG AA Compliance
**Steps:**
1. Use browser extension (e.g., axe DevTools)
2. Run accessibility scan

**Expected:**
- No contrast errors
- Text readable on all backgrounds
- Focus indicators visible

**Status:** [ ]

## 🚀 Performance Testing

### 12. Bundle Size

#### Test Case 12.1: Production Build
**Steps:**
1. Run `npm run build`
2. Check output bundle sizes

**Expected:**
- First Load JS < 200 kB
- Static pages generated
- No build errors

**Status:** [ ]

### 13. Load Time

#### Test Case 13.1: Initial Load
**Steps:**
1. Open DevTools → Network
2. Clear cache
3. Refresh page
4. Check load time

**Expected:**
- Page interactive < 2s
- All resources load
- No 404 errors

**Status:** [ ]

#### Test Case 13.2: API Response Time
**Steps:**
1. Search for a city
2. Check Network tab
3. Note API response time

**Expected:**
- Response < 1s
- No timeout errors
- Proper error handling if slow

**Status:** [ ]

## 🔧 Edge Cases

### 14. Special Cases

#### Test Case 14.1: Very Long City Names
**Steps:**
1. Search for "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch"

**Expected:**
- UI doesn't break
- Text wraps or truncates gracefully
- Still functional

**Status:** [ ]

#### Test Case 14.2: Special Characters
**Steps:**
1. Search for cities with accents: "São Paulo", "Zürich"

**Expected:**
- Searches work correctly
- Characters display properly

**Status:** [ ]

#### Test Case 14.3: Network Interruption
**Steps:**
1. Start a search
2. Disconnect internet mid-request

**Expected:**
- Error state appears
- Helpful error message
- Can retry when online

**Status:** [ ]

#### Test Case 14.4: No API Keys
**Steps:**
1. Remove API keys from .env.local
2. Restart server
3. Try to search

**Expected:**
- Error message: "Provider not configured"
- Instructions to add API key
- No crashes

**Status:** [ ]

## ☁️ Cloudflare Workers Testing

### 15. OpenNext Build

#### Test Case 15.1: Build Succeeds
**Steps:**
1. Run `npm run pages:build`

**Expected:**
- Build completes without errors
- `.open-next/worker` directory created
- All files present

**Status:** [ ]

#### Test Case 15.2: Local Workers
**Steps:**
1. Run `npm run pages:dev`
2. Test app functionality

**Expected:**
- App runs in Workers runtime
- All features work
- No runtime errors

**Status:** [ ]

### 16. Deployment

#### Test Case 16.1: Deploy to Cloudflare
**Steps:**
1. Run `npm run pages:deploy`
2. Visit deployed URL

**Expected:**
- Deployment succeeds
- App accessible at URL
- All features work

**Status:** [ ]

#### Test Case 16.2: Environment Variables
**Steps:**
1. Add env vars in Cloudflare dashboard
2. Redeploy
3. Test app

**Expected:**
- API keys work
- Weather data loads
- No authentication errors

**Status:** [ ]

## 📊 Test Summary

### Coverage
- [ ] Search Functionality (4 tests)
- [ ] Temperature Toggle (2 tests)
- [ ] Provider Switching (2 tests)
- [ ] Keyboard Shortcuts (3 tests)
- [ ] Caching & Offline (4 tests)
- [ ] Theming (3 tests)
- [ ] Animations (3 tests)
- [ ] Responsive Design (3 tests)
- [ ] Keyboard Navigation (2 tests)
- [ ] Screen Reader (2 tests)
- [ ] Color Contrast (1 test)
- [ ] Performance (2 tests)
- [ ] Edge Cases (4 tests)
- [ ] Cloudflare Workers (4 tests)

### Priority
- **High Priority**: Search, Toggle, Theming, Responsive
- **Medium Priority**: Shortcuts, Animations, Caching
- **Low Priority**: Edge cases, Advanced features

## 🐛 Bug Report Template

If you find issues during testing:

```markdown
**Issue**: Brief description

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Behavior**: What should happen

**Actual Behavior**: What actually happens

**Environment**:
- Browser: Chrome/Firefox/Safari
- OS: Windows/Mac/Linux
- Viewport: Mobile/Tablet/Desktop
- API Provider: OpenWeather/WeatherAPI

**Screenshots**: (if applicable)

**Console Errors**: (if any)
```

---

**Happy Testing!** 🧪✨
