//Prevent page from resetting when they hit the search button
var todaysWeather = $(".container-todays-weather");
var resultsContainer = $(".results-container");
var weekForecastContainer = $(".week-forecast-container");
var searchContainer = $(".search-history-container")
var pastSearches = $(".past-searches")

// WHEN I search for a city
$("#search-button").on("click", function (event) {
    var searchedCity = $("#search-text").val().trim();
    event.preventDefault();
    //empty resultsDiv
    $(resultsContainer).empty();
    $(weekForecastContainer).empty();

    // store search in local storage
    localStorage.setItem("past-search",searchedCity);
    pastSearchButtons();
    //show buttons for each item in storage
    function pastSearchButtons(){
        var searches =[];
        var storedSearches = localStorage.getItem("past-search");
        console.log(storedSearches);
        if (storedSearches !== null){
            searches=storedSearches;
            console.log(storedSearches);
                var cityButton = $("<button>").text(searches).attr("class", "btn btn-light btn-lg btn-block city-button");
                $(pastSearches).prepend(cityButton);
        }
    }

    // Current Weather API //
    var APIKey = "2d0adfed3ce3ee0b5d97b7be04cd9645";
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchedCity + "&appid=" +
        APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (results) {
        console.log(results);
        var cityName = $("<h2>").text(results.name + " (" + grabDateToday() + ")");
        var todayIcon = $("<img>").attr("src", grabIcon()).attr("id", "forecast-icon");
        var todayTemp = $("<p>").text("Temp: " + grabTemp() + " °F");
        var todayHumidity = $("<p>").text("Humidity: " + results.main.humidity + "%");
        var todayWindSpeed = $("<p>").text("Wind Speed: " + grabWind() + " MPH");

        // UV Index API //
        var indexQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + results.coord.lat + "&lon=" + results.coord.lon;
        $.ajax({
            url: indexQueryURL,
            method: "GET",
        }).then(function (data) {
            console.log(data);
            var indexSpan = $("<span>").text(data.value)
            var indexToday = $("<p>").text("Index: ").attr("class", "index-number");
            indexToday.append(indexSpan);
            if (data.value < 3) {
                indexSpan.attr("class", "low-index");
            }
            else if (data.value > 2 && data.value < 6) {
                indexSpan.attr("class", "mid-index");
            }
            else {
                indexSpan.attr("class", "high-index");
            };
            $(resultsContainer).append(indexToday);
        });

        $(resultsContainer).append(cityName, todayIcon, todayTemp, todayHumidity, todayWindSpeed);
        grabIcon();

        // 5 Day Forecase API //
        var weekForecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" +
            APIKey;
        $.ajax({
            url: weekForecastQueryURL,
            method: "GET",
        }).then(function (info) {
            console.log(info);

            createForecastCards();

            function createForecastCards() {
                var daysForecasted = 5;
                for (i = 0; i < daysForecasted; i++) {
                    var forecastCard = $("<div>").attr("class", "card custom-card");
                    var divCol = $("<div>").attr("class", "col-2")
                    var weekDate = $("<h2>").text(grabDate5Day()).attr("class", "card-header");
                    var weekIcons = $("<img>").attr("src", grabWeekIcons()).attr("class", "week-icon");
                    var weekTemperature = $("<p>").text(grabWeekTemperature());
                    var weekHumidity = $("<p>").text("Humidity: " + info.list[i * 8].main.humidity + "%")
                    forecastCard.append(weekDate, weekIcons, weekTemperature, weekHumidity);
                    divCol.append(forecastCard);
                    weekForecastContainer.append(divCol);

                    function grabDate5Day() {

                        var weekDateStamp = info.list[i * 8].dt;//times 8 as there are 8 times per day
                        var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
                        var date = new Date(weekDateStamp * 1000);
                        var year = date.getFullYear();
                        var month = months[date.getMonth()];
                        var day = date.getDate();
                        var displayDate = month + "/" + day + "/" + year;
                        return displayDate;
                    };
                    function grabWeekIcons() {

                        var iconWeekID = info.list[i * 8].weather[0].icon;
                        var iconWeekImgURL = "http://openweathermap.org/img/wn/" + iconWeekID + "@2x.png";
                        return iconWeekImgURL;
                    };
                    function grabWeekTemperature() {

                        var weekTemp = grabWeekTemp();
                        return weekTemp;

                        function grabWeekTemp() {
                            var weekTempF = (info.list[i * 8].main.temp - 273.15) * 1.8 + 32;
                            var displayWeekTemp = "Temp: " + weekTempF.toFixed(2) + " °F";
                            return displayWeekTemp;
                        }
                    };
                }
            }
        });


        //    FUNCTIONS
        function grabDateToday() {

            var dateStamp = results.sys.sunset;
            var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

            var date = new Date(dateStamp * 1000);
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var day = date.getDate();
            var displayDate = month + "/" + day + "/" + year;
            return displayDate;
        };





        function grabIcon() {
            // create image
            var iconID = results.weather[0].icon;
            var iconImgURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
            return iconImgURL;
        };

        function grabTemp() {
            var tempF = (results.main.temp - 273.15) * 1.8 + 32;
            var displayTemp = tempF.toFixed(2)
            return displayTemp;
        }

        function grabWind() {
            var windMPH = results.wind.speed * 2.23694;
            var displayWind = windMPH.toFixed(2)
            return displayWind;
        }
    })

    console.log("queryURL: " + queryURL);
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