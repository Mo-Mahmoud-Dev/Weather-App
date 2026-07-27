const weatherFrom = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "7146521e66034a20b3e145619262607";

weatherFrom.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;
    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }catch(error) {
            console.log(error)
            displayError(error)
        }
    }else {
        displayError("Please Enter A City");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=7146521e66034a20b3e145619262607&q=${city}&aqi=no`;
    const response = await fetch(apiUrl);
    // console.log(response);
    if(!response.ok){
        throw new Error("Could not Fetch Weather Data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    // console.log(data);
    const {
        current: {condition: {text, code}, temp_c, humidity},
        location: {country, name: city}
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp_c}°c`;
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    descriptionDisplay.textContent = text;
    weatherEmoji.textContent = getWeatherEmoji(code);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descriptionDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(code) {
    switch (code) {
        case 1000: 
            return "☀️";

        case 1003: 
            return "⛅";

        case 1006: 
        case 1009: 
            return "☁️";

        case 1030: 
        case 1135: 
        case 1147: 
            return "🌫️";

        case 1063:
        case 1180:
        case 1183:
        case 1240:
            return "🌦️";

        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1243:
        case 1246:
            return "🌧️";

        case 1087:
        case 1273:
        case 1276:
        case 1279:
        case 1282:
            return "⛈️";

        case 1066:
        case 1114:
        case 1210:
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
            return "❄️";

        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay"); 

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}