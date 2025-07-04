async function getWeather() {
  const output = document.getElementById("output");

  if (!navigator.geolocation) {
    output.innerHTML = "❌ Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = '301c03e3ddbb7ef85822c2f86bd28a33'; 

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API request failed.");
      }

      const data = await response.json();
      const weather = data.weather?.[0]?.main || "Unknown";

      let song = "";

      switch (weather.toLowerCase()) {
        case "clear":
          song = "☀️ Sunny – ‘Here Comes the Sun’ by The Beatles";
          break;
        case "rain":
          song = "🌧️ Rain – ‘Set Fire to the Rain’ by Adele";
          break;
        case "clouds":
          song = "☁️ Cloudy – ‘Cloudy Day’ by Tones And I";
          break;
        case "thunderstorm":
          song = "⛈️ Thunderstorm – ‘Thunder’ by Imagine Dragons";
          break;
        case "snow":
          song = "❄️ Snow – ‘Let It Snow’ by Dean Martin";
          break;
        default:
          song = `🌈 Weather: ${weather} – Pick any song you like! 🎵`;
      }

      output.innerHTML = `
        <p>📍 Location: <b>${data.name}</b></p>
        <p>🌡️ Temperature: <b>${data.main.temp}°C</b></p>
        <p>☁️ Current Weather: <b>${weather}</b></p>
        <p>🎶 Suggested Song: <b>${song}</b></p>
      `;
    } catch (err) {
      console.error(err);
      output.innerHTML = "❌ Error fetching weather data.";
    }
  }, (error) => {
    output.innerHTML = `❌ Error getting location: ${error.message}`;
  });
}
