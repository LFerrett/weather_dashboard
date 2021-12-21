// Variables for api key, search, search button, city list, containers for current chosen city, forecast, five day forecast, and empty cities array to track search history
var cities = [];
var APIKey = "8756b0c1a73cc214da1eeb5ee10ebe91";

var search = $(".search");
var searchBtn = $(".searchBtn");
var cityBtn;
var citiesList = $(".cities");
var weatherContainer = $("#weatherContainer");
var forecastContainer = $("#forecastContainer");
var fiveDayForecast = $("#forecast");

var cities = [];

// Create listener to listen for click on the search button
// Check to see if the value of the search button is empty, if not, start the action
searchBtn.click(function (event) {
    if (search.val() !== "") {
      executeFunctions();
    } else {
      alert("Enter a city to see the weather!");
    }
  });

// try to add a way for the enter button to initiate search
// maybe find what the enter key code is and strictly look for that 
// do the same actions as the search button


// the meat and potatoes... throw all functions into this big one
// things to do... unhide hidden search history and weather container
// grab the search term inputted and push it into the cities array
// capture local storage and create the cities list search history
// pull the weather from the API
// clear the search input once it's captured
function pullWeather() {
  event.preventDefault();
// add more as you write and decide on variables
// set local storage - strigifies cities for search history
localStorage.setItem("cities", JSON.stringify(cities));
 // add
}

// Make the cities list, use buttons for style and then add click event 
// get weather if a city from history is clicked
function makeCities() {
  // add
}

// Connect and fetch OpenWeatherMap API (may have to do this multiple times for selected city, UV Index, then 5 day forecast)
// using a function to fetch openweathermap api to get current weather conditions
  // Make the URL a variable that includes both the user inputted city and the API key
  // fetch the URL, check for response

  function getWeather(city) {
    var APIKey = "8756b0c1a73cc214da1eeb5ee10ebe91";
    var APIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;
  
    fetch(APIUrl).then(function (response) {
      response.json().then(function (data) {
        createCurrentConditions(data, city);
      });
    });
  }
 // Display the current weather conditions for the selected city
 // use selected city conditions and use moment.js to append the curry date to the current city
// set icons based on weather conditions 
// set current icon and add to icon class
// current icon is equal to the <img> tag and the conditions list weather icon
// set the attribute of the icon to the src file and use a dynamically created URL to append to the current city/icon
// store and display current temperature, humidity, wind speed, UV index (may need to do more for UV index)

}

// Figure out how to pull forecast weather, making a loop that stops when its pulled five days (OpenWeatherMap has seven day forecast)
function createForecast(forecast) {
// Things to remember: clear previous text before looping
  fiveDayForecast.text("");
  // loop - for (var i = 1; i < 6; i++)

  var dailyForecast = forecast.daily;
  // looping through forecasted days from api and stopping at the 5th day
  // capture date, high temp (max) and low temp (min), humidity, and use the same icon string as above
}

function pullWeather() {
    console.log("citySelected");

   // fetch(searchURL)
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
    //    cache: 'reload',
      
    //    then(function (response) {
    //      return response.json();
    //    })
    //    then(function (data) {
   //       console.log(data);
    //    });
      




    //fetch(searchURL.then(function (response) {
   // if (response.ok) {
     // response.json().then(function (data) {
       //displayWeather(data.items, language);
      // console.log("Contact Made");
    // })
  //  }
//})
}

searchBtn.addEventListener("click", executeFunctions);