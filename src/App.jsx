import { useEffect, useState } from 'react';
import WeatherBackground from './components/WeatherBackground';
import {
  convertTemperature,
  getHumidityValue,
  getWindDirection,
  getVisibilityValue
} from './components/Helper';

import {
  WindIcon,
  HumidityIcon,
  VisibilityIcon,
  SunriseIcon,
  SunsetIcon
} from './components/Icons';

const App = () => {
  // FETCH API KEY
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  if (!API_KEY) {
    console.error("VITE_WEATHER_API_KEY is missing");
  }

  // MANAGE STATE
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [unit, setUnit] = useState('C');
  const [error, setError] = useState('');

  useEffect(() => {
    if (city.trim().length >= 3 && !weather) {
      const timer = setTimeout(() => fetchSuggestions(city), 500);
      return () => clearTimeout(timer);
    }
    setSuggestion([]);
  }, [city, weather]);

  // FETCHES 5 LOCATIONS AND UPDATE FROM API AND UPDATES
  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      if (res.ok) setSuggestion(await res.json());
      else setSuggestion([]);
    } catch {
      setSuggestion([]);
    }
  };


  // THIS WILL FETCH FULL DATA FROM URL
  const fetchWeatherData = async (url, name = '') => {
    setError('');
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error((await response.json()).message || 'City Not Found');
      }
      const data = await response.json();
      setWeather(data);
      setCity(name || data.name);
      setSuggestion([]);
    } catch (err) {
      setError(err.message);
    }
  };

  // THIS FUNCTIONS PREVENTS FORM SUBMISSION VALIDATES CITY AND FETCHES DATA VAI API
  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a valid city name');
      return;
    }
    fetchWeatherData(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
    );
  };

  const getWeatherCondition = () =>
    weather && ({
      main: weather.weather[0].main,
      isDay:
        Date.now() / 1000 > weather.sys.sunrise &&
        Date.now() / 1000 < weather.sys.sunset
    });

  return (
    <div className="min-h-screen">
      <WeatherBackground condition={getWeatherCondition()} />

      <div className="flex items-center justify-center p-6 min-h-screen">
        {/* Wider Card */}
        <div className="bg-transparent backdrop-blur-md rounded-2xl shadow-2xl p-8 
                        text-white border border-white/30 
                        w-full max-w-md md:max-w-lg transition-all">

          <h1 className="text-4xl font-extrabold text-center mb-6">
            Weather App
          </h1>

          {!weather ? (
            /* SEARCH SECTION */
            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name (min 3 letters)"
                className="p-3 rounded border border-white bg-transparent 
                           text-white placeholder-white"
              />

              {/* Suggestions (NO ABSOLUTE POSITION) */}
              {suggestion.length > 0 && (
                <div className="bg-black/50 rounded overflow-hidden">
                  {suggestion.map((s) => (
                    <button
                      key={`${s.lat}-${s.lon}`}
                      type="button"
                      onClick={() =>
                        fetchWeatherData(
                          `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=${API_KEY}&units=metric`,
                          `${s.name}, ${s.country}`
                        )
                      }
                      className="block w-full px-4 py-2 text-left 
                                 hover:bg-blue-700 transition"
                    >
                      {s.name}, {s.country}
                    </button>
                  ))}
                </div>
              )}

              <button className="bg-purple-700 hover:bg-blue-700 py-2 rounded transition">
                Get Weather
              </button>
            </form>
          ) : (
            /* RESULT SECTION */
            <div className="mt-6 text-center px-4 md:px-8">

              <button
                onClick={() => {
                  setWeather(null);
                  setCity('');
                }}
                className="mb-4 bg-blue-500 px-3 py-1 rounded"
              >
                Change City
              </button>

              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">{weather.name}</h2>
                <button
                  onClick={() => setUnit((u) => (u === 'C' ? 'F' : 'C'))}
                  className="bg-blue-700 px-3 py-1 rounded"
                >
                  °{unit}
                </button>
              </div>

              {/* Weather Icon */}
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="mx-auto my-4"
              />

              <p className="text-4xl">
                {convertTemperature(weather.main.temp, unit)}°{unit}
              </p>
              <p className="capitalize">{weather.weather[0].description}</p>

              {/* Info Section */}
              <div className="flex flex-wrap justify-between gap-6 mt-6">
                <div className="flex flex-col items-center">
                  <HumidityIcon />
                  <p>Humidity</p>
                  <p>{weather.main.humidity}% ({getHumidityValue(weather.main.humidity)})</p>
                </div>

                <div className="flex flex-col items-center">
                  <WindIcon />
                  <p>Wind</p>
                  <p>
                    {weather.wind.speed} m/s
                    {weather.wind.deg && ` (${getWindDirection(weather.wind.deg)})`}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <VisibilityIcon />
                  <p>Visibility</p>
                  <p>{getVisibilityValue(weather.visibility)}</p>
                </div>
              </div>

              <div className='flex flex-wrap justify-around mt-6'>
                {[
                  [SunriseIcon, 'Sunrise', weather.sys.sunrise],
                  [SunsetIcon, 'Sunset', weather.sys.sunset],
                ].map(([Icon, label, time]) => (
                  <div key={label} className='flex flex-col items-center m-2'>
                    <Icon />
                    <p className='mt-1 font-semibold'>{label}</p>
                    <p className='text-sm '>
                      {new Date(time * 1000).toLocaleDateString('en-GB',
                        { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mt-6 text-sm'>
                <p><strong>Feels Like: </strong>{convertTemperature(weather.main.feels_like, unit)} &deg;{unit}</p>
                <p><strong>Pressure: </strong>{weather.main.pressure} </p>
              </div>
            </div>
          )}


          {error && (
            <p className="text-red-400 text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
