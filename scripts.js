// API URL: http://api.openweathermap.org/data/2.5/weather?q={city name}&appid=3c9b9e5b66aff19a5f691fc73cf9210f
// API Key for Weather Info: 3c9b9e5b66aff19a5f691fc73cf9210f

let weather = {
    "apiKey": "3c9b9e5b66aff19a5f691fc73cf9210f",

    fetchWeather: function(city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=imperial&appid="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        
        let tempC = (Math.round(temp) - 32) * (5/9);
        document.querySelector(".temp").innerText = Math.round(temp) + "°F / " + Math.round(tempC) + "°C";

        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + Math.round(speed) + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }

});

