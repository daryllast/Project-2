
const notifcationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

iconElement.innerHTML = `<img src="weatherappimages/${weather.iconId}.png"/>`;
tempElement.innerHTML = ${weather.value};

