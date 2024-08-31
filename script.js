document.getElementById("fetch-weather").addEventListener("click", function() {
    const cityName = document.getElementById("weather-input").value;
    const apiKey = '3cd4cfffe5085d32d29293da02653a53';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById("weather-result");
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                
                weatherResult.innerHTML = `
                    <h2>Weather in ${cityName}</h2>
                    <img src="${weatherIcon}" alt="${weatherDescription}">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${weatherDescription}</p>
                `;
                // Fetch the 5-day forecast
                fetchForecast(cityName);
            } else {
                weatherResult.innerText = `Error: ${data.message}`;
            }
        })
        .catch(error => {
            document.getElementById("weather-result").innerText = `Error: ${error.message}`;
        });
});

// Function to fetch 5-day forecast
function fetchForecast(cityName) {
    const apiKey = '3cd4cfffe5085d32d29293da02653a53';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastResult = document.getElementById("forecast-result");
            forecastResult.innerHTML = '';
            if (data.cod === "200") {
                for (let i = 0; i < data.list.length; i += 8) {
                    const day = data.list[i];
                    const date = new Date(day.dt * 1000);
                    const temperature = day.main.temp;
                    const weatherDescription = day.weather[0].description;
                    const weatherIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
                    
                    forecastResult.innerHTML += `
                        <div class="forecast-card">
                            <h3>${date.toDateString()}</h3>
                            <img src="${weatherIcon}" alt="${weatherDescription}">
                            <p class="temp">${temperature}°C</p>
                            <p class="description">${weatherDescription}</p>
                        </div>
                    `;
                }
            } else {
                forecastResult.innerText = `Error: ${data.message}`;
            }
        })
        .catch(error => {
            document.getElementById("forecast-result").innerText = `Error: ${error.message}`;
        });
}
