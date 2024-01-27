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

let marker;
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector("#map").style.display = "none";
    } else {
        let data = await response.json();

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
    }
 }

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

