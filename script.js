const forecast = {
  apikey: "2e0ecfbb3a155438c4c7dc11aa6c841c",
  tempUnit: "C",
  getWeather: function (location) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        location +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => {
        this.lastData = data;
        this.displayWeather(data);
      })
      .catch((error) => {
        console.log(error);
        alert("Please enter a location!");
      });
  },

  displayWeather: function (data) {
    const days = data.list;
    let dayIndex = 0;
    for (let i = 0; i < days.length; i++) {
      const date = new Date(days[i].dt_txt);
      if (date.getHours() === 12) {
        const day = days[i];
        const icon = day.weather[0].icon;
        const iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
        let tempHigh = Math.round(data.list[i].main.feels_like);
        let tempLow = Math.round(data.list[i].main.temp_min);

        if (this.tempUnit === "F") {
          tempHigh = Math.round((tempHigh * 9) / 5 + 32);
          tempLow = Math.round((tempLow * 9) / 5 + 32);
        }

        const dayElem = document.querySelectorAll(".day")[dayIndex];
        const iconElem = document.querySelectorAll(".icon")[dayIndex];
        const tempHighElem =
          document.querySelectorAll(".temperature.high")[dayIndex];
        const tempLowElem =
          document.querySelectorAll(".temperature.low")[dayIndex];

        dayElem.textContent = forecast.formatDay(date);
        iconElem.innerHTML = `<img src="${iconUrl}" alt="weather icon" />`;
        tempHighElem.textContent = tempHigh + "°" + this.tempUnit;
        tempLowElem.textContent = tempLow + "°" + this.tempUnit;

        dayIndex++;
        if (dayIndex >= 5) {
          break;
        }
      }
    }
    const locationElem = document.querySelector(".location");
    locationElem.textContent = data.city.name;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" +
      `${data.city.name}` +
      "')";
  },

  formatDay: function (date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  },
  toggleTempUnit: function () {
    if (this.tempUnit === "C") {
      this.tempUnit = "F";
    } else {
      this.tempUnit = "C";
    }
    this.displayWeather(this.lastData);
  },
};

document
  .querySelector(".search-box button")
  .addEventListener("click", function () {
    const location = document.querySelector(".search-box input").value;
    forecast.getWeather(location);
    document.querySelector(".search-box input").value = "";
  });

document.querySelector(".toggle-temp").addEventListener("click", function () {
  forecast.toggleTempUnit();
});

//forecast.getWeather("Queens");
