import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [crop, setCrop] = useState('');
  const [pH, setSoilPh] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: 23.387224,
            longitude: 85.392290,
            current: 'temperature_2m,relative_humidity_2m,uv_index',
          },
        });

        const current = weatherResponse.data.current;
        setTemperature(current.temperature_2m);
        setHumidity(current.relative_humidity_2m);
        setUvIndex(current.uv_index);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://agriadvice.onrender.com/get-advice', { crop, pH });
      setAdvice(response.data);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setAdvice('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 via-green-500 to-green-700 bg-cover bg-center" style={{ backgroundImage: 'url(/images/farm.jpg)' }}>
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg space-y-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <div className="text-center">
          <img src="/images/farmer-icon.png" alt="Farmer" className="w-16 mx-auto mb-4 animate-bounce" />
          <h1 className="text-5xl font-bold text-green-700 mb-8">
            AgriAdvisor
          </h1>
        </div>

        {/* Weather Information */}
        <div className="bg-green-100 p-6 rounded-xl shadow-inner mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Current Weather</h2>
          <ul className="space-y-2 text-green-800 text-lg">
            <li>🌡️ Temperature: {temperature !== null ? `${temperature} °C` : 'Loading...'}</li>
            <li>💧 Humidity: {humidity !== null ? `${humidity} %` : 'Loading...'}</li>
            <li>🌞 UV Index: {uvIndex !== null ? uvIndex : 'Loading...'}</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Crop Selector */}
          <div className="flex flex-col">
            <label htmlFor="crop" className="font-semibold text-green-600 text-lg mb-3">
              Select Crop
            </label>
            <select
              id="crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="p-4 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              required
            >
              <option value="">Select a Crop</option>
              <option value="Coffee">Coffee</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Jute">Jute</option>
              <option value="Mango">Mango</option>
              <option value="Banana">Banana</option>
              <option value="Apple">Apple</option>
              <option value="Potato">Potato</option>
              <option value="Onion">Onion</option>
              <option value="Tomato">Tomato</option>
              <option value="Moong">Moong</option>
              <option value="Urad">Urad</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Mustard">Mustard</option>
              <option value="Soybean">Soybean</option>
              <option value="Sunflower">Sunflower</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
              <option value="Barley">Barley</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Sesame">Sesame</option>
              <option value="Cotton">Cotton</option>
              <option value="Tea">Tea</option>
              <option value="Arhar">Arhar</option>
              <option value="Gram">Gram</option>
              <option value="Millets">Millets</option>
            </select>
          </div>

          {/* Soil pH Input */}
          <div className="flex flex-col">
            <label htmlFor="pH" className="font-semibold text-green-600 text-lg mb-3">
              Enter Soil pH
            </label>
            <input
              type="number"
              id="pH"
              value={pH}
              onChange={(e) => setSoilPh(e.target.value)}
              step="0.1"
              min="0"
              max="14"
              placeholder="e.g., 6.5"
              className="p-4 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              'Get Advice'
            )}
          </button>
        </form>

        {/* Advice Output */}
        {advice && (
          <div className="mt-6 p-6 bg-green-50 rounded-xl shadow-md border-t-4 border-green-300">
            <h2 className="text-2xl font-semibold text-green-600">Precautionary Advice:</h2>
            <ul className="mt-3 text-green-700 list-disc pl-6 space-y-2">
              {Array.isArray(advice)
                ? advice.map((item, index) => <li key={index}>{item}</li>)
                : <li>{advice}</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
