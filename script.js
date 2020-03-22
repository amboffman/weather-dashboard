//Prevent page from resetting when they hit the search button
var todaysWeather = $(".container-todays-weather");
// WHEN I search for a city
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var searchedCity = $("#search-text").val().trim();
    var cityTitle = $("<h2>").text(searchedCity)
    todaysWeather.append(cityTitle);


    var APIKey = "2d0adfed3ce3ee0b5d97b7be04cd9645";
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchedCity + "&appid=" +
        APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
          }) .then(function(results){
              var resultsString = JSON.stringify(results);
            console.log("queryURL: " + queryURL);
            console.log("Results: " + resultsString);



          })

})

// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast