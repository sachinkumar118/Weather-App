// script.js

const apiKey = "8e6a75f49e72e8ee78286e022777c93b";
const url = 'https://api.openweathermap.org/data/2.5/weather?appid=05928a5b68ba58ad1155285b65c92481&units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {
    const response = await fetch(url + city);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        const icon = document.querySelector(".weather-icon");
        console.log(data);

        // Update weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = ((3.6) * data.wind.speed).toFixed(2) + " Km/h";

        // Update weather icon based on weather condition
        switch (data.weather[0].main) {
            case "Clouds":
                icon.src = "images/clouds.png";
                break;
            case "Clear":
                icon.src = "images/clear.png";
                break;
            case "Rain":
                icon.src = "images/rain.png";
                break;
            case "Drizzle":
                icon.src = "images/drizzle.png";
                break;
            case "Mist":
                icon.src = "images/mist.png";
                break;
            case "Haze":
                icon.src = "images/snow.png";
                break;
            default:
                icon.src = "images/default.png"; // Default image
        }

        // Display weather details and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
