//Prevent page from resetting when they hit the search button
var todaysWeather = $(".container-todays-weather");
var resultsContainer = $(".results-container");
var weekForecastContainer = $(".week-forecast-container");
// WHEN I search for a city
$("#search-button").on("click", function (event) {
    event.preventDefault();
    //empty resultsDiv
    $(resultsContainer).empty();
    var searchedCity = $("#search-text").val().trim();



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


        // //   var todayUVIndexSeverity = ;
        // append to resultsDiv;
        $(resultsContainer).append(cityName, todayIcon, todayTemp, todayHumidity, todayWindSpeed);
        grabIcon();

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
                for(i=0; i<daysForecasted; i++){
                var forecastCard = $("<div>").attr("class", "card custom-card");
                var weekDate = $("<h2>").text(grabDate5Day());
                forecastCard.append(weekDate);
                weekForecastContainer.append(forecastCard);

                function grabDate5Day() {

                    var weekDateStamp = info.list[i*8].dt;//times 8 as there are 8 times per day
                    var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
                    var date = new Date(weekDateStamp * 1000);
                    var year = date.getFullYear();
                    var month = months[date.getMonth()];
                    var day = date.getDate();
                    var displayDate = month + "/" + day + "/" + year;
                    return displayDate;
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