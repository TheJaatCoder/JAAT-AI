/**
 * JAAT-AI Professional Mode: Weather Forecaster AI
 * Version: 1.0.0
 * Author: JAAT-AI Professional Development Team
 * 
 * A specialized weather forecasting and meteorological analysis assistant.
 * This mode transforms JAAT-AI into a professional meteorological assistant
 * that specializes in weather predictions, climate data analysis, and
 * weather-related recommendations.
 * 
 * The Weather Forecaster AI mode features:
 * - Advanced meteorological knowledge and terminology
 * - Real-time weather data integration capabilities
 * - Climate pattern analysis
 * - Weather visualization tools
 * - Severe weather alert recommendations
 * - Historical weather data analysis
 * - Travel and outdoor activity planning based on weather conditions
 * - Climate change impact assessment
 * 
 * This is a premium AI mode designed for productivity applications.
 * 
 * Copyright © 2025 JAAT-AI. All rights reserved.
 */

// Global namespace check to prevent conflicts
if (typeof window.JAAT_MODES === 'undefined') {
    window.JAAT_MODES = {};
}

(function(global) {
    'use strict';

    // Meteorological terminology dictionary for enhanced responses
    const METEOROLOGICAL_TERMS = {
        // Atmospheric conditions
        "barometric pressure": "The pressure exerted by the atmosphere at a given point",
        "relative humidity": "The amount of water vapor in the air compared to the maximum possible for the temperature",
        "dew point": "Temperature at which air becomes saturated and dew forms",
        "wind chill": "How cold it feels due to the combination of temperature and wind",
        "heat index": "How hot it feels due to the combination of temperature and humidity",
        "visibility": "The distance at which objects can be clearly seen",
        
        // Cloud types
        "cumulus": "Fluffy, cotton-like clouds with flat bases",
        "stratus": "Low-level, horizontal, sheet-like clouds",
        "cirrus": "High-level, thin, wispy clouds made of ice crystals",
        "nimbus": "Rain-bearing clouds",
        "cumulonimbus": "Thunderstorm clouds with anvil-shaped tops",
        "stratocumulus": "Low-level, lumpy layer clouds",
        "altostratus": "Mid-level, gray, sheet-like clouds",
        "altocumulus": "Mid-level, white/gray puffy clouds",
        "cirrostratus": "High-level, transparent sheets of ice crystals",
        "cirrocumulus": "High-level, small white puffs in groups",
        
        // Precipitation types
        "rain": "Liquid water droplets falling from clouds",
        "drizzle": "Light rain consisting of tiny droplets",
        "freezing rain": "Rain that freezes on contact with surfaces",
        "sleet": "Ice pellets formed when raindrops freeze before reaching the ground",
        "snow": "Frozen crystalline water falling as flakes",
        "hail": "Balls of ice that form within thunderstorm updrafts",
        "graupel": "Soft, small pellets of ice formed when supercooled water collects on snowflakes",
        
        // Weather phenomena
        "thunder": "Sound produced by lightning",
        "lightning": "Electric discharge in the atmosphere",
        "tornado": "Violently rotating column of air extending from a thunderstorm to the ground",
        "waterspout": "Tornado that forms over water",
        "hurricane": "Tropical cyclone with winds of 74+ mph in the Atlantic/Eastern Pacific",
        "typhoon": "Tropical cyclone with winds of 74+ mph in the Western Pacific",
        "cyclone": "General term for a low-pressure system with rotating winds",
        "anticyclone": "High-pressure system with clockwise rotation in the Northern Hemisphere",
        "jet stream": "Fast, narrow air currents found near the tropopause",
        "front": "Boundary between two air masses of different temperatures/densities",
        "squall line": "Line of thunderstorms forming along or ahead of a cold front",
        "microburst": "Small but intense downdraft that creates divergent winds on ground impact",
        
        // Meteorological instruments
        "barometer": "Instrument that measures atmospheric pressure",
        "thermometer": "Instrument that measures temperature",
        "hygrometer": "Instrument that measures humidity",
        "anemometer": "Instrument that measures wind speed",
        "wind vane": "Instrument that shows wind direction",
        "rain gauge": "Instrument that measures precipitation amount",
        "weather radar": "System that uses radio waves to detect precipitation",
        "weather satellite": "Satellite used to monitor Earth's weather and climate",
        "radiosonde": "Battery-powered telemetry instrument package carried by weather balloon",
        
        // Climate patterns
        "El Niño": "Warm phase of ENSO, characterized by warm water in the central/eastern Pacific",
        "La Niña": "Cool phase of ENSO, characterized by cool water in the central/eastern Pacific",
        "monsoon": "Seasonal changes in atmospheric circulation and precipitation",
        "polar vortex": "Large area of low pressure and cold air surrounding the Earth's poles",
        "jet streak": "Region of maximum wind within the jet stream",
        
        // Weather forecasting terms
        "forecast model": "Computer program that predicts future weather conditions",
        "ensemble forecast": "Multiple forecasts used to assess the uncertainty in a forecast",
        "numerical weather prediction": "Use of mathematical models to predict weather",
        "climatology": "Study of climate over time",
        "meteorology": "Scientific study of the atmosphere and weather",
        "nowcasting": "Short-term weather forecasting for the next few hours",
        "watch": "Alert indicating conditions are favorable for hazardous weather",
        "warning": "Alert indicating hazardous weather is imminent or occurring"
    };

    // Weather data visualization system
    class WeatherVisualizer {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.width = 0;
            this.height = 0;
            this.weatherData = null;
            this.forecastData = null;
            this.animationFrame = null;
            this.mode = 'temperature'; // Default visualization mode
            this.initialized = false;
            this.colorGradients = {
                temperature: {
                    stops: [
                        { temp: -30, color: '#0022FF' }, // Very cold
                        { temp: -15, color: '#0099FF' }, // Cold
                        { temp: 0, color: '#FFFFFF' },   // Freezing
                        { temp: 10, color: '#FFFF00' },  // Cool
                        { temp: 20, color: '#FF9900' },  // Warm
                        { temp: 30, color: '#FF0000' },  // Hot
                        { temp: 40, color: '#990000' }   // Very hot
                    ],
                    getColor: function(temp) {
                        if (temp <= this.stops[0].temp) return this.stops[0].color;
                        if (temp >= this.stops[this.stops.length - 1].temp) return this.stops[this.stops.length - 1].color;
                        
                        for (let i = 0; i < this.stops.length - 1; i++) {
                            if (temp >= this.stops[i].temp && temp <= this.stops[i + 1].temp) {
                                const ratio = (temp - this.stops[i].temp) / (this.stops[i + 1].temp - this.stops[i].temp);
                                return this.interpolateColor(this.stops[i].color, this.stops[i + 1].color, ratio);
                            }
                        }
                        return '#CCCCCC'; // Default if something goes wrong
                    },
                    interpolateColor: function(color1, color2, ratio) {
                        const r1 = parseInt(color1.substring(1, 3), 16);
                        const g1 = parseInt(color1.substring(3, 5), 16);
                        const b1 = parseInt(color1.substring(5, 7), 16);
                        
                        const r2 = parseInt(color2.substring(1, 3), 16);
                        const g2 = parseInt(color2.substring(3, 5), 16);
                        const b2 = parseInt(color2.substring(5, 7), 16);
                        
                        const r = Math.round(r1 + (r2 - r1) * ratio);
                        const g = Math.round(g1 + (g2 - g1) * ratio);
                        const b = Math.round(b1 + (b2 - b1) * ratio);
                        
                        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                    }
                },
                precipitation: {
                    stops: [
                        { value: 0, color: '#FFFFFF' },      // None
                        { value: 0.5, color: '#CCFFFF' },    // Very light
                        { value: 2, color: '#99CCFF' },      // Light
                        { value: 5, color: '#6699FF' },      // Moderate
                        { value: 10, color: '#3366FF' },     // Heavy
                        { value: 20, color: '#0033FF' },     // Very heavy
                        { value: 30, color: '#9900FF' }      // Extreme
                    ],
                    getColor: function(value) {
                        if (value <= this.stops[0].value) return this.stops[0].color;
                        if (value >= this.stops[this.stops.length - 1].value) return this.stops[this.stops.length - 1].color;
                        
                        for (let i = 0; i < this.stops.length - 1; i++) {
                            if (value >= this.stops[i].value && value <= this.stops[i + 1].value) {
                                const ratio = (value - this.stops[i].value) / (this.stops[i + 1].value - this.stops[i].value);
                                return this.interpolateColor(this.stops[i].color, this.stops[i + 1].color, ratio);
                            }
                        }
                        return '#CCCCCC'; // Default if something goes wrong
                    },
                    interpolateColor: function(color1, color2, ratio) {
                        const r1 = parseInt(color1.substring(1, 3), 16);
                        const g1 = parseInt(color1.substring(3, 5), 16);
                        const b1 = parseInt(color1.substring(5, 7), 16);
                        
                        const r2 = parseInt(color2.substring(1, 3), 16);
                        const g2 = parseInt(color2.substring(3, 5), 16);
                        const b2 = parseInt(color2.substring(5, 7), 16);
                        
                        const r = Math.round(r1 + (r2 - r1) * ratio);
                        const g = Math.round(g1 + (g2 - g1) * ratio);
                        const b = Math.round(b1 + (b2 - b1) * ratio);
                        
                        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                    }
                },
                humidity: {
                    stops: [
                        { value: 0, color: '#FFFFCC' },    // Very dry
                        { value: 20, color: '#FFFF99' },   // Dry
                        { value: 40, color: '#99FF99' },   // Comfortable
                        { value: 60, color: '#66CCFF' },   // Humid
                        { value: 80, color: '#3399FF' },   // Very humid
                        { value: 100, color: '#0066FF' }   // Maximum humidity
                    ],
                    getColor: function(value) {
                        if (value <= this.stops[0].value) return this.stops[0].color;
                        if (value >= this.stops[this.stops.length - 1].value) return this.stops[this.stops.length - 1].color;
                        
                        for (let i = 0; i < this.stops.length - 1; i++) {
                            if (value >= this.stops[i].value && value <= this.stops[i + 1].value) {
                                const ratio = (value - this.stops[i].value) / (this.stops[i + 1].value - this.stops[i].value);
                                return this.interpolateColor(this.stops[i].color, this.stops[i + 1].color, ratio);
                            }
                        }
                        return '#CCCCCC'; // Default if something goes wrong
                    },
                    interpolateColor: function(color1, color2, ratio) {
                        const r1 = parseInt(color1.substring(1, 3), 16);
                        const g1 = parseInt(color1.substring(3, 5), 16);
                        const b1 = parseInt(color1.substring(5, 7), 16);
                        
                        const r2 = parseInt(color2.substring(1, 3), 16);
                        const g2 = parseInt(color2.substring(3, 5), 16);
                        const b2 = parseInt(color2.substring(5, 7), 16);
                        
                        const r = Math.round(r1 + (r2 - r1) * ratio);
                        const g = Math.round(g1 + (g2 - g1) * ratio);
                        const b = Math.round(b1 + (b2 - b1) * ratio);
                        
                        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                    }
                },
                wind: {
                    stops: [
                        { value: 0, color: '#FFFFFF' },      // Calm
                        { value: 5, color: '#CCFFCC' },      // Light air
                        { value: 10, color: '#99FF99' },     // Light breeze
                        { value: 20, color: '#66FF66' },     // Gentle breeze
                        { value: 30, color: '#33CC33' },     // Moderate breeze
                        { value: 40, color: '#FFCC00' },     // Fresh breeze
                        { value: 50, color: '#FF9900' },     // Strong breeze
                        { value: 60, color: '#FF6600' },     // Near gale
                        { value: 70, color: '#FF3300' },     // Gale
                        { value: 80, color: '#FF0000' },     // Strong gale
                        { value: 90, color: '#CC0000' },     // Storm
                        { value: 100, color: '#990000' }     // Violent storm
                    ],
                    getColor: function(value) {
                        if (value <= this.stops[0].value) return this.stops[0].color;
                        if (value >= this.stops[this.stops.length - 1].value) return this.stops[this.stops.length - 1].color;
                        
                        for (let i = 0; i < this.stops.length - 1; i++) {
                            if (value >= this.stops[i].value && value <= this.stops[i + 1].value) {
                                const ratio = (value - this.stops[i].value) / (this.stops[i + 1].value - this.stops[i].value);
                                return this.interpolateColor(this.stops[i].color, this.stops[i + 1].color, ratio);
                            }
                        }
                        return '#CCCCCC'; // Default if something goes wrong
                    },
                    interpolateColor: function(color1, color2, ratio) {
                        const r1 = parseInt(color1.substring(1, 3), 16);
                        const g1 = parseInt(color1.substring(3, 5), 16);
                        const b1 = parseInt(color1.substring(5, 7), 16);
                        
                        const r2 = parseInt(color2.substring(1, 3), 16);
                        const g2 = parseInt(color2.substring(3, 5), 16);
                        const b2 = parseInt(color2.substring(5, 7), 16);
                        
                        const r = Math.round(r1 + (r2 - r1) * ratio);
                        const g = Math.round(g1 + (g2 - g1) * ratio);
                        const b = Math.round(b1 + (b2 - b1) * ratio);
                        
                        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                    }
                }
            };
            
            // Weather icon mapping
            this.weatherIcons = {
                'clear-day': '☀️',
                'clear-night': '🌙',
                'partly-cloudy-day': '⛅',
                'partly-cloudy-night': '☁️🌙',
                'cloudy': '☁️',
                'rain': '🌧️',
                'sleet': '🌨️',
                'snow': '❄️',
                'wind': '💨',
                'fog': '🌫️',
                'thunderstorm': '⛈️',
                'tornado': '🌪️',
                'hurricane': '🌀'
            };
        }

        initialize(container) {
            if (this.initialized) return;
            
            // Create container if not provided
            if (!container) {
                container = document.createElement('div');
                container.id = 'weather-visualizer-container';
                container.style.cssText = 'width: 100%; height: 400px; position: relative; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);';
                document.body.appendChild(container);
            }
            
            // Create canvas
            this.canvas = document.createElement('canvas');
            this.canvas.style.cssText = 'width: 100%; height: 100%; display: block;';
            container.appendChild(this.canvas);
            
            // Create control panel
            const controlPanel = document.createElement('div');
            controlPanel.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);';
            container.appendChild(controlPanel);
            
            // Create visualization mode selector
            const modeSelector = document.createElement('select');
            modeSelector.style.cssText = 'padding: 5px; border-radius: 3px; border: 1px solid #ccc;';
            
            const modes = [
                { value: 'temperature', label: 'Temperature' },
                { value: 'precipitation', label: 'Precipitation' },
                { value: 'humidity', label: 'Humidity' },
                { value: 'wind', label: 'Wind Speed' }
            ];
            
            modes.forEach(mode => {
                const option = document.createElement('option');
                option.value = mode.value;
                option.textContent = mode.label;
                modeSelector.appendChild(option);
            });
            
            modeSelector.addEventListener('change', e => {
                this.mode = e.target.value;
                this.render();
            });
            
            controlPanel.appendChild(modeSelector);
            
            // Set canvas dimensions
            this.resize();
            
            // Event listener for window resize
            window.addEventListener('resize', () => this.resize());
            
            // Create mock weather data for visualization
            this.createMockData();
            
            // Start animation
            this.render();
            
            this.initialized = true;
            return container;
        }

        resize() {
            if (!this.canvas) return;
            
            // Get dimensions from parent container
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            
            // Set canvas dimensions
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            
            // Re-render with new dimensions
            if (this.initialized) {
                this.render();
            }
        }

        createMockData() {
            // Generate mock current weather data
            this.weatherData = {
                location: 'Sample City',
                latitude: 37.7749,
                longitude: -122.4194,
                timestamp: new Date().toISOString(),
                temperature: 22,        // Celsius
                feelsLike: 24,         // Celsius
                humidity: 65,          // Percentage
                dewPoint: 15,          // Celsius
                uvIndex: 5,            // 0-11 scale
                cloudCover: 30,        // Percentage
                visibility: 10,        // Kilometers
                pressure: 1012,        // hPa (hectopascals)
                precipProbability: 20, // Percentage
                precipIntensity: 0.5,  // mm/h
                windSpeed: 15,         // km/h
                windGust: 25,          // km/h
                windDirection: 270,    // Degrees (0-360, 0 is North)
                icon: 'partly-cloudy-day'
            };
            
            // Generate mock forecast data (next 5 days)
            this.forecastData = [];
            const today = new Date();
            
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                
                // Create some variation in the forecast values
                const temperatureVariation = Math.sin(i * 0.5) * 5;
                const windVariation = Math.random() * 10;
                const precipChance = Math.max(0, Math.min(100, this.weatherData.precipProbability + (Math.random() * 40 - 20)));
                
                const dayForecast = {
                    date: date.toISOString(),
                    temperatureHigh: this.weatherData.temperature + temperatureVariation + 5,
                    temperatureLow: this.weatherData.temperature + temperatureVariation - 8,
                    humidity: Math.max(0, Math.min(100, this.weatherData.humidity + (Math.random() * 20 - 10))),
                    windSpeed: Math.max(0, this.weatherData.windSpeed + windVariation),
                    precipProbability: precipChance,
                    precipIntensity: precipChance > 50 ? 2.0 : 0.5,
                    icon: this.getWeatherIconByPrecipChance(precipChance)
                };
                
                this.forecastData.push(dayForecast);
            }
        }

        getWeatherIconByPrecipChance(chance) {
            if (chance < 10) return 'clear-day';
            if (chance < 30) return 'partly-cloudy-day';
            if (chance < 50) return 'cloudy';
            if (chance < 80) return 'rain';
            return 'thunderstorm';
        }

        setWeatherData(data) {
            this.weatherData = data;
            this.render();
        }

        setForecastData(data) {
            this.forecastData = data;
            this.render();
        }

        setMode(mode) {
            if (this.colorGradients[mode]) {
                this.mode = mode;
                this.render();
            }
        }

        render() {
            if (!this.canvas || !this.ctx) {
                this.ctx = this.canvas.getContext('2d');
            }
            
            if (!this.ctx || !this.weatherData || !this.forecastData) return;
            
            // Clear canvas
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            // Draw background
            this.drawBackground();
            
            // Draw current weather conditions
            this.drawCurrentConditions();
            
            // Draw forecast chart
            this.drawForecastChart();
            
            // Draw legend for the current visualization mode
            this.drawLegend();
        }

        drawBackground() {
            // Create gradient background based on current weather
            let gradientColors;
            
            switch(this.weatherData.icon) {
                case 'clear-day':
                    gradientColors = ['#4A90E2', '#FFFFFF'];
                    break;
                case 'clear-night':
                    gradientColors = ['#2C3E50', '#34495E'];
                    break;
                case 'partly-cloudy-day':
                    gradientColors = ['#4A90E2', '#F5F5F5'];
                    break;
                case 'partly-cloudy-night':
                    gradientColors = ['#2C3E50', '#95A5A6'];
                    break;
                case 'cloudy':
                    gradientColors = ['#95A5A6', '#7F8C8D'];
                    break;
                case 'rain':
                    gradientColors = ['#3498DB', '#2C3E50'];
                    break;
                case 'thunderstorm':
                    gradientColors = ['#2C3E50', '#34495E'];
                    break;
                case 'snow':
                    gradientColors = ['#ECF0F1', '#BDC3C7'];
                    break;
                default:
                    gradientColors = ['#3498DB', '#FFFFFF'];
            }
            
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
            gradient.addColorStop(0, gradientColors[0]);
            gradient.addColorStop(1, gradientColors[1]);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            // Draw light grid
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.lineWidth = 1;
            
            // Vertical grid lines
            for (let x = 50; x < this.width; x += 50) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, this.height);
                this.ctx.stroke();
            }
            
            // Horizontal grid lines
            for (let y = 50; y < this.height; y += 50) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.width, y);
                this.ctx.stroke();
            }
        }

        drawCurrentConditions() {
            if (!this.weatherData) return;
            
            // Current conditions box
            const boxWidth = Math.min(300, this.width * 0.4);
            const boxHeight = 120;
            const boxX = 20;
            const boxY = 20;
            
            // Draw semi-transparent box
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.roundRect(this.ctx, boxX, boxY, boxWidth, boxHeight, 10, true, false);
            
            // Draw location and current conditions
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillStyle = '#333333';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(this.weatherData.location, boxX + 15, boxY + 25);
            
            // Draw temperature
            this.ctx.font = 'bold 36px Arial';
            this.ctx.fillText(`${Math.round(this.weatherData.temperature)}°C`, boxX + 15, boxY + 65);
            
            // Draw weather icon
            this.ctx.font = '32px Arial';
            const icon = this.weatherIcons[this.weatherData.icon] || '☁️';
            this.ctx.fillText(icon, boxX + boxWidth - 50, boxY + 55);
            
            // Draw additional info
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`Feels like: ${Math.round(this.weatherData.feelsLike)}°C`, boxX + 15, boxY + 85);
            this.ctx.fillText(`Wind: ${Math.round(this.weatherData.windSpeed)} km/h`, boxX + 15, boxY + 100);
            this.ctx.fillText(`Humidity: ${Math.round(this.weatherData.humidity)}%`, boxX + 120, boxY + 85);
            this.ctx.fillText(`Precip: ${Math.round(this.weatherData.precipProbability)}%`, boxX + 120, boxY + 100);
        }

        drawForecastChart() {
            if (!this.forecastData || this.forecastData.length === 0) return;
            
            const chartTop = 160;
            const chartHeight = this.height - chartTop - 40;
            const chartWidth = this.width - 40;
            
            // Draw chart title based on mode
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.textAlign = 'center';
            let title;
            switch(this.mode) {
                case 'temperature':
                    title = '7-Day Temperature Forecast';
                    break;
                case 'precipitation':
                    title = '7-Day Precipitation Forecast';
                    break;
                case 'humidity':
                    title = '7-Day Humidity Forecast';
                    break;
                case 'wind':
                    title = '7-Day Wind Speed Forecast';
                    break;
                default:
                    title = '7-Day Weather Forecast';
            }
            this.ctx.fillText(title, this.width / 2, chartTop - 10);
            
            // Calculate day width
            const dayWidth = chartWidth / this.forecastData.length;
            
            // Draw x-axis (days)
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(20, chartTop + chartHeight);
            this.ctx.lineTo(20 + chartWidth, chartTop + chartHeight);
            this.ctx.stroke();
            
            // Define days of week
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            
            // Draw forecast data based on selected mode
            for (let i = 0; i < this.forecastData.length; i++) {
                const day = this.forecastData[i];
                const x = 20 + dayWidth * i + dayWidth / 2;
                
                // Draw day label
                const date = new Date(day.date);
                const dayOfWeek = daysOfWeek[date.getDay()];
                
                this.ctx.font = '12px Arial';
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(dayOfWeek, x, chartTop + chartHeight + 20);
                
                // Draw weather icon
                this.ctx.font = '24px Arial';
                const icon = this.weatherIcons[day.icon] || '☁️';
                this.ctx.fillText(icon, x, chartTop + 30);
                
                // Draw data point based on mode
                let value, minValue, maxValue, barHeight;
                switch(this.mode) {
                    case 'temperature':
                        // Draw temperature range
                        minValue = day.temperatureLow;
                        maxValue = day.temperatureHigh;
                        
                        // Map temperature range to chart height
                        // Assume range from -10 to 40 degrees Celsius
                        const lowY = chartTop + chartHeight - ((minValue + 10) / 50) * chartHeight;
                        const highY = chartTop + chartHeight - ((maxValue + 10) / 50) * chartHeight;
                        
                        // Draw temperature bar
                        const barWidth = dayWidth * 0.6;
                        this.ctx.fillStyle = this.colorGradients.temperature.getColor(day.temperatureHigh);
                        this.roundRect(this.ctx, x - barWidth / 2, highY, barWidth, lowY - highY, 5, true, false);
                        
                        // Draw temperature labels
                        this.ctx.font = '12px Arial';
                        this.ctx.fillStyle = '#FFFFFF';
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText(`${Math.round(maxValue)}°`, x, highY - 5);
                        this.ctx.fillText(`${Math.round(minValue)}°`, x, lowY + 15);
                        break;
                        
                    case 'precipitation':
                        // Draw precipitation probability
                        value = day.precipProbability;
                        barHeight = (value / 100) * chartHeight;
                        
                        // Draw precip bar
                        const precipBarWidth = dayWidth * 0.6;
                        this.ctx.fillStyle = this.colorGradients.precipitation.getColor(day.precipIntensity);
                        this.roundRect(
                            this.ctx, 
                            x - precipBarWidth / 2, 
                            chartTop + chartHeight - barHeight, 
                            precipBarWidth, 
                            barHeight, 
                            5, true, false
                        );
                        
                        // Draw precipitation label
                        this.ctx.font = '12px Arial';
                        this.ctx.fillStyle = '#FFFFFF';
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText(`${Math.round(value)}%`, x, chartTop + chartHeight - barHeight - 5);
                        break;
                        
                    case 'humidity':
                        // Draw humidity level
                        value = day.humidity;
                        barHeight = (value / 100) * chartHeight;
                        
                        // Draw humidity bar
                        const humidityBarWidth = dayWidth * 0.6;
                        this.ctx.fillStyle = this.colorGradients.humidity.getColor(value);
                        this.roundRect(
                            this.ctx, 
                            x - humidityBarWidth / 2, 
                            chartTop + chartHeight - barHeight, 
                            humidityBarWidth, 
                            barHeight, 
                            5, true, false
                        );
                        
                        // Draw humidity label
                        this.ctx.font = '12px Arial';
                        this.ctx.fillStyle = '#FFFFFF';
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText(`${Math.round(value)}%`, x, chartTop + chartHeight - barHeight - 5);
                        break;
                        
                    case 'wind':
                        // Draw wind speed
                        value = day.windSpeed;
                        // Map wind speed to chart height (assume max 100 km/h)
                        barHeight = (value / 100) * chartHeight;
                        
                        // Draw wind bar
                        const windBarWidth = dayWidth * 0.6;
                        this.ctx.fillStyle = this.colorGradients.wind.getColor(value);
                        this.roundRect(
                            this.ctx, 
                            x - windBarWidth / 2, 
                            chartTop + chartHeight - barHeight, 
                            windBarWidth, 
                            barHeight, 
                            5, true, false
                        );
                        
                        // Draw wind label
                        this.ctx.font = '12px Arial';
                        this.ctx.fillStyle = '#FFFFFF';
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText(`${Math.round(value)} km/h`, x, chartTop + chartHeight - barHeight - 5);
                        break;
                }
            }
        }

        drawLegend() {
            // Draw legend at bottom right
            const legendWidth = 200;
            const legendHeight = 30;
            const legendX = this.width - legendWidth - 20;
            const legendY = this.height - legendHeight - 10;
            
            // Draw semi-transparent background
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.roundRect(this.ctx, legendX, legendY, legendWidth, legendHeight, 5, true, false);
            
            // Draw gradient for current mode
            const gradient = this.ctx.createLinearGradient(legendX + 10, 0, legendX + legendWidth - 20, 0);
            let minLabel, maxLabel;
            
            switch(this.mode) {
                case 'temperature':
                    this.colorGradients.temperature.stops.forEach((stop, index) => {
                        gradient.addColorStop(index / (this.colorGradients.temperature.stops.length - 1), stop.color);
                    });
                    minLabel = '-30°C';
                    maxLabel = '40°C';
                    break;
                    
                case 'precipitation':
                    this.colorGradients.precipitation.stops.forEach((stop, index) => {
                        gradient.addColorStop(index / (this.colorGradients.precipitation.stops.length - 1), stop.color);
                    });
                    minLabel = '0 mm';
                    maxLabel = '30+ mm';
                    break;
                    
                case 'humidity':
                    this.colorGradients.humidity.stops.forEach((stop, index) => {
                        gradient.addColorStop(index / (this.colorGradients.humidity.stops.length - 1), stop.color);
                    });
                    minLabel = '0%';
                    maxLabel = '100%';
                    break;
                    
                case 'wind':
                    this.colorGradients.wind.stops.forEach((stop, index) => {
                        gradient.addColorStop(index / (this.colorGradients.wind.stops.length - 1), stop.color);
                    });
                    minLabel = '0 km/h';
                    maxLabel = '100+ km/h';
                    break;
            }
            
            // Draw gradient bar
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(legendX + 10, legendY + 10, legendWidth - 20, 10);
            
            // Draw labels
            this.ctx.font = '10px Arial';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(minLabel, legendX + 10, legendY + 25);
            
            this.ctx.textAlign = 'right';
            this.ctx.fillText(maxLabel, legendX + legendWidth - 10, legendY + 25);
        }

        // Helper for drawing rounded rectangles
        roundRect(ctx, x, y, width, height, radius, fill, stroke) {
            if (typeof radius === 'number') {
                radius = {tl: radius, tr: radius, br: radius, bl: radius};
            } else {
                radius = {tl: 0, tr: 0, br: 0, bl: 0, ...radius};
            }
            
            ctx.beginPath();
            ctx.moveTo(x + radius.tl, y);
            ctx.lineTo(x + width - radius.tr, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
            ctx.lineTo(x + width, y + height - radius.br);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
            ctx.lineTo(x + radius.bl, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
            ctx.lineTo(x, y + radius.tl);
            ctx.quadraticCurveTo(x, y, x + radius.tl, y);
            ctx.closePath();
            
            if (fill) {
                ctx.fill();
            }
            
            if (stroke) {
                ctx.stroke();
            }
        }

        destroy() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            window.removeEventListener('resize', this.resize);
            
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
            
            this.initialized = false;
        }
    }

    // Weather alert notification system
    class WeatherAlertSystem {
        constructor() {
            this.activeAlerts = [];
            this.alertContainer = null;
            this.soundEnabled = true;
            this.initialized = false;
            this.checkInterval = null;
            
            // Alert severity levels
            this.severityLevels = {
                advisory: {
                    color: '#FFEB3B',
                    icon: '⚠️',
                    sound: 'advisory.mp3'
                },
                watch: {
                    color: '#FF9800',
                    icon: '⚠️',
                    sound: 'watch.mp3'
                },
                warning: {
                    color: '#F44336',
                    icon: '🚨',
                    sound: 'warning.mp3'
                },
                emergency: {
                    color: '#9C27B0',
                    icon: '🚨',
                    sound: 'emergency.mp3'
                }
            };
        }

        initialize() {
            if (this.initialized) return;
            
            // Create alert container
            this.alertContainer = document.createElement('div');
            this.alertContainer.id = 'weather-alert-container';
            this.alertContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                width: 300px;
                max-height: 80vh;
                overflow-y: auto;
                z-index: 9999;
                font-family: Arial, sans-serif;
            `;
            
            document.body.appendChild(this.alertContainer);
            
            // Create alert sound elements
            Object.values(this.severityLevels).forEach(level => {
                const audio = new Audio();
                audio.src = level.sound;
                audio.preload = 'auto';
                level.audioElement = audio;
            });
            
            // Set up periodic alert check (simulated)
            this.checkInterval = setInterval(() => this.checkForAlerts(), 300000); // Check every 5 minutes
            
            this.initialized = true;
        }

        checkForAlerts() {
            // This would normally fetch alerts from a weather API
            // Simulated version occasionally generates random alerts for demo purposes
            if (Math.random() < 0.3) { // 30% chance of generating an alert during a check
                const alertTypes = ['Thunderstorm', 'Flood', 'Heat', 'Wind', 'Winter Storm', 'Tornado', 'Hurricane'];
                const severities = Object.keys(this.severityLevels);
                
                const randomAlert = {
                    id: 'alert-' + Date.now(),
                    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
                    severity: severities[Math.floor(Math.random() * severities.length)],
                    title: 'Weather Alert',
                    description: 'This is a simulated weather alert for demonstration purposes.',
                    issued: new Date().toISOString(),
                    expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
                    areas: ['Sample Region']
                };
                
                this.showAlert(randomAlert);
            }
        }

        showAlert(alert) {
            if (!this.initialized) {
                this.initialize();
            }
            
            // Check if alert already exists
            if (this.activeAlerts.some(a => a.id === alert.id)) {
                return;
            }
            
            // Create alert element
            const alertElement = document.createElement('div');
            alertElement.id = alert.id;
            alertElement.className = 'weather-alert';
            
            // Get severity styling
            const severity = this.severityLevels[alert.severity] || this.severityLevels.advisory;
            
            // Set styles
            alertElement.style.cssText = `
                background-color: ${severity.color}25;
                border-left: 4px solid ${severity.color};
                color: #333;
                padding: 12px;
                margin-bottom: 10px;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                animation: slide-in 0.3s ease-out forwards;
                position: relative;
                transition: all 0.3s ease;
            `;
            
            // Create alert content
            alertElement.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <span style="font-size: 20px; margin-right: 8px;">${severity.icon}</span>
                    <div>
                        <div style="font-weight: bold; font-size: 14px;">${alert.type} ${alert.severity.toUpperCase()}</div>
                        <div style="font-size: 12px; opacity: 0.8;">Issued: ${new Date(alert.issued).toLocaleTimeString()}</div>
                    </div>
                    <button class="close-alert" style="margin-left: auto; background: none; border: none; cursor: pointer; font-size: 16px; opacity: 0.6;">&times;</button>
                </div>
                <div style="font-size: 13px; margin-bottom: 8px;">${alert.description}</div>
                <div style="font-size: 12px; font-style: italic;">Expires: ${new Date(alert.expires).toLocaleTimeString()}</div>
            `;
            
            // Add alert to container
            this.alertContainer.appendChild(alertElement);
            
            // Add to active alerts
            this.activeAlerts.push({
                id: alert.id,
                element: alertElement,
                expires: new Date(alert.expires)
            });
            
            // Set up auto-removal based on expiration
            const expirationTime = new Date(alert.expires).getTime() - Date.now();
            setTimeout(() => {
                this.removeAlert(alert.id);
            }, expirationTime);
            
            // Add close button handler
            const closeButton = alertElement.querySelector('.close-alert');
            closeButton.addEventListener('click', () => {
                this.removeAlert(alert.id);
            });
            
            // Play alert sound if enabled
            if (this.soundEnabled && severity.audioElement) {
                severity.audioElement.play().catch(e => console.log('Error playing alert sound:', e));
            }
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slide-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fade-out {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            return alertElement;
        }

        removeAlert(alertId) {
            const alertIndex = this.activeAlerts.findIndex(a => a.id === alertId);
            if (alertIndex === -1) return;
            
            const alert = this.activeAlerts[alertIndex];
            
            // Add fade-out animation
            alert.element.style.animation = 'fade-out 0.3s ease-out forwards';
            
            // Remove after animation completes
            setTimeout(() => {
                if (alert.element.parentNode) {
                    alert.element.parentNode.removeChild(alert.element);
                }
                this.activeAlerts.splice(alertIndex, 1);
            }, 300);
        }

        clearAllAlerts() {
            this.activeAlerts.forEach(alert => {
                if (alert.element.parentNode) {
                    alert.element.parentNode.removeChild(alert.element);
                }
            });
            
            this.activeAlerts = [];
        }

        toggleSound(enable) {
            this.soundEnabled = enable !== undefined ? enable : !this.soundEnabled;
            return this.soundEnabled;
        }

        cleanup() {
            if (this.checkInterval) {
                clearInterval(this.checkInterval);
            }
            
            this.clearAllAlerts();
            
            if (this.alertContainer && this.alertContainer.parentNode) {
                this.alertContainer.parentNode.removeChild(this.alertContainer);
            }
            
            this.initialized = false;
        }
    }

    // Units conversion utility
    class WeatherUnitsConverter {
        // Temperature conversions
        static celsiusToFahrenheit(celsius) {
            return (celsius * 9/5) + 32;
        }
        
        static fahrenheitToCelsius(fahrenheit) {
            return (fahrenheit - 32) * 5/9;
        }
        
        static celsiusToKelvin(celsius) {
            return celsius + 273.15;
        }
        
        static kelvinToCelsius(kelvin) {
            return kelvin - 273.15;
        }
        
        static fahrenheitToKelvin(fahrenheit) {
            return (fahrenheit - 32) * 5/9 + 273.15;
        }
        
        static kelvinToFahrenheit(kelvin) {
            return (kelvin - 273.15) * 9/5 + 32;
        }
        
        // Speed conversions
        static kmhToMph(kmh) {
            return kmh * 0.621371;
        }
        
        static mphToKmh(mph) {
            return mph * 1.60934;
        }
        
        static kmhToMs(kmh) {
            return kmh / 3.6;
        }
        
        static msToKmh(ms) {
            return ms * 3.6;
        }
        
        static mphToMs(mph) {
            return mph * 0.44704;
        }
        
        static msToMph(ms) {
            return ms * 2.23694;
        }
        
        static knotsToKmh(knots) {
            return knots * 1.852;
        }
        
        static kmhToKnots(kmh) {
            return kmh / 1.852;
        }
        
        // Pressure conversions
        static hpaToInches(hpa) {
            return hpa * 0.02953;
        }
        
        static inchesToHpa(inches) {
            return inches / 0.02953;
        }
        
        static hpaToMmHg(hpa) {
            return hpa * 0.75006;
        }
        
        static mmHgToHpa(mmHg) {
            return mmHg / 0.75006;
        }
        
        // Distance/length conversions
        static kmToMiles(km) {
            return km * 0.621371;
        }
        
        static milesToKm(miles) {
            return miles * 1.60934;
        }
        
        static mmToInches(mm) {
            return mm * 0.0393701;
        }
        
        static inchesToMm(inches) {
            return inches * 25.4;
        }
        
        // Batch convert a weather data object between unit systems
        static convertWeatherData(data, toSystem = 'metric') {
            if (!data) return null;
            
            const result = { ...data };
            
            if (toSystem === 'imperial' && data.units !== 'imperial') {
                // Convert to imperial
                if (data.temperature !== undefined) result.temperature = this.celsiusToFahrenheit(data.temperature);
                if (data.temperatureHigh !== undefined) result.temperatureHigh = this.celsiusToFahrenheit(data.temperatureHigh);
                if (data.temperatureLow !== undefined) result.temperatureLow = this.celsiusToFahrenheit(data.temperatureLow);
                if (data.feelsLike !== undefined) result.feelsLike = this.celsiusToFahrenheit(data.feelsLike);
                if (data.dewPoint !== undefined) result.dewPoint = this.celsiusToFahrenheit(data.dewPoint);
                if (data.windSpeed !== undefined) result.windSpeed = this.kmhToMph(data.windSpeed);
                if (data.windGust !== undefined) result.windGust = this.kmhToMph(data.windGust);
                if (data.pressure !== undefined) result.pressure = this.hpaToInches(data.pressure);
                if (data.visibility !== undefined) result.visibility = this.kmToMiles(data.visibility);
                if (data.precipIntensity !== undefined) result.precipIntensity = this.mmToInches(data.precipIntensity);
                
                result.units = 'imperial';
            } else if (toSystem === 'metric' && data.units !== 'metric') {
                // Convert to metric
                if (data.temperature !== undefined) result.temperature = this.fahrenheitToCelsius(data.temperature);
                if (data.temperatureHigh !== undefined) result.temperatureHigh = this.fahrenheitToCelsius(data.temperatureHigh);
                if (data.temperatureLow !== undefined) result.temperatureLow = this.fahrenheitToCelsius(data.temperatureLow);
                if (data.feelsLike !== undefined) result.feelsLike = this.fahrenheitToCelsius(data.feelsLike);
                if (data.dewPoint !== undefined) result.dewPoint = this.fahrenheitToCelsius(data.dewPoint);
                if (data.windSpeed !== undefined) result.windSpeed = this.mphToKmh(data.windSpeed);
                if (data.windGust !== undefined) result.windGust = this.mphToKmh(data.windGust);
                if (data.pressure !== undefined) result.pressure = this.inchesToHpa(data.pressure);
                if (data.visibility !== undefined) result.visibility = this.milesToKm(data.visibility);
                if (data.precipIntensity !== undefined) result.precipIntensity = this.inchesToMm(data.precipIntensity);
                
                result.units = 'metric';
            }
            
            return result;
        }
        
        // Generate a text description of wind direction based on degrees
        static getWindDirectionText(degrees) {
            const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
            const index = Math.round(degrees / 22.5) % 16;
            return directions[index];
        }
        
        // Convert wind direction degrees to cardinal direction
        static degreesToCardinal(degrees) {
            return this.getWindDirectionText(degrees);
        }
        
        // Get wind description based on speed
        static getWindDescription(speed, units = 'metric') {
            // Convert to km/h if not already
            const kmh = units === 'imperial' ? this.mphToKmh(speed) : speed;
            
            if (kmh < 1) return 'Calm';
            if (kmh < 6) return 'Light air';
            if (kmh < 12) return 'Light breeze';
            if (kmh < 20) return 'Gentle breeze';
            if (kmh < 29) return 'Moderate breeze';
            if (kmh < 39) return 'Fresh breeze';
            if (kmh < 50) return 'Strong breeze';
            if (kmh < 62) return 'Near gale';
            if (kmh < 75) return 'Gale';
            if (kmh < 89) return 'Strong gale';
            if (kmh < 103) return 'Storm';
            if (kmh < 118) return 'Violent storm';
            return 'Hurricane force';
        }
        
        // Get Beaufort scale number (0-12) based on wind speed
        static getBeaufortScale(speed, units = 'metric') {
            // Convert to km/h if not already
            const kmh = units === 'imperial' ? this.mphToKmh(speed) : speed;
            
            if (kmh < 1) return 0;
            if (kmh < 6) return 1;
            if (kmh < 12) return 2;
            if (kmh < 20) return 3;
            if (kmh < 29) return 4;
            if (kmh < 39) return 5;
            if (kmh < 50) return 6;
            if (kmh < 62) return 7;
            if (kmh < 75) return 8;
            if (kmh < 89) return 9;
            if (kmh < 103) return 10;
            if (kmh < 118) return 11;
            return 12;
        }
        
        // Get UV index description based on value
        static getUVIndexDescription(uvIndex) {
            if (uvIndex < 3) return 'Low';
            if (uvIndex < 6) return 'Moderate';
            if (uvIndex < 8) return 'High';
            if (uvIndex < 11) return 'Very High';
            return 'Extreme';
        }
        
        // Get visual description of humidity level
        static getHumidityDescription(humidity) {
            if (humidity < 30) return 'Very Dry';
            if (humidity < 40) return 'Dry';
            if (humidity < 60) return 'Comfortable';
            if (humidity < 70) return 'Moderately Humid';
            if (humidity < 80) return 'Humid';
            return 'Very Humid';
        }
        
        // Calculate wind chill temperature (feels like in cold)
        static calculateWindChill(temperature, windSpeed, units = 'metric') {
            // Ensure inputs are in correct units
            let t = temperature;
            let v = windSpeed;
            
            if (units === 'imperial') {
                // Formula requires Fahrenheit and mph
                // No conversion needed if already imperial
            } else {
                // Convert to imperial for calculation
                t = this.celsiusToFahrenheit(t);
                v = this.kmhToMph(v);
            }
            
            // Wind chill formula only applies in certain conditions
            if (t <= 50 && v >= 3) {
                // Wind chill formula (Fahrenheit, mph)
                const windChill = 35.74 + (0.6215 * t) - (35.75 * Math.pow(v, 0.16)) + (0.4275 * t * Math.pow(v, 0.16));
                
                // Convert back to metric if needed
                return units === 'imperial' ? windChill : this.fahrenheitToCelsius(windChill);
            }
            
            return temperature; // Return actual temperature if formula doesn't apply
        }
        
        // Calculate heat index (feels like in hot/humid conditions)
        static calculateHeatIndex(temperature, humidity, units = 'metric') {
            // Heat index calculation requires Fahrenheit
            let t = units === 'metric' ? this.celsiusToFahrenheit(temperature) : temperature;
            const h = humidity;
            
            if (t < 80) {
                return units === 'metric' ? temperature : t; // Heat index not applicable
            }
            
            // Heat index formula
            let heatIndex = -42.379 + (2.04901523 * t) + (10.14333127 * h) - (0.22475541 * t * h) -
                (0.00683783 * t * t) - (0.05481717 * h * h) + (0.00122874 * t * t * h) +
                (0.00085282 * t * h * h) - (0.00000199 * t * t * h * h);
            
            // Convert back to metric if needed
            return units === 'metric' ? this.fahrenheitToCelsius(heatIndex) : heatIndex;
        }
        
        // Calculate dew point temperature
        static calculateDewPoint(temperature, humidity, units = 'metric') {
            // Ensure temperature is in Celsius for calculation
            const t = units === 'imperial' ? this.fahrenheitToCelsius(temperature) : temperature;
            const h = humidity;
            
            // Calculate dew point in Celsius
            const a = 17.27;
            const b = 237.7;
            const alpha = ((a * t) / (b + t)) + Math.log(h / 100);
            const dewPoint = (b * alpha) / (a - alpha);
            
            // Convert to requested units
            return units === 'imperial' ? this.celsiusToFahrenheit(dewPoint) : dewPoint;
        }
    }

    // Weather language processor to enhance responses with meteorological terms
    class WeatherLanguageProcessor {
        constructor() {
            this.termsDict = METEOROLOGICAL_TERMS;
            this.explanationProbability = 0.7; // Chance of explaining a technical term
            this.maxExplanationsPerResponse = 2; // Maximum explanations to include
        }

        processText(text) {
            if (!text) return text;
            
            let processedText = text;
            let explanationCount = 0;
            const explanations = [];
            
            // Check for meteorological terms that could be explained
            for (const [term, explanation] of Object.entries(this.termsDict)) {
                // Skip if we've already reached max explanations
                if (explanationCount >= this.maxExplanationsPerResponse) break;
                
                // Check if the term is used in the text (case insensitive)
                const regex = new RegExp(`\\b${term}\\b`, 'gi');
                if (regex.test(processedText) && Math.random() < this.explanationProbability) {
                    explanations.push(`**${term}**: ${explanation}`);
                    explanationCount++;
                }
            }
            
            // Add explanations at the end if any were found
            if (explanations.length > 0) {
                processedText += '\n\n**Meteorological Terms:**\n' + explanations.join('\n');
            }
            
            return processedText;
        }

        addContextualInfo(baseResponse, context = {}) {
            if (!baseResponse) return baseResponse;
            
            let enhancedResponse = baseResponse;
            
            // Add appropriate contextual information based on weather conditions
            if (context.conditions) {
                // Temperature context
                if (context.conditions.temperature !== undefined) {
                    const temp = context.conditions.temperature;
                    if (temp > 35) {
                        enhancedResponse += "\n\n🌡️ **Heat Advisory:** Current temperatures are dangerously high. Stay hydrated and avoid extended exposure to the sun.";
                    } else if (temp > 30) {
                        enhancedResponse += "\n\n🌡️ **Heat Information:** Temperatures are quite high. Remember to stay hydrated and take breaks from the heat when possible.";
                    } else if (temp < -10) {
                        enhancedResponse += "\n\n❄️ **Extreme Cold Warning:** Current temperatures are dangerously low. Limit time outdoors and dress in warm layers.";
                    } else if (temp < 0) {
                        enhancedResponse += "\n\n❄️ **Freezing Conditions:** Temperatures are below freezing. Be aware of possible ice on roads and walkways.";
                    }
                }
                
                // Precipitation context
                if (context.conditions.precipProbability !== undefined) {
                    const precipProb = context.conditions.precipProbability;
                    if (precipProb > 70) {
                        enhancedResponse += "\n\n🌧️ Precipitation is highly likely. Consider bringing an umbrella or raincoat.";
                    }
                }
                
                // Wind context
                if (context.conditions.windSpeed !== undefined) {
                    const windSpeed = context.conditions.windSpeed;
                    const beaufortScale = WeatherUnitsConverter.getBeaufortScale(windSpeed);
                    const windDescription = WeatherUnitsConverter.getWindDescription(windSpeed);
                    
                    if (beaufortScale >= 8) {
                        enhancedResponse += `\n\n💨 **Strong Wind Alert:** Current wind conditions are at ${windDescription} strength (Beaufort scale: ${beaufortScale}). Secure loose objects outdoors.`;
                    } else if (beaufortScale >= 6) {
                        enhancedResponse += `\n\n💨 **Wind Advisory:** Current wind conditions are at ${windDescription} strength (Beaufort scale: ${beaufortScale}).`;
                    }
                }
                
                // UV Index context
                if (context.conditions.uvIndex !== undefined) {
                    const uvIndex = context.conditions.uvIndex;
                    const uvDescription = WeatherUnitsConverter.getUVIndexDescription(uvIndex);
                    
                    if (uvIndex >= 8) {
                        enhancedResponse += `\n\n☀️ **UV Warning:** UV Index is currently in the ${uvDescription} range (${uvIndex}). Wear sunscreen, protective clothing, and limit sun exposure between 10am-4pm.`;
                    } else if (uvIndex >= 6) {
                        enhancedResponse += `\n\n☀️ **UV Advisory:** UV Index is currently in the ${uvDescription} range (${uvIndex}). Wear sunscreen and protective clothing when outdoors.`;
                    } else if (uvIndex >= 3) {
                        enhancedResponse += `\n\n☀️ UV Index is currently in the ${uvDescription} range (${uvIndex}). Consider wearing sunscreen for extended outdoor activities.`;
                    }
                }
            }
            
            return enhancedResponse;
        }

        generateWeatherSummary(conditions, useMetric = true) {
            if (!conditions) return 'Weather data unavailable.';
            
            const tempUnit = useMetric ? '°C' : '°F';
            const speedUnit = useMetric ? 'km/h' : 'mph';
            const distanceUnit = useMetric ? 'km' : 'mi';
            
            // Convert units if needed
            const data = conditions.units === 'metric' && !useMetric || conditions.units === 'imperial' && useMetric
                ? WeatherUnitsConverter.convertWeatherData(conditions, useMetric ? 'metric' : 'imperial')
                : conditions;
            
            let summary = `**Current Weather for ${data.location || 'Current Location'}**\n\n`;
            
            // Temperature and "feels like"
            summary += `🌡️ Temperature: ${Math.round(data.temperature)}${tempUnit}`;
            if (data.feelsLike) {
                summary += ` (Feels like: ${Math.round(data.feelsLike)}${tempUnit})\n`;
            } else {
                summary += '\n';
            }
            
            // Weather condition
            if (data.icon) {
                const iconEmoji = this.weatherIconToEmoji(data.icon);
                summary += `${iconEmoji} Conditions: ${this.formatWeatherCondition(data.icon)}\n`;
            }
            
            // Wind information
            if (data.windSpeed !== undefined) {
                const windDirection = data.windDirection !== undefined
                    ? WeatherUnitsConverter.degreesToCardinal(data.windDirection)
                    : '';
                    
                const windDescription = WeatherUnitsConverter.getWindDescription(data.windSpeed, data.units);
                
                summary += `💨 Wind: ${Math.round(data.windSpeed)} ${speedUnit} ${windDirection} (${windDescription})`;
                
                if (data.windGust && data.windGust > data.windSpeed * 1.3) {
                    summary += `, gusting to ${Math.round(data.windGust)} ${speedUnit}`;
                }
                
                summary += '\n';
            }
            
            // Humidity and dewpoint
            if (data.humidity !== undefined) {
                summary += `💧 Humidity: ${Math.round(data.humidity)}%`;
                
                if (data.dewPoint !== undefined) {
                    summary += ` (Dew point: ${Math.round(data.dewPoint)}${tempUnit})`;
                }
                
                summary += '\n';
            }
            
            // Precipitation
            if (data.precipProbability !== undefined) {
                summary += `🌧️ Precipitation: ${Math.round(data.precipProbability)}% chance`;
                
                if (data.precipIntensity !== undefined && data.precipProbability > 0) {
                    const intensityDesc = this.getPrecipitationIntensityDescription(data.precipIntensity, data.units);
                    summary += ` (${intensityDesc})`;
                }
                
                summary += '\n';
            }
            
            // Additional data if available
            if (data.pressure !== undefined) {
                const pressureUnit = useMetric ? 'hPa' : 'inHg';
                const pressureValue = useMetric ? Math.round(data.pressure) : data.pressure.toFixed(2);
                
                // Determine if pressure is rising, falling, or steady
                let pressureTrend = '';
                if (data.pressureTrend) {
                    pressureTrend = data.pressureTrend > 0 ? ' ↑' : data.pressureTrend < 0 ? ' ↓' : ' →';
                }
                
                summary += `📊 Pressure: ${pressureValue} ${pressureUnit}${pressureTrend}\n`;
            }
            
            if (data.visibility !== undefined) {
                summary += `👁️ Visibility: ${data.visibility.toFixed(1)} ${distanceUnit}\n`;
            }
            
            if (data.uvIndex !== undefined) {
                const uvDesc = WeatherUnitsConverter.getUVIndexDescription(data.uvIndex);
                summary += `☀️ UV Index: ${data.uvIndex} (${uvDesc})\n`;
            }
            
            // Add timestamp
            if (data.timestamp) {
                const observationTime = new Date(data.timestamp);
                summary += `\n🕒 Observation time: ${observationTime.toLocaleTimeString()} ${observationTime.toLocaleDateString()}\n`;
            }
            
            return summary;
        }

        generateForecastSummary(forecastData, useMetric = true) {
            if (!forecastData || forecastData.length === 0) return 'Forecast data unavailable.';
            
            const tempUnit = useMetric ? '°C' : '°F';
            const speedUnit = useMetric ? 'km/h' : 'mph';
            
            let summary = '**Weather Forecast**\n\n';
            
            // Process each day in the forecast
            forecastData.forEach((day, index) => {
                // Convert units if needed
                const data = day.units === 'metric' && !useMetric || day.units === 'imperial' && useMetric
                    ? WeatherUnitsConverter.convertWeatherData(day, useMetric ? 'metric' : 'imperial')
                    : day;
                
                // Format date
                const date = new Date(data.date);
                const dateString = index === 0 ? 'Today' : 
                                 index === 1 ? 'Tomorrow' : 
                                 date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
                
                // Weather icon
                const iconEmoji = this.weatherIconToEmoji(data.icon);
                
                summary += `**${dateString}**: ${iconEmoji} `;
                
                // Temperature range
                if (data.temperatureHigh !== undefined && data.temperatureLow !== undefined) {
                    summary += `${Math.round(data.temperatureLow)}${tempUnit} to ${Math.round(data.temperatureHigh)}${tempUnit}. `;
                }
                
                // Condition description
                summary += `${this.formatWeatherCondition(data.icon)}. `;
                
                // Precipitation chance
                if (data.precipProbability !== undefined) {
                    summary += `${Math.round(data.precipProbability)}% chance of precipitation. `;
                }
                
                // Wind
                if (data.windSpeed !== undefined) {
                    summary += `Wind ${Math.round(data.windSpeed)} ${speedUnit}. `;
                }
                
                summary += '\n';
                
                // Add more details for today and tomorrow
                if (index <= 1) {
                    if (data.humidity !== undefined) {
                        summary += `  • Humidity: ${Math.round(data.humidity)}%\n`;
                    }
                    
                    if (data.uvIndex !== undefined) {
                        const uvDesc = WeatherUnitsConverter.getUVIndexDescription(data.uvIndex);
                        summary += `  • UV Index: ${data.uvIndex} (${uvDesc})\n`;
                    }
                    
                    // Add precipitation details if chance is significant
                    if (data.precipProbability >= 30 && data.precipIntensity !== undefined) {
                        const intensityDesc = this.getPrecipitationIntensityDescription(data.precipIntensity, data.units);
                        summary += `  • Precipitation: ${intensityDesc}\n`;
                    }
                }
                
                summary += '\n';
            });
            
            return summary;
        }

        weatherIconToEmoji(icon) {
            const iconMap = {
                'clear-day': '☀️',
                'clear-night': '🌙',
                'partly-cloudy-day': '⛅',
                'partly-cloudy-night': '🌙☁️',
                'cloudy': '☁️',
                'rain': '🌧️',
                'showers': '🌦️',
                'sleet': '🌨️',
                'snow': '❄️',
                'thunderstorm': '⛈️',
                'tornado': '🌪️',
                'wind': '💨',
                'fog': '🌫️',
                'hail': '🧊',
                'hurricane': '🌀'
            };
            
            return iconMap[icon] || '🌤️';
        }

        formatWeatherCondition(icon) {
            const conditionMap = {
                'clear-day': 'Clear skies',
                'clear-night': 'Clear night',
                'partly-cloudy-day': 'Partly cloudy',
                'partly-cloudy-night': 'Partly cloudy night',
                'cloudy': 'Cloudy',
                'rain': 'Rain',
                'showers': 'Scattered showers',
                'sleet': 'Sleet',
                'snow': 'Snow',
                'thunderstorm': 'Thunderstorms',
                'tornado': 'Tornado warning',
                'wind': 'Windy',
                'fog': 'Foggy',
                'hail': 'Hail',
                'hurricane': 'Hurricane conditions'
            };
            
            return conditionMap[icon] || 'Mixed conditions';
        }

        getPrecipitationIntensityDescription(intensity, units = 'metric') {
            // Convert to mm/h if in imperial
            const mmh = units === 'imperial' ? WeatherUnitsConverter.inchesToMm(intensity) : intensity;
            
            if (mmh < 0.25) return 'Very light precipitation';
            if (mmh < 1.0) return 'Light precipitation';
            if (mmh < 4.0) return 'Moderate precipitation';
            if (mmh < 10.0) return 'Heavy precipitation';
            if (mmh < 50.0) return 'Very heavy precipitation';
            return 'Extreme precipitation';
        }

        addWeatherFactoid(baseResponse) {
            const factoids = [
                "Did you know? Lightning strikes the Earth about 8.6 million times per day.",
                "Weather fact: The fastest recorded wind speed not associated with a tornado was 253 mph (407 km/h) during Tropical Cyclone Olivia in 1996.",
                "Meteorology tidbit: Snowflakes typically fall at a speed of 1-4 miles per hour (1.6-6.4 km/h).",
                "Weather insight: The coldest temperature ever recorded on Earth was -128.6°F (-89.2°C) at Vostok Station, Antarctica.",
                "Climate note: The wettest place on Earth is Mawsynram, India, which receives about 467 inches (11,862 mm) of rainfall annually.",
                "Fascinating fact: A single thunderstorm can use more energy than an atomic bomb.",
                "Weather phenomenon: 'Thundersnow' occurs when thunder and lightning happen during a snowstorm.",
                "Atmospheric tidbit: The reason the sky appears blue is that air molecules scatter blue wavelengths of light more than red ones.",
                "Cloud fact: Cumulus clouds can weigh more than a million pounds (453,592 kg).",
                "Rain drops aren't actually tear-shaped. They start as spheres and flatten as they fall, eventually resembling tiny parachutes.",
                "Tornado insight: The United States experiences the most tornadoes of any country, with an average of over 1,200 per year.",
                "Humidity fact: The most humid place on Earth is Dhahran, Saudi Arabia, where the average dew point in summer is 95°F (35°C).",
                "Storm note: Hurricane eyes can range from 2 miles (3.2 km) to over 200 miles (320 km) in diameter.",
                "Climate insight: The record for the longest lightning bolt was 199.5 miles (321 km) long, recorded in Brazil in 2018.",
                "Weather history: The hottest temperature ever recorded on Earth was 134°F (56.7°C) in Death Valley, California in 1913."
            ];
            
            if (Math.random() < 0.3) {
                const randomFactoid = factoids[Math.floor(Math.random() * factoids.length)];
                return baseResponse + `\n\n🌐 **Weather Factoid**: ${randomFactoid}`;
            }
            
            return baseResponse;
        }
    }

    // Define the Weather Forecaster AI mode
    const weatherForecasterAI = {
        id: 'weather-forecaster',
        name: 'Weather Forecaster AI',
        description: 'Professional meteorological assistant specializing in weather predictions, climate data analysis, and weather-related recommendations.',
        version: '1.0.0',
        author: 'JAAT-AI Professional Series',
        category: 'Productivity',
        tags: ['weather', 'meteorology', 'climate', 'forecasting', 'environment'],
        isActive: true,
        isPremium: true,
        iconClass: 'mode-icon-weather',
        backgroundColor: '#0077B6',
        textColor: '#FFFFFF',
        
        // System prompt that defines the AI's personality and capabilities
        systemPrompt: `You are a professional Weather Forecaster AI assistant with expertise in meteorology, atmospheric science, and climate data analysis. Your communication style is clear, informative, and scientifically accurate while remaining accessible to non-experts. 

When discussing weather patterns, provide context about atmospheric conditions and underlying meteorological principles. You excel at explaining complex weather phenomena in easy-to-understand terms and can discuss historical weather trends, seasonal patterns, and climate change impacts. 

You help users with weather-related queries including forecasts, severe weather preparations, travel planning based on weather conditions, selecting appropriate clothing for weather conditions, and understanding meteorological concepts and terminology. Always clarify that while your information is based on meteorological science, real-time forecasts should be verified with local weather services, especially for severe weather events.`,
        
        // Example phrases to demonstrate the AI's voice
        examplePhrases: [
            "The barometric pressure drop indicates a strong low-pressure system moving into your area. Let me explain what that means for your weekend plans.",
            "Based on historical climate data for that region, early June typically sees temperatures ranging from 65-80°F with a 30% chance of afternoon thunderstorms.",
            "The satellite imagery shows a developing mesocyclone. Here's what you should know about this tornado risk and preparation steps.",
            "That weather pattern you're describing is known as 'lake effect snow'. It occurs when cold air moves across long expanses of warmer lake water."
        ],
        
        // Knowledge base for meteorological facts, phenomena, and climate patterns
        knowledgeBase: {
            weatherPhenomena: [
                "El Niño - A climate pattern characterized by the warming of ocean surface temperatures in the central and eastern tropical Pacific Ocean, affecting global weather patterns.",
                "La Niña - The opposite of El Niño, featuring cooler than average surface temperatures in the equatorial Pacific, altering global atmospheric circulation.",
                "Polar Vortex - A large area of low pressure and cold air surrounding the Earth's poles, which can weaken and allow cold air to spill into more temperate regions.",
                "Jet Stream - Fast flowing, narrow air currents found in the atmosphere at the boundary between the troposphere and stratosphere, influencing weather patterns.",
                "Lake Effect Snow - Heavy snowfall produced when cold air masses move across long expanses of warmer lake water, picking up water vapor and depositing it as snow.",
                "Heat Dome - A persistent high-pressure system that traps hot air underneath it, leading to extreme heat events.",
                "Haboob - An intense dust storm carried on an atmospheric gravity current, common in arid regions.",
                "Derecho - A widespread, long-lived wind storm associated with a band of rapidly moving showers or thunderstorms.",
                "Atmospheric River - Long, narrow regions in the atmosphere that transport most of the water vapor outside of the tropics.",
                "Inversion Layer - A layer in the atmosphere where temperature increases with height, contrary to the normal pattern of temperature decrease with altitude."
            ],
            
            weatherSafety: [
                "Lightning Safety - If you can hear thunder, you're close enough to be struck by lightning. Seek shelter in a building or hard-topped vehicle.",
                "Tornado Safety - In case of a tornado warning, seek shelter in a basement or interior room on the lowest floor, away from windows.",
                "Hurricane Preparation - Prepare an emergency kit, know evacuation routes, and secure property before a hurricane.",
                "Flash Flood Safety - Never walk or drive through floodwaters. Just six inches of moving water can knock you down, and one foot of water can sweep your vehicle away.",
                "Winter Storm Safety - Stay indoors during winter storms, keep emergency supplies, and maintain heat sources safely.",
                "Heat Wave Safety - Stay hydrated, wear light clothing, and avoid outdoor activities during peak heat hours.",
                "Air Quality Protection - Use masks when air quality is poor due to smoke or pollution, and limit outdoor exposure.",
                "UV Protection - Use sunscreen with SPF 30+, wear protective clothing, and limit sun exposure between 10am and 4pm.",
                "Thunderstorm Safety - Follow the 30/30 rule: if you count less than 30 seconds between lightning and thunder, seek shelter for at least 30 minutes after the last thunder.",
                "Cold Weather Safety - Dress in layers, cover extremities, and be aware of signs of hypothermia and frostbite."
            ],
            
            climatePatterns: [
                "Global Circulation Patterns - The large-scale movement of air that, together with ocean circulation, redistributes heat around the Earth.",
                "Hadley Cell - A circulation pattern where air rises at the equator and sinks at about 30° latitude, creating many of the world's deserts.",
                "Monsoons - Seasonal changes in atmospheric circulation and precipitation primarily in South Asia, influencing regional rainfall patterns.",
                "North Atlantic Oscillation - Fluctuations in the difference of atmospheric pressure between the Icelandic low and the Azores high, affecting weather across Europe.",
                "Pacific Decadal Oscillation - Long-term ocean fluctuation pattern that shifts between warm and cool phases, affecting climate in the North Pacific.",
                "Arctic Oscillation - The opposing atmospheric pressure patterns in the northern middle and high latitudes, affecting weather throughout the Northern Hemisphere.",
                "Madden-Julian Oscillation - An eastward moving disturbance of clouds, rainfall, winds, and pressure across the tropics with a cycle of 30-60 days.",
                "Indian Ocean Dipole - An irregular oscillation of sea-surface temperatures where the western Indian Ocean becomes warmer and then colder than the eastern part.",
                "Walker Circulation - An atmospheric circulation pattern across the tropical Pacific, directly linked to El Niño and La Niña events.",
                "Subtropical High Pressure Belts - Semi-permanent high-pressure systems around 30° latitude that influence global precipitation patterns."
            ],
            
            climateTrends: [
                "Global Warming Trends - The long-term heating of Earth's climate system observed since the pre-industrial period due to human activities.",
                "Sea Level Rise - The increase in the average global sea level due to thermal expansion of oceans and melting of ice sheets and glaciers.",
                "Ocean Acidification - The ongoing decrease in the pH of the Earth's oceans caused by the uptake of carbon dioxide from the atmosphere.",
                "Glacier Retreat - The process where glaciers worldwide are shrinking in size due to increased melting rates.",
                "Arctic Sea Ice Decline - The significant decrease in Arctic sea ice extent and thickness over recent decades.",
                "Extreme Weather Frequency - The changing patterns of extreme weather events becoming more frequent or severe.",
                "Shifting Growing Seasons - Changes in the timing of seasonal growing periods affecting agriculture and ecosystems.",
                "Desertification - The process by which fertile land becomes desert, typically as a result of drought, deforestation, or inappropriate agriculture.",
                "Permafrost Thawing - The melting of previously permanently frozen ground in polar regions, releasing stored carbon.",
                "Changing Precipitation Patterns - Alterations in when, where, and how much precipitation falls globally."
            ]
        },
        
        // Functions this mode can call
        supportedFunctions: ['weatherSearch', 'locationDetection', 'dataVisualization', 'alertNotification'],
        
        // Configuration parameters that control the AI's behavior
        parameters: {
            temperature: 0.4,
            technicalTermExplanation: 'automatic',
            forecastHorizon: '14d',
            includeSevereWeatherAlerts: true,
            includeHistoricalContext: true,
            climateChangeReference: 'when-relevant',
            preferredUnits: 'automatic-detect'  // Automatically detect metric vs imperial
        },
        
        // Weather visualizer for data visualization
        weatherVisualizer: new WeatherVisualizer(),
        
        // Alert system for weather warnings
        alertSystem: new WeatherAlertSystem(),
        
        // Language processor for enhanced meteorological responses
        languageProcessor: new WeatherLanguageProcessor(),
        
        // Units converter utility
        unitsConverter: WeatherUnitsConverter,
        
        // Method to initialize the mode when selected
        initialize: function() {
            console.log('Initializing Weather Forecaster AI mode');
            
            // Add weather theme to body
            document.body.classList.add('weather-theme');
            
            // Create weather visualization container if needed
            if (document.getElementById('weather-visualizer-container') === null) {
                const container = document.createElement('div');
                container.id = 'weather-visualizer-container';
                container.style.cssText = 'width: 100%; height: 400px; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);';
                
                // Find an appropriate place to add the visualizer
                const chatContainer = document.querySelector('.chat-container') || document.querySelector('#chat-container');
                if (chatContainer) {
                    chatContainer.parentNode.insertBefore(container, chatContainer.nextSibling);
                } else {
                    document.body.appendChild(container);
                }
                
                // Initialize visualizer
                this.weatherVisualizer.initialize(container);
            }
            
            // Initialize alert system
            this.alertSystem.initialize();
            
            // Attempt to get user's location for weather context
            this.detectUserLocation();
            
            return true;
        },
        
        // Method to clean up when switching away from this mode
        cleanup: function() {
            console.log('Deactivating Weather Forecaster AI mode');
            
            // Remove weather theme class
            document.body.classList.remove('weather-theme');
            
            // Clean up visualizer
            if (this.weatherVisualizer) {
                this.weatherVisualizer.destroy();
            }
            
            // Clean up alert system
            if (this.alertSystem) {
                this.alertSystem.cleanup();
            }
            
            // Clear any stored location data
            this.userLocation = null;
            
            return true;
        },
        
        // Attempt to detect user's location for localized weather information
        detectUserLocation: function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    // Success callback
                    (position) => {
                        this.userLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        
                        console.log('User location detected:', this.userLocation);
                        
                        // Could fetch actual weather data here in a real implementation
                        // For demo purposes, we'll use the mock data already in the visualizer
                    },
                    // Error callback
                    (error) => {
                        console.log('Error detecting location:', error.message);
                    },
                    // Options
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                console.log('Geolocation is not supported by this browser');
            }
        },
        
        // Custom response processor for this AI mode
        processResponse: function(response, context) {
            // Process language with meteorological term explanations
            let processedResponse = this.languageProcessor.processText(response);
            
            // Add contextual weather information if available
            if (context && context.weatherData) {
                processedResponse = this.languageProcessor.addContextualInfo(processedResponse, {
                    conditions: context.weatherData.current,
                    forecast: context.weatherData.forecast
                });
            }
            
            // Occasionally add a weather factoid
            processedResponse = this.languageProcessor.addWeatherFactoid(processedResponse);
            
            return processedResponse;
        },
        
        // Generate weather forecast for a location
        generateForecast: function(location) {
            // In a real implementation, this would fetch actual weather data
            // For demo purposes, we'll return formatted mock data
            
            // Use the mock data from the visualizer
            const mockCurrentWeather = this.weatherVisualizer.weatherData;
            mockCurrentWeather.location = location || mockCurrentWeather.location;
            
            const mockForecast = this.weatherVisualizer.forecastData;
            
            // Get user's preferred unit system
            const useMetric = this.parameters.preferredUnits === 'metric' || 
                             (this.parameters.preferredUnits === 'automatic-detect' && 
                              !this.isUserInImperialCountry());
            
            // Generate formatted weather summary
            const currentWeatherSummary = this.languageProcessor.generateWeatherSummary(mockCurrentWeather, useMetric);
            const forecastSummary = this.languageProcessor.generateForecastSummary(mockForecast, useMetric);
            
            return {
                currentWeatherSummary,
                forecastSummary,
                forecastData: {
                    current: mockCurrentWeather,
                    forecast: mockForecast
                }
            };
        },
        
        // Check if user is likely in a country that uses imperial units
        isUserInImperialCountry: function() {
            // Simple check based on user's location if available
            // In a real implementation, this would be more sophisticated
            if (this.userLocation && this.userLocation.country) {
                // Only US, Liberia, and Myanmar use imperial system
                return ['US', 'USA', 'United States', 'Liberia', 'Myanmar'].includes(this.userLocation.country);
            }
            
            // Default to metric as it's used by most countries
            return false;
        },
        
        // Get severe weather alerts for a location
        getSevereWeatherAlerts: function(location) {
            // In a real implementation, this would fetch actual alert data
            // For demo purposes, we'll return example alerts
            
            const exampleAlerts = [{
                id: 'alert-1',
                type: 'Thunderstorm',
                severity: 'warning',
                title: 'Severe Thunderstorm Warning',
                description: 'The National Weather Service has issued a Severe Thunderstorm Warning for ' + (location || 'your area') + '. Expect heavy rain, lightning, and possible hail. Take shelter indoors.',
                issued: new Date().toISOString(),
                expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
                areas: [location || 'Sample Region']
            }];
            
            // Show the alert in the UI if alerts are enabled
            if (this.parameters.includeSevereWeatherAlerts && this.alertSystem) {
                exampleAlerts.forEach(alert => {
                    this.alertSystem.showAlert(alert);
                });
            }
            
            return exampleAlerts;
        },
        
        // Generate travel recommendations based on weather
        generateTravelRecommendations: function(destination, departureDate, returnDate) {
            // In a real implementation, this would use actual weather forecast data
            // For demo purposes, we'll provide example recommendations
            
            const recommendations = {
                destination: destination || 'your destination',
                departureDate: departureDate || 'your departure date',
                returnDate: returnDate || 'your return date',
                weatherSummary: 'Based on historical weather patterns and current forecasts, expect mild temperatures between 15-25°C (59-77°F) with a 30% chance of precipitation during your trip.',
                packingList: [
                    'Light jacket or sweater for cooler evenings',
                    'Umbrella or lightweight rain jacket',
                    'Comfortable walking shoes',
                    'Sunscreen and sunglasses',
                    'Layers for temperature variations'
                ],
                activityRecommendations: [
                    'Outdoor activities are generally favorable, especially in the morning hours',
                    'Have indoor alternatives ready for potential afternoon showers',
                    'Beach or water activities may be limited on days 2-3 due to wind conditions',
                    'Best hiking conditions expected on days 1 and 4 of your trip'
                ],
                alerts: []
            };
            
            return recommendations;
        },
        
        // Provide clothing recommendations based on weather
        generateClothingRecommendations: function(temperature, conditions, precipitation, windSpeed) {
            // Default values if not provided
            temperature = temperature || 20; // Celsius
            conditions = conditions || 'partly-cloudy-day';
            precipitation = precipitation || 20; // Percentage
            windSpeed = windSpeed || 10; // km/h
            
            let recommendations = {
                overall: '',
                essentials: [],
                optional: [],
                avoid: []
            };
            
            // Temperature based recommendations
            if (temperature < -10) {
                recommendations.overall = 'Extreme Cold';
                recommendations.essentials.push(
                    'Heavy insulated coat or parka',
                    'Thermal base layers',
                    'Insulated hat that covers ears',
                    'Insulated gloves or mittens',
                    'Insulated boots with good traction',
                    'Thick wool socks',
                    'Scarf or neck gaiter'
                );
                recommendations.optional.push(
                    'Hand/foot warmers',
                    'Face mask for extreme cold',
                    'Thermal insulated pants'
                );
                recommendations.avoid.push(
                    'Cotton clothing (retains moisture and loses insulating properties)',
                    'Exposed skin',
                    'Single-layer clothing'
                );
            } else if (temperature < 0) {
                recommendations.overall = 'Very Cold';
                recommendations.essentials.push(
                    'Winter coat',
                    'Warm hat',
                    'Gloves',
                    'Scarf',
                    'Warm boots',
                    'Thick socks',
                    'Layers of clothing'
                );
                recommendations.optional.push(
                    'Thermal underwear',
                    'Ear muffs',
                    'Hand warmers'
                );
                recommendations.avoid.push(
                    'Cotton as base layer',
                    'Thin shoes or sneakers'
                );
            } else if (temperature < 10) {
                recommendations.overall = 'Cold';
                recommendations.essentials.push(
                    'Medium-weight jacket',
                    'Long sleeve shirt',
                    'Pants',
                    'Closed shoes',
                    'Light hat and gloves'
                );
                recommendations.optional.push(
                    'Scarf',
                    'Warm socks',
                    'Light sweater for layering'
                );
                recommendations.avoid.push(
                    'Short sleeves without layers',
                    'Open footwear'
                );
            } else if (temperature < 20) {
                recommendations.overall = 'Cool';
                recommendations.essentials.push(
                    'Light jacket or sweater',
                    'Long sleeve shirt',
                    'Pants or jeans'
                );
                recommendations.optional.push(
                    'Light scarf',
                    'Hat for sun protection'
                );
                recommendations.avoid.push(
                    'Summer-weight clothing alone'
                );
            } else if (temperature < 30) {
                recommendations.overall = 'Warm';
                recommendations.essentials.push(
                    'T-shirt or short sleeve shirt',
                    'Light pants or shorts',
                    'Sunscreen'
                );
                recommendations.optional.push(
                    'Light sweater for evening',
                    'Hat for sun protection',
                    'Sunglasses'
                );
                recommendations.avoid.push(
                    'Heavy or thick clothing'
                );
            } else {
                recommendations.overall = 'Hot';
                recommendations.essentials.push(
                    'Lightweight, light-colored clothing',
                    'Shorts/skirts',
                    'Short sleeve or sleeveless tops',
                    'Sunscreen (SPF 30+)',
                    'Hat with brim'
                );
                recommendations.optional.push(
                    'Sunglasses',
                    'Portable fan',
                    'Water bottle'
                );
                recommendations.avoid.push(
                    'Dark colored clothing',
                    'Heavy fabrics',
                    'Multiple layers'
                );
            }
            
            // Weather condition based additions
            if (precipitation > 50 || ['rain', 'showers', 'thunderstorm', 'sleet'].includes(conditions)) {
                recommendations.essentials.push(
                    'Waterproof jacket or rain coat',
                    'Umbrella',
                    'Waterproof footwear'
                );
                recommendations.optional.push(
                    'Waterproof pants if heavy rain expected',
                    'Hat with brim to keep rain off face'
                );
                recommendations.avoid.push(
                    'Suede or materials damaged by water',
                    'Electronics without waterproof protection'
                );
            }
            
            if (['snow', 'sleet'].includes(conditions)) {
                recommendations.essentials.push(
                    'Waterproof boots with good traction',
                    'Waterproof gloves'
                );
                recommendations.optional.push(
                    'Gaiters to keep snow out of boots',
                    'Ski pants or snow pants'
                );
            }
            
            if (windSpeed > 30) {
                recommendations.essentials.push(
                    'Windproof jacket',
                    'Secure hat that won't blow away'
                );
                recommendations.optional.push(
                    'Windproof pants',
                    'Goggles if very windy or dusty'
                );
                recommendations.avoid.push(
                    'Loose items that could blow away',
                    'Umbrellas in very high winds'
                );
            }
            
            if (['clear-day', 'partly-cloudy-day'].includes(conditions) && temperature > 15) {
                recommendations.essentials.push(
                    'Sunscreen',
                    'Sunglasses'
                );
                recommendations.optional.push(
                    'Hat with brim',
                    'Lip balm with SPF'
                );
            }
            
            return recommendations;
        },
        
        // Generate data visualization for weather conditions
        generateVisualization: function(weatherData, visualizationType) {
            // In a real implementation, this would create a dynamic visualization
            // For demo purposes, we'll update the mock data in the visualizer
            
            if (weatherData) {
                // Update visualizer data
                if (weatherData.current) {
                    this.weatherVisualizer.setWeatherData(weatherData.current);
                }
                
                if (weatherData.forecast) {
                    this.weatherVisualizer.setForecastData(weatherData.forecast);
                }
            }
            
            // Set visualization mode if provided
            if (visualizationType && ['temperature', 'precipitation', 'humidity', 'wind'].includes(visualizationType)) {
                this.weatherVisualizer.setMode(visualizationType);
            }
            
            // The actual visualization is handled by the WeatherVisualizer class
            // which is already initialized and rendering in the DOM
            
            return "Weather visualization updated. You can view it in the visualization panel.";
        },
        
        // Analyze climate data trends
        analyzeClimateTrends: function(location, timespan) {
            // In a real implementation, this would analyze actual climate data
            // For demo purposes, we'll return example analysis
            
            location = location || 'the selected region';
            timespan = timespan || 'the past 30 years';
            
            const analysis = {
                location: location,
                timespan: timespan,
                temperatureTrend: {
                    change: '+1.2°C',
                    description: `Average temperatures in ${location} have increased by approximately 1.2°C over ${timespan}, with more pronounced warming in winter months.`
                },
                precipitationTrend: {
                    change: '-5% annually, +15% intensity',
                    description: `Annual precipitation has decreased slightly, but the intensity of precipitation events has increased, leading to more instances of flash flooding and dry periods between rain events.`
                },
                extremeWeatherTrend: {
                    description: `The frequency of extreme weather events has increased by approximately 35% over ${timespan}, with notable increases in heatwaves, severe thunderstorms, and drought periods.`
                },
                seasonalShifts: {
                    description: `Growing seasons have extended by approximately 2 weeks, with spring arriving earlier and winter conditions starting later in the year compared to historical patterns.`
                },
                climateProjection: {
                    description: `Climate models project continued warming of 0.2-0.4°C per decade for this region, with increasing precipitation variability and more frequent extreme weather events.`
                }
            };
            
            return analysis;
        },
        
        // Custom style to apply to the chat UI when this mode is active
        customStyles: {
            fontFamily: "'Roboto', 'Arial', sans-serif",
            chatBackground: "linear-gradient(to bottom, #CAF0F8, #90E0EF)",
            accentColor: "#0077B6",
            userMessageBubbleColor: "#023E8A",
            aiMessageBubbleColor: "#0096C7",
            inputBoxBorderColor: "#48CAE4"
        }
    };

    // Register with JAAT-AI if available
    if (typeof global.JAAT !== 'undefined' && global.JAAT.registerMode) {
        global.JAAT.registerMode(weatherForecasterAI);
        console.log('Weather Forecaster AI mode registered with JAAT-AI system');
    } else {
        // Fallback when running outside the JAAT-AI environment
        console.log('JAAT-AI environment not detected. Weather Forecaster AI mode registered as module export.');
        global.JAAT_MODES.weatherForecasterAI = weatherForecasterAI;
    }

})(typeof window !== 'undefined' ? window : this);