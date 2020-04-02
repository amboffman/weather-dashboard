moment();
​
var oldNames = [];
​
if (localStorage.key("CityNames") === null){
​
}
​
else {
​
  var getData = JSON.parse(localStorage.getItem("CityNames"));
  oldNames = getData
  oldCityHistory()
  lastCity();
​
}
​
$("#city-search-button").on("click", function(){
​
  var APIKey = "61884189ea401251c54c2d436ff4118c";
  var location = $("#location-name").val().trim();
​
  oldNames.push(location);
  localStorage.setItem("CityNames", JSON.stringify(oldNames));
  localStorage.setItem("LastCity", JSON.stringify(location));
​
  newCityHistory();
  recallHistory();
  
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + location + "&appid=" +  APIKey;
  
  $.ajax({url: fiveDay, method: "GET"})
​
  .then(function(response) {
​
    currentAndFiveDay(response);
​
    var lon = response.city.coord.lon
    var lat = response.city.coord.lat
​
    var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat +"&lon=" + lon;
​
      $.ajax({ url: uvIndexURL, method: "GET"})
​
      .then(function(result){        
​
        uvIndexF(result)
​
      });
​
  });
​
});
​
​
​
function newCityHistory(){
​
  var listCity = $("<button>");
  listCity.attr("class", "list-group-item list-group-item-action history");
  listCity.attr("data-name", $("#location-name").val().trim());
  listCity.text($("#location-name").val());
  $("#city-history").prepend(listCity);
  
};
​
​
​
function currentAndFiveDay (response){
​
  var cityName = (response.city.name);
  var currentDate = moment().calendar("MM, DD, YYYY");
  var currentTemp = ((response.list[0].main.temp - 273.15) * 1.8 + 32);
  var currentHumid = response.list[0].main.humidity;
  var currentWind = response.list[0].wind.speed;
​
  var currentIcon = response.list[0].weather[0].icon
  var newImage = $("<img>");
  newImage.attr("src", "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png")
  $("#current-name").empty()
  $("#current-name").text(cityName + " (" + currentDate + ") ");
  $("#current-name").append(newImage)
  $("#current-temp").html("Tempature: " + currentTemp.toFixed(1) + " &deg;F");
  $("#current-humid").text("Humidity: " + currentHumid + "%")
  $("#current-wind").text("Wind Speed: " + currentWind + " MPH")
​
  // Day 1
​
  var dayDate1 = moment().add(1, 'day').calendar("MM, DD, YYYY");
  var day1Temp = ((response.list[5].main.temp - 273.15) * 1.8 + 32);
  var day1Humid = response.list[5].main.humidity;
  var day1Icon = response.list[5].weather[0].icon
  $("#day-one").text(dayDate1)
  var newImage1 = $("<img>");
  newImage1.attr("src", "https://openweathermap.org/img/wn/" + day1Icon + "@2x.png")
  $("#day-one-img").empty();
  $("#day-one-img").append(newImage1);
  $("#day-one-temp").html("Temp: " + day1Temp.toFixed(1) + " &deg;F")
  $("#day-one-humid").text("Humidity: " + day1Humid + "%")
  
  // Day 2
​
  var dayDate2 = moment().add(2, 'day').calendar("MM, DD, YYYY");
  var day2Temp = ((response.list[13].main.temp - 273.15) * 1.8 + 32);
  var day2Humid = response.list[13].main.humidity;
  var day2Icon = response.list[13].weather[0].icon
  $("#day-two").text(dayDate2)
  var newImage2 = $("<img>");
  newImage2.attr("src", "https://openweathermap.org/img/wn/" + day2Icon + "@2x.png")
  $("#day-two-img").empty();
  $("#day-two-img").append(newImage2);
  $("#day-two-temp").html("Temp: " + day2Temp.toFixed(1) + " &deg;F")
  $("#day-two-humid").text("Humidity: " + day2Humid + "%")
  
  // Day 3
​
  var dayDate3 = moment().add(3, 'day').calendar("MM, DD, YYYY");
  var day3Temp = ((response.list[21].main.temp - 273.15) * 1.8 + 32);
  var day3Humid = response.list[21].main.humidity;
  var day3Icon = response.list[21].weather[0].icon
  $("#day-three").text(dayDate3)
  var newImage3 = $("<img>");
  newImage3.attr("src", "https://openweathermap.org/img/wn/" + day3Icon + "@2x.png")
  $("#day-three-img").empty();
  $("#day-three-img").append(newImage3);
  $("#day-three-temp").html("Temp: " + day3Temp.toFixed(1) + " &deg;F")
  $("#day-three-humid").text("Humidity: " + day3Humid + "%")
​
  // Day 4
  
  var dayDate4 = moment().add(4, 'day').calendar("MM, DD, YYYY");
  var day4Temp = ((response.list[29].main.temp - 273.15) * 1.8 + 32);
  var day4Humid = response.list[29].main.humidity;
  var day4Icon = response.list[29].weather[0].icon
  $("#day-four").text(dayDate4)
  var newImage4 = $("<img>");
  newImage4.attr("src", "https://openweathermap.org/img/wn/" + day4Icon + "@2x.png")
  $("#day-four-img").empty();
  $("#day-four-img").append(newImage4);
  $("#day-four-temp").html("Temp: " + day4Temp.toFixed(1) + " &deg;F")
  $("#day-four-humid").text("Humidity: " + day4Humid + "%")
​
  // Day 5
  
  var dayDate5 = moment().add(5, 'day').calendar("MM, DD, YYYY");
  var day5Temp = ((response.list[37].main.temp - 273.15) * 1.8 + 32);
  var day5Humid = response.list[37].main.humidity;
  var day5Icon = response.list[37].weather[0].icon
  $("#day-five").text(dayDate5)
  var newImage5 = $("<img>");
  newImage5.attr("src", "https://openweathermap.org/img/wn/" + day5Icon + "@2x.png")
  $("#day-five-img").empty();
  $("#day-five-img").append(newImage5);
  $("#day-five-temp").html("Temp: " + day5Temp.toFixed(1) + " &deg;F")
  $("#day-five-humid").text("Humidity: " + day5Humid + "%")
}
​
​
​
function uvIndexF(result){
​
  // Creates UV Index Elements
  
  var uvIndex = (JSON.parse(result.value));
  var newPP = $("<p>");
  var newP = $("<button>");
  $("#current-uv").empty();
  newP.attr("class", "btn");
  newP.text(uvIndex);
  newP.attr("disabled", "disabled");
  newPP.html("UV Index: ");
  newPP.attr("id", "button-holder")
  $("#current-uv").append(newPP);
​
  // Changes the color based on the severity.
​
  if(uvIndex > 0  && uvIndex < 3){
​
    newP.attr("class", "btn btn-success text-white");
    $("#button-holder").append(newP);
​
  }
  else if (uvIndex > 3 && uvIndex < 8){
​
    newP.attr("class", "btn btn-warning");
    $("#button-holder").append(newP);
    
  }
  else {
​
    newP.attr("class", "btn btn-danger text-white");
    $("#button-holder").append(newP);
​
  };
​
};
​
​
​
function recallHistory (){
​
  // Listens for the click on the elements that loaded with the page.
​
  $(".history").on("click", function(){
        
    var dataName = $(this).attr("data-name").trim();
​
    localStorage.setItem("LastCity", JSON.stringify(dataName));
​
    var APIKey = "61884189ea401251c54c2d436ff4118c";
    
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + dataName + "&appid=" +  APIKey;
    
    $.ajax({url: fiveDay, method: "GET"})
    
    .then(function(response) {
​
      currentAndFiveDay(response);
      var lon = response.city.coord.lon
      var lat = response.city.coord.lat
      var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat +"&lon=" + lon;
​
      $.ajax({ url: uvIndexURL, method: "GET"})
​
      .then(function(result){        
​
        uvIndexF(result)
      
      });
    
    });
​
  });
​
};
​
​
 
function oldCityHistory(){
​
  for (var i = 0; i < oldNames.length; i++){
​
    var listCity = $("<button>");
    listCity.attr("class", "list-group-item list-group-item-action history");
    listCity.attr("data-name", oldNames[i]);
    listCity.text(oldNames[i]);
    $("#city-history").prepend(listCity);
​
  }
​
};
function lastCity(){
​
  var APIKey = "61884189ea401251c54c2d436ff4118c";
  var lastCitylocation = JSON.parse(localStorage.getItem("LastCity"));
    
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + lastCitylocation + "&appid=" +  APIKey;
​
  $.ajax({url: fiveDay, method: "GET"})
​
  .then(function(response) {
    
    currentAndFiveDay(response);
​
    var lon = response.city.coord.lon
    var lat = response.city.coord.lat
    var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat +"&lon=" + lon;
​
    $.ajax({ url: uvIndexURL, method: "GET"})
      
    .then(function(result){        
        
      uvIndexF(result)
        
    });
      
  });
​
};
​
  
recallHistory();














