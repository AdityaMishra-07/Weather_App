🌦️ Weather App

A modern and responsive Weather Application built using React and Vite, styled with Tailwind CSS, and powered by the OpenWeather API.
The app provides real-time weather information, city suggestions, and dynamic backgrounds based on weather conditions and day/night time.

🚀 Features

🌍 Search weather by city name
📍 City suggestions using OpenWeather Geo API
🌡️ Temperature in Celsius / Fahrenheit
🌬️ Wind speed & wind direction
💧 Humidity & visibility information
🌅 Sunrise & 🌇 sunset timings
🎥 Dynamic image/video backgrounds based on weather & time
✨ Smooth UI animations & glassmorphism design
📱 Fully responsive for all devices



📦 Dependencies
{
  "@tailwindcss/vite": "^4.1.18",
  "dotenv": "^17.2.3",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "tailwindcss": "^4.1.18"
}


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/weather-app.git
cd weather-app

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root directory:

VITE_WEATHER_API_KEY=your_openweather_api_key


🔐 Important

Variable must start with VITE_

No quotes, no spaces

Restart the dev server after editing

Add .env to .gitignore:

.env

4️⃣ Run the Application
npm run dev


The app will run at:

http://localhost:5173

📁 Project Structure
weather-app/
│── src/
│   ├── components/
│   │   ├── WeatherBackground.jsx
│   │   ├── Icons.jsx
│   │   └── Helper.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│── .env
│── vite.config.js
│── package.json
│── README.md

🧠 Key Concepts Used

React Hooks (useState, useEffect)

Conditional rendering

Debounced API calls

Reusable components

Environment variables with Vite

Responsive UI design

Error handling & fallback UI

🌐 OpenWeather API

This project uses:

Current Weather API

Geocoding API

📖 Documentation:
👉 https://openweathermap.org/api


👨‍💻 Author

Aditya Mishra
Frontend Developer | React Enthusiast

