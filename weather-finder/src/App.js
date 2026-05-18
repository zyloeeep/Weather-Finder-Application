import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '8213b6002fc515a91535b11f4266ca23';

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🌎 Weather App</h1>
  
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Type a city name to see the weather"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="weather-display">
        {loading && <p className="state-message">Loading...</p>}
        
        {error && <p className="state-message error-message">{error}</p>}
        
        {weatherData && !loading && !error && (
          <div className="weather-card">
            <h2 className="city-name">{weatherData.name}, {weatherData.sys?.country}</h2>
            
            <div className="weather-icon-placeholder">☁️</div>
            
            <h3 className="temp">{Math.round(weatherData.main?.temp)}°C</h3>
            <p className="condition">{weatherData.weather[0]?.description}</p>
            
            <div className="extra-info-container">
              <div className="info-item">
                <span className="icon">🌡️</span>
                <small>Feels like</small>
                <p>{Math.round(weatherData.main?.feels_like)}°C</p>
              </div>
              <div className="info-item">
                <span className="icon">💧</span>
                <small>Humidity</small>
                <p>{weatherData.main?.humidity}%</p>
              </div>
              <div className="info-item">
                <span className="icon">💨</span>
                <small>Wind</small>
                <p>{weatherData.wind?.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;