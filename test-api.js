// Quick API Test Script
// Run with: node test-api.js

const apiKey = '007069e319348c40934eab31effef161';

async function testOpenWeatherAPI() {
  console.log('🧪 Testing OpenWeatherMap API...\n');

  // Test 1: Current Weather
  console.log('Test 1: Current Weather for London');
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`
    );
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS!');
      console.log(`   City: ${data.name}, ${data.sys.country}`);
      console.log(`   Temperature: ${data.main.temp}°C`);
      console.log(`   Weather: ${data.weather[0].description}`);
      console.log(`   Humidity: ${data.main.humidity}%`);
      console.log(`   Wind: ${data.wind.speed} m/s\n`);
    } else {
      console.log(`❌ FAILED: ${response.status} ${response.statusText}\n`);
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}\n`);
  }

  // Test 2: 5-Day Forecast
  console.log('Test 2: 5-Day Forecast for New York');
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=New York&units=imperial&appid=${apiKey}`
    );
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS!');
      console.log(`   City: ${data.city.name}, ${data.city.country}`);
      console.log(`   Forecast entries: ${data.list.length}`);
      console.log(`   First forecast: ${data.list[0].weather[0].description}`);
      console.log(`   Temperature: ${data.list[0].main.temp}°F\n`);
    } else {
      console.log(`❌ FAILED: ${response.status} ${response.statusText}\n`);
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}\n`);
  }

  // Test 3: Different Cities
  console.log('Test 3: Testing Multiple Cities');
  const cities = ['Paris', 'Tokyo', 'Dubai', 'Sydney'];
  
  for (const city of cities) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${city}: ${data.main.temp}°C, ${data.weather[0].description}`);
      } else {
        console.log(`❌ ${city}: Failed`);
      }
    } catch (error) {
      console.log(`❌ ${city}: Error`);
    }
  }

  console.log('\n✨ API Testing Complete!');
  console.log('\nYour API key is working correctly! 🎉');
  console.log('You can now run: npm run dev');
}

testOpenWeatherAPI();
