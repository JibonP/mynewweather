let weather = {
  apikey: "2e0ecfbb3a155438c4c7dc11aa6c841c",
  tempUnit: "C",
  fetchWeather: function () {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=queens&units=metric&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => {
        let currentTemp = Math.round(data.main.temp);
        if (this.tempUnit === "F") {
          currentTemp = Math.round((currentTemp * 9) / 5 + 32);
        }
        document.getElementById("current-temperature").textContent =
          "Temp: " + currentTemp + "°" + this.tempUnit;

        const currentCondition = data.weather[0].description;
        document.getElementById("current-condition").textContent =
          "Condition: " + currentCondition;

        const currentIcon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${currentIcon}.png`;
        document.querySelector(".current-icon").setAttribute("src", iconUrl);

        const currentWind = data.wind.speed;
        document.getElementById("current-wind").textContent =
          "Wind Speed: " + `${currentWind} m/ph`;

        const currentHumidity = data.main.humidity;
        document.getElementById("current-humidity").textContent =
          "Humidity:  " + " " + `${currentHumidity}%`;
      })
      .catch((err) => {
        console.log("Error fetching weather:", err);
      });
  },
  toggleTempUnit: function () {
    if (this.tempUnit === "C") {
      this.tempUnit = "F";
    } else {
      this.tempUnit = "C";
    }
    this.fetchWeather();
  },
};

document.querySelector(".toggle-temp").addEventListener("click", function () {
  weather.toggleTempUnit();
});

weather.fetchWeather();
