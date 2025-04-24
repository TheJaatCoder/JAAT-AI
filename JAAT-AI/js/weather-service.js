/**
 * JAAT-AI Weather API Integration Service
 * Handles all Weather API interactions
 */

// Weather API configuration
const WEATHER_CONFIG = {
    apiKey: process.env.WEATHER_API_KEY,
    baseUrl: 'https://api.weatherapi.com/v1'
};

// Weather Service object
const WeatherService = {
    /**
     * Get current weather for a location
     * @param {string} location - Location (city name, zip code, or coordinates)
     * @returns {Promise<Object>} - Weather data
     */
    getCurrentWeather: async function(location) {
        try {
            const url = `${WEATHER_CONFIG.baseUrl}/current.json?key=${WEATHER_CONFIG.apiKey}&q=${encodeURIComponent(location)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Weather API Error: ${error.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Weather Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Get weather forecast for a location
     * @param {string} location - Location (city name, zip code, or coordinates)
     * @param {number} days - Number of days (1-10)
     * @returns {Promise<Object>} - Forecast data
     */
    getForecast: async function(location, days = 3) {
        try {
            const url = `${WEATHER_CONFIG.baseUrl}/forecast.json?key=${WEATHER_CONFIG.apiKey}&q=${encodeURIComponent(location)}&days=${days}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Weather API Error: ${error.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Weather Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Search for locations
     * @param {string} query - Search query
     * @returns {Promise<Array>} - Matching locations
     */
    searchLocations: async function(query) {
        try {
            const url = `${WEATHER_CONFIG.baseUrl}/search.json?key=${WEATHER_CONFIG.apiKey}&q=${encodeURIComponent(query)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Weather API Error: ${error.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Weather Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Get weather alerts for a location
     * @param {string} location - Location (city name, zip code, or coordinates)
     * @returns {Promise<Object>} - Weather alerts
     */
    getAlerts: async function(location) {
        try {
            const url = `${WEATHER_CONFIG.baseUrl}/forecast.json?key=${WEATHER_CONFIG.apiKey}&q=${encodeURIComponent(location)}&alerts=yes`;
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Weather API Error: ${error.error?.message || response.statusText}`);
            }
            
            const data = await response.json();
            return data.alerts || [];
        } catch (error) {
            console.error('Weather Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Format weather data for display
     * @param {Object} weatherData - Weather data from API
     * @returns {Object} - Formatted weather data
     */
    formatWeatherData: function(weatherData) {
        if (!weatherData || !weatherData.current) {
            return null;
        }
        
        return {
            location: {
                name: weatherData.location.name,
                region: weatherData.location.region,
                country: weatherData.location.country,
                localtime: weatherData.location.localtime
            },
            current: {
                tempC: weatherData.current.temp_c,
                tempF: weatherData.current.temp_f,
                condition: weatherData.current.condition.text,
                conditionIcon: weatherData.current.condition.icon,
                windKph: weatherData.current.wind_kph,
                windMph: weatherData.current.wind_mph,
                windDirection: weatherData.current.wind_dir,
                humidity: weatherData.current.humidity,
                feelsLikeC: weatherData.current.feelslike_c,
                feelsLikeF: weatherData.current.feelslike_f,
                uvIndex: weatherData.current.uv,
                precipMm: weatherData.current.precip_mm,
                precipIn: weatherData.current.precip_in
            }
        };
    },
    
    /**
     * Format forecast data for display
     * @param {Object} forecastData - Forecast data from API
     * @returns {Object} - Formatted forecast data
     */
    formatForecastData: function(forecastData) {
        if (!forecastData || !forecastData.forecast || !forecastData.forecast.forecastday) {
            return null;
        }
        
        const formattedForecast = {
            location: {
                name: forecastData.location.name,
                region: forecastData.location.region,
                country: forecastData.location.country
            },
            days: []
        };
        
        for (const day of forecastData.forecast.forecastday) {
            formattedForecast.days.push({
                date: day.date,
                maxTempC: day.day.maxtemp_c,
                maxTempF: day.day.maxtemp_f,
                minTempC: day.day.mintemp_c,
                minTempF: day.day.mintemp_f,
                condition: day.day.condition.text,
                conditionIcon: day.day.condition.icon,
                chanceOfRain: day.day.daily_chance_of_rain,
                chanceOfSnow: day.day.daily_chance_of_snow,
                totalPrecipMm: day.day.totalprecip_mm,
                totalPrecipIn: day.day.totalprecip_in,
                avgHumidity: day.day.avghumidity,
                sunrise: day.astro.sunrise,
                sunset: day.astro.sunset,
                moonPhase: day.astro.moon_phase
            });
        }
        
        return formattedForecast;
    }
};

// Export the Weather Service
window.WeatherService = WeatherService;