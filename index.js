// index.js

//Replace with your actual OpenWeather API key
const apiKey = '75246ffccb309c41f3748668386adb75';

//Fetch Weather Data from the API
async function fetchWeatherData(city) {
  try {
    showLoadingSpinner();

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  } finally {
    hideLoadingSpinner();
  }
}

//Display Weather Data on the Page
function displayWeather(data) {
  const weatherDisplay = document.getElementById('weather-display');
  const { name, main, weather } = data;
  const temperature = main.temp;
  const humidity = main.humidity;
  const description = weather[0].description;

  weatherDisplay.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p><strong>Temperature:</strong> ${temperature}°F</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Condition:</strong> ${description}</p>
  `;
}

//Error Handling
function displayError(message) {
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');

//Optional: Clear previous weather results
  document.getElementById('weather-display').innerHTML = '';
}

//Hide error message when needed
function clearError() {
  const errorElement = document.getElementById('error-message');
  errorElement.classList.add('hidden');
  errorElement.textContent = '';
}

//Loading Spinner
function showLoadingSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) spinner.style.display = 'block';
}

function hideLoadingSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) spinner.style.display = 'none';
}

//Handle User Input
document.getElementById('fetch-weather').addEventListener('click', () => {
  const input = document.getElementById('city-input');
  const city = input.value.trim();

  if (!city) {
    displayError('Please enter a city name');
    return;
  }

  clearError();
  fetchWeatherData(city);
});
