// Variables for api key, search, search button, city list, containers for current chosen city, forecast, five day forecast, and empty cities array to track search history
var APIKey = "8756b0c1a73cc214da1eeb5ee10ebe91";
var cities = [];
var search = $(".search");
var searchBTN = $("#searchBTN");
var historyBTN;
var citiesList = $(".cities");
var weatherContainer = $("#weatherContainer");
var forecastContainer = $("#forecastContainer");
var fiveDayForecast = $("#forecast");

// Create listener to listen for click on the search button or enter on enter key
// Check to see if the value of the search button is empty, if not, start the action
searchBTN.click(function (event) {
  if (search.val() !== "") {
    executeWeather();
  } else {
    alert("Enter a city to see the weather!");
  }
});

$(search).keypress(function (event) {
  var keyCode = event.keyCode;
  if (keyCode === 13) {
    if (search.val() !== "") {
      executeWeather();
    } else {
      alert("Enter a city to see the weather!");
    }
  }
});

// main function to execute all other functions
function executeWeather() {
  event.preventDefault();
  citiesList.removeClass("hidden");
  weatherContainer.removeClass("hidden");
  cities.push(search.val());
  setStorage();
  createCityList(search.val());
  getWeather(search.val());
  search.val("");
}

// grab the search term inputted and push it into the cities array
// capture local storage and create the cities list search history
// pull the weather from the API
// clear the search input once it's captured
function createCityList(lastCity) {
  searchBTN = $("<button>").addClass(
    "searchBTN BTN BTN-outline-secondary d-flex w-100"
  );
  searchBTN.text(lastCity);
  searchBTN.attr("data-city", lastCity);
  citiesList.prepend(searchBTN);

  searchBTN.click(function (event) {
    getWeather(event.target.getAttribute("data-city"));
  });
}

// set local storage - strigifies cities for search history
function setStorage() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function getWeather(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      createCurrentConditions(data, city);
    });
  });
}

function getUvi(lat, lon) {
  var uviUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

  fetch(uviUrl).then(function (response) {
    response.json().then(function (data) {
      createCurrentUvi(data);
    });
  });
}

function getForecast(lat, lon) {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&units=imperial&appid=${APIKey}`;

  fetch(forecastUrl).then(function (response) {
    response.json().then(function (data) {
      createForecast(data);
    });
  });
}

function createCurrentConditions(conditions, city) {
  var currentCity = $("#currentCity");
  currentCity.text(conditions.city.name);

  var currentDate = $("<span>");
  currentDate.text(` (${moment(conditions.list.dt_txt).format("MMMM Do")})`);
  currentCity.append(currentDate);

  var currentIcon = $("<img>");
  var icon = conditions.list[0].weather[0].icon;
  var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  currentIcon.attr("src", iconUrl);
  currentCity.append(currentIcon);

  var currentTemp = $("#currentTemp");
  currentTemp.text(conditions.list[0].main.temp);

  var currentHumidity = $("#currentHumidity");
  currentHumidity.text(conditions.list[0].main.humidity);

  var currentWind = $("#currentWind");
  currentWind.text(conditions.list[0].wind.speed);

  var lat = conditions.city.coord.lat;
  var lon = conditions.city.coord.lon;
  getUvi(lat, lon);
  getForecast(lat, lon);
}

function createCurrentUvi(uvi) {
  var currentUVI = $("#currentUVI").addClass("text-white p-1");
  var uviIndex = uvi.current.uvi;
  currentUVI.text(uviIndex);

  if (uviIndex <= 2) {
    currentUVI.addClass("bg-success");
  } else if (uviIndex > 2 && uviIndex <= 7) {
    currentUVI.addClass("bg-warning");
  } else if (uviIndex > 7) {
    currentUVI.addClass("bg-danger");
  }
}

function createForecast(forecast) {
  fiveDayForecast.text("");

  var dailyForecast = forecast.daily;
  for (var i = 1; i < 6; i++) {
    var nextDay = dailyForecast[i];
    var forcastedDay = moment(nextDay.dt * 1000).format("MMMM Do");

    var dayWeather = $("<div>").addClass(
      "card ispurple d-flex text-white p-3 col-8 col-xl-2 col-md-4 col-sm-4 m-3"
    );
    fiveDayForecast.append(dayWeather);

    var weatherDate = $("<h5>").addClass("d-flex justify-content-center");
    weatherDate.text(forcastedDay);
    dayWeather.append(weatherDate);

    var forecastIcon = nextDay.weather[0].icon;
    var forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
    var weatherIcon = $("<img>").attr("src", forecastIconUrl);
    dayWeather.append(weatherIcon);

    var maxTemp = $("<span>").addClass("text-start");
    maxTemp.text(`Max: ${nextDay.temp.max}°F`);
    dayWeather.append(maxTemp);

    var minTemp = $("<span>").addClass("text-start");
    minTemp.text(`Min: ${nextDay.temp.min}°F`);
    dayWeather.append(minTemp);

    var dayHumidity = $("<span>").addClass("text-start");
    dayHumidity.text(`Humidity: ${nextDay.humidity}%`);
    dayWeather.append(dayHumidity);
  }
}