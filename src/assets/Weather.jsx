import React, { useState, useEffect } from "react";
import axios from "axios";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay("morning");
    else if (hour >= 12 && hour < 18) setTimeOfDay("day");
    else if (hour >= 18 && hour < 21) setTimeOfDay("evening");
    else setTimeOfDay("night");
  }, []);

  function handleCity(e) {
    setCity(e.target.value);
    setError("");
  }

  function handleReport() {
    if (city.trim() === "") {
      setError("Please enter a city name");
      return;
    }
    
    setLoading(true);
    setError("");
    
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0efe0b956e513b1217ad609add553e0e&units=metric`
    )
      .then((res) => {
        setWeatherData({
          temp: Math.round(res.data.main.temp),
          feelsLike: Math.round(res.data.main.feels_like),
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          humidity: res.data.main.humidity,
          windSpeed: res.data.wind.speed,
          pressure: res.data.main.pressure,
          visibility: res.data.visibility / 1000,
          cityName: res.data.name,
          country: res.data.sys.country,
          tempMin: Math.round(res.data.main.temp_min),
          tempMax: Math.round(res.data.main.temp_max),
          sunrise: res.data.sys.sunrise,
          sunset: res.data.sys.sunset,
          clouds: res.data.clouds.all,
        });
        setLoading(false);
        setCity("");
      })
      .catch((err) => {
        setError("City not found. Please check the spelling and try again.");
        setWeatherData(null);
        setLoading(false);
      });
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleReport();
    }
  }

  const getWeatherGradient = () => {
    if (!weatherData) return "from-slate-900 via-slate-800 to-slate-900";
    
    const weather = weatherData.weather.toLowerCase();
    if (weather.includes("clear")) return timeOfDay === "night" ? "from-indigo-950 via-blue-950 to-slate-950" : "from-sky-400 via-blue-500 to-indigo-600";
    if (weather.includes("cloud")) return "from-slate-500 via-gray-600 to-slate-700";
    if (weather.includes("rain") || weather.includes("drizzle")) return "from-slate-700 via-blue-800 to-slate-900";
    if (weather.includes("thunder")) return "from-violet-900 via-purple-950 to-slate-950";
    if (weather.includes("snow")) return "from-slate-300 via-blue-200 to-slate-400";
    if (weather.includes("mist") || weather.includes("fog")) return "from-gray-400 via-slate-500 to-gray-600";
    return "from-slate-900 via-slate-800 to-slate-900";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getWeatherGradient()} p-4 transition-all duration-1000 relative overflow-hidden`}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float-delay"></div>
        {weatherData?.weather.toLowerCase().includes("rain") && (
          <>
            <div className="rain-drop" style={{left: "10%", animationDelay: "0s"}}></div>
            <div className="rain-drop" style={{left: "20%", animationDelay: "0.2s"}}></div>
            <div className="rain-drop" style={{left: "30%", animationDelay: "0.4s"}}></div>
            <div className="rain-drop" style={{left: "40%", animationDelay: "0.1s"}}></div>
            <div className="rain-drop" style={{left: "50%", animationDelay: "0.3s"}}></div>
            <div className="rain-drop" style={{left: "60%", animationDelay: "0.5s"}}></div>
            <div className="rain-drop" style={{left: "70%", animationDelay: "0.2s"}}></div>
            <div className="rain-drop" style={{left: "80%", animationDelay: "0.4s"}}></div>
            <div className="rain-drop" style={{left: "90%", animationDelay: "0.1s"}}></div>
          </>
        )}
        {weatherData?.weather.toLowerCase().includes("snow") && (
          <>
            <div className="snowflake" style={{left: "10%", animationDelay: "0s"}}>❅</div>
            <div className="snowflake" style={{left: "25%", animationDelay: "1s"}}>❆</div>
            <div className="snowflake" style={{left: "40%", animationDelay: "2s"}}>❅</div>
            <div className="snowflake" style={{left: "55%", animationDelay: "1.5s"}}>❆</div>
            <div className="snowflake" style={{left: "70%", animationDelay: "0.5s"}}>❅</div>
            <div className="snowflake" style={{left: "85%", animationDelay: "2.5s"}}>❆</div>
          </>
        )}
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header with Enhanced Typography */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-1 h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent"></div>
            <h1 className="text-8xl font-black tracking-tight text-white drop-shadow-2xl" style={{fontFamily: "'Bebas Neue', sans-serif"}}>
              ATMOSPHERE
            </h1>
            <div className="w-1 h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent"></div>
          </div>
          <p className="text-white/70 text-xl tracking-widest uppercase" style={{fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.3em"}}>
            Global Weather Intelligence
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Search Panel - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Card */}
            <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl animate-slide-right hover:bg-white/15 transition-all duration-500">
              <h3 className="text-white/90 text-sm font-bold tracking-widest uppercase mb-6" style={{fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.2em"}}>
                Search Location
              </h3>
              
              <div className="relative mb-4">
                <input
                  className="w-full p-5 pl-14 pr-4 rounded-2xl bg-black/30 border-2 border-white/20 focus:outline-none focus:border-white/60 transition-all text-white placeholder-white/40 font-medium text-lg backdrop-blur-sm"
                  onChange={handleCity}
                  value={city}
                  placeholder="Enter city..."
                  onKeyDown={handleKeyPress}
                  style={{fontFamily: "'Montserrat', sans-serif"}}
                />
                <svg
                  className="w-6 h-6 text-white/40 absolute left-5 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <button
                onClick={handleReport}
                disabled={loading}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-5 px-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                style={{fontFamily: "'Montserrat', sans-serif"}}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SCANNING...
                  </span>
                ) : (
                  "GET WEATHER"
                )}
              </button>

              {/* Error Display */}
              {error && (
                <div className="mt-6 p-4 bg-red-500/20 border-2 border-red-400/40 rounded-xl backdrop-blur-sm animate-shake">
                  <p className="text-red-200 font-semibold text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>⚠ {error}</p>
                </div>
              )}
            </div>

            {/* Time Info */}
            {weatherData && (
              <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl animate-fade-in">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/70 text-sm font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>Sunrise</span>
                    </div>
                    <span className="text-white font-bold text-lg" style={{fontFamily: "'Montserrat', sans-serif"}}>{formatTime(weatherData.sunrise)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      <span className="text-white/70 text-sm font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>Sunset</span>
                    </div>
                    <span className="text-white font-bold text-lg" style={{fontFamily: "'Montserrat', sans-serif"}}>{formatTime(weatherData.sunset)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Display - Center & Right Columns */}
          <div className="lg:col-span-2 space-y-6">
            {weatherData && !loading ? (
              <>
                {/* Hero Weather Card */}
                <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl animate-scale-in relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                  
                  {/* Location */}
                  <div className="relative mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h2 className="text-4xl font-black text-white tracking-tight" style={{fontFamily: "'Bebas Neue', sans-serif"}}>
                        {weatherData.cityName}, {weatherData.country}
                      </h2>
                    </div>
                    <p className="text-white/60 text-sm tracking-widest uppercase ml-9" style={{fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em"}}>
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Main Temperature */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-8">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                        alt={weatherData.description}
                        className="w-48 h-48 drop-shadow-2xl animate-float"
                      />
                      <div>
                        <div className="text-9xl font-black text-white mb-2 leading-none" style={{fontFamily: "'Bebas Neue', sans-serif"}}>
                          {weatherData.temp}°
                        </div>
                        <p className="text-3xl font-bold text-white/90 capitalize" style={{fontFamily: "'Montserrat', sans-serif"}}>
                          {weatherData.weather}
                        </p>
                        <p className="text-white/60 capitalize text-lg mt-1" style={{fontFamily: "'Montserrat', sans-serif"}}>
                          {weatherData.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* High/Low */}
                    <div className="text-right">
                      <div className="mb-4">
                        <div className="text-white/60 text-xs tracking-widest uppercase mb-1" style={{fontFamily: "'Montserrat', sans-serif"}}>High</div>
                        <div className="text-5xl font-black text-white" style={{fontFamily: "'Bebas Neue', sans-serif"}}>{weatherData.tempMax}°</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs tracking-widest uppercase mb-1" style={{fontFamily: "'Montserrat', sans-serif"}}>Low</div>
                        <div className="text-5xl font-black text-white" style={{fontFamily: "'Bebas Neue', sans-serif"}}>{weatherData.tempMin}°</div>
                      </div>
                    </div>
                  </div>

                  {/* Feels Like */}
                  <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-4 inline-block border border-white/20">
                    <span className="text-white/70 text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>
                      Feels like <span className="text-white font-bold text-2xl ml-2" style={{fontFamily: "'Bebas Neue', sans-serif"}}>{weatherData.feelsLike}°C</span>
                    </span>
                  </div>
                </div>

                {/* Detailed Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Humidity */}
                  <div className="backdrop-blur-2xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-400/20 flex items-center justify-center">
                        <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l1.5-1.5" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>Humidity</p>
                    <p className="text-white text-3xl font-black" style={{fontFamily: "'Bebas Neue', sans-serif"}}>{weatherData.humidity}%</p>
                  </div>

                  {/* Wind */}
                  <div className="backdrop-blur-2xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center">
                        <svg className="w-7 h-7 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>Wind Speed</p>
                    <p className="text-white text-3xl font-black" style={{fontFamily: "'Bebas Neue', sans-serif"}}>{weatherData.windSpeed} <span className="text-xl">m/s</span></p>
                  </div>

                  {/* Pressure */}
                  <div className="backdrop-blur-2xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.3s'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-400/20 flex items-center justify-center">
                        <svg className="w-7 h-7 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>Pressure</p>
                    <p className="text-white text-3xl font-black" style={{fontFamily: "'Bebas Neue', sans-serif"}}>{weatherData.pressure} <span className="text-xl">hPa</span></p>
                  </div>

                  {/* Visibility */}
                  <div className="backdrop-blur-2xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-400/20 flex items-center justify-center">
                        <svg className="w-7 h-7 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>Visibility</p>
                    <p className="text-white text-3xl font-black" style={{fontFamily: "'Bebas Neue', sans-serif"}}>{weatherData.visibility} <span className="text-xl">km</span></p>
                  </div>
                </div>
              </>
            ) : !loading && !error ? (
              /* Empty State */
              <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-20 border border-white/20 shadow-2xl text-center">
                <svg className="w-32 h-32 text-white/20 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-4xl font-black text-white/80 mb-4" style={{fontFamily: "'Bebas Neue', sans-serif"}}>
                  DISCOVER THE ATMOSPHERE
                </h3>
                <p className="text-white/50 text-lg tracking-wide" style={{fontFamily: "'Montserrat', sans-serif"}}>
                  Search for any city to view detailed weather data
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 backdrop-blur-sm bg-white/5 rounded-full px-6 py-3 border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-white/50 text-xs tracking-widest uppercase" style={{fontFamily: "'Montserrat', sans-serif"}}>
              Powered by OpenWeatherMap API
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes rain {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0.3; }
        }
        
        @keyframes snow {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0.5; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        
        .animate-slide-right {
          animation: slide-right 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        
        .rain-drop {
          position: absolute;
          width: 2px;
          height: 50px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3));
          animation: rain 1s linear infinite;
        }
        
        .snowflake {
          position: absolute;
          color: white;
          font-size: 24px;
          opacity: 0.8;
          animation: snow 10s linear infinite;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
};