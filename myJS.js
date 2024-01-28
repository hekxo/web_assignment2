const apiKey = "e24e10a8a380ab10674d1ca48338716c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const map = L.map('map').setView([0, 0], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let searchBtn1 = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
searchBtn1.addEventListener("click", () => {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);
    fetch(finalURL).then((response) => response.json()).then((data)=> {
        result.innerHTML = `<img src="${data[0].flags.svg}" class="flag-img" alt="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>
                    ${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}
                </span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span>
            </div>
        </div>`
    }).catch(()=> {
        if (countryName.length === 0) {
            result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        } else {
            result.innerHTML = `<h3>Please enter a valid country name</h3>`;
        }
    })
});


let quote = document.getElementById("quote");
let author = document.getElementById("author");
let btn = document.getElementById("btn");

const url = "https://api.quotable.io/random";

let getQuote = () => {
    fetch(url)
        .then((data) => data.json())
        .then((item) => {
            quote.innerText = item.content;
            author.innerText = item.author;
        });
};
window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);


let marker;
let data;
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector("#map").style.display = "none";
        document.querySelector("#currentTime").style.display = "none";
    } else {
        data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".description").innerHTML = data.weather[0].description.toUpperCase();
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".feels-like_temp").innerHTML = "(Feels like " + Math.round(data.main.feels_like) + "°C)";
        document.querySelector(".country_code").innerHTML = "(" + data.sys.country + ")";
        document.querySelector(".coordinates").innerHTML = "(" + data.coord.lat + ", " + data.coord.lon + ")";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".pressure").innerHTML = data.main.pressure + " pa";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else {
            weatherIcon.src = "images/snow.png";
        }

        const newLatLng = [data.coord.lat, data.coord.lon];
        if (marker) {
            marker.setLatLng(newLatLng);
        } else {
            marker = L.marker(newLatLng).addTo(map);
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector("#map").style.display = "block";
        document.querySelector("#currentTime").style.display = "block";
    }
 }

let timeInterval;
searchBtn.addEventListener("click", async () => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }

    await checkWeather(searchBox.value);
    const cityName = searchBox.value;
    await updateCurrentTime(cityName);

    timeInterval = setInterval(async () => {
        await updateCurrentTime(cityName);
    }, 1000);
});

async function updateCurrentTime(cityName) {
    try {
        const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`);
        const weatherData = await response.json();
        const timezoneOffsetSeconds = weatherData.timezone;

        const currentTimeUTC = new Date(Date.now() + timezoneOffsetSeconds * 1000);

        const currentTimeLocal = new Date(currentTimeUTC.getTime() + currentTimeUTC.getTimezoneOffset() * 60000);

        const formattedTime = currentTimeLocal.toLocaleTimeString();

        document.getElementById('currentTime').textContent = `Current time in ${cityName}: ${formattedTime}`;
    } catch (error) {
        console.error('Error fetching current time:', error);
        document.getElementById('currentTime').textContent = 'Error fetching current time';
    }
}