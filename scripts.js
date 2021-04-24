// API URL: http://api.openweathermap.org/data/2.5/weather?q={city name}&appid=3c9b9e5b66aff19a5f691fc73cf9210f
// API Key: 3c9b9e5b66aff19a5f691fc73cf9210f

// document.getElementById('search').addEventListener('click', () => {
//     console.log('button was clicked');

// let weatherCity = document.getElementById('city').value;
// console.log(weatherCity);

// fetch(`http://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=3c9b9e5b66aff19a5f691fc73cf9210f`)
//   .then((response) => {
//     return response.json()
//   })
//   .then((data) => {
//    let nameValue= data['name'];
//    let tempValue = data['main']['temp'];
//    let descriptionValue = data['weather'][0]['description'];

//    name.innerHTML = nameValue;
//    temp.innerHTML= tempValue;
//    description.innerHTML = descriptionValue; 
//   })
//   .catch((err) => {
//     alert("City cannot be found!")
//   })


// for(let i = 0; i < response.length; i++){
//     let weatherTemperature = main.temp;
//     console.log(weatherTemperature);
// }

// const iconElement = document.querySelector(".weather-icon");
// const tempElement = document.querySelector(".temperature-value p");
// const descElement = document.querySelector(".temperature-description p");
// const locationElement = document.querySelector(".location p");
// const notifcationElement = document.querySelector(".notification");

// const weather = {};
// weather.temperature = {
//     unit: "celsius"
// }


// displayWeather(){
// iconElement.innerHTML = `<img src="weatherappimages/${weather.iconId}.png"/>`;
// tempElement.innerHTML = `${weather.value}&#176;<span>C</span>`;
// descElement.innerHTML = weather.description;
// locationElement.innerHTML = `${weather.city}, ${weather.country}`;

// }

// // convert from celsius to fahrenheit = (temperature * 9/5 ) + 32;
// function celsiusToFahrenheit (temperature) {
// return (temperature * 9/5 ) + 32;

// }

// tempElement.addEventListener("click", function()){
//     if (weather.temperature.value === undefined) return;
//     if(weather.temperature.unit === "celcius"){

//         let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
//         fahrenheit = Math.floor(fahrenheit);
//         tempElement.innerHTML = `${fahrenheit}&#176;<span>F</span>`;
//         weather.temperature.unit = "fahrenheit";

//     }else{
//         tempElement.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`;
//         weather.temperature.unit = "celsius";
//     }
// })


const api = '3c9b9e5b66aff19a5f691fc73cf9210f';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});
