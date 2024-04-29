async function getWeatherData(city) {
    const apiKey = "e8f6e03beb6b29cc598955fd4392c44d";

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Could not fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function updateWeatherInfo(weatherData) {
    const city = document.querySelector('.places h2');
    const temperature = document.querySelector('.temperature');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');
    const description = document.querySelector('.description');

    if (weatherData) {
        city.textContent = weatherData.name;
        temperature.textContent = `Temperature: ${(weatherData.main.temp - 273.15).toFixed(1)}°C`;
        humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
        wind.textContent = `Wind: ${weatherData.wind.speed} kmph`;
        description.textContent = `Description: ${weatherData.weather[0].description}`;
    } else {
        city.textContent = 'City not found';
        temperature.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
        description.textContent = '';
    }
}

document.querySelector('.btn-outline-primary').addEventListener('click', async () => {
    const searchInput = document.querySelector('.form-control');
    const city = searchInput.value.trim();
    if (city !== '') {
        const weatherData = await getWeatherData(city);
        console.log(weatherData); 
        updateWeatherInfo(weatherData);
    } else {
        alert('Please enter a Place name');
    }
});

