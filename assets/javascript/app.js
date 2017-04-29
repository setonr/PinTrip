var locales = JSON.parse(localStorage.getItem("buttons"));
var searchBox = new google.maps.places.Autocomplete(document.getElementById('cityName'));
var cities = [
    'Dubrovnic',
    'Istanbul',
    'Cancun',
    'Mumbai',
    'Hong Kong',
    'Liberia',
    'Havana',
    'London',
    'New York',
    'Paris',
    'Munich',
    'Sydney',
    'Buenos Aires',
    'Los Angeles',
    'Caracas',
    'Lisbon',
    'Cairo',
    'Moscow'
];

if (!Array.isArray(locales)) {
    locales = [];
}

function getPhoto(str,b){
    var api = 'AIzaSyCXTtBaHKkdoistY7XeHDwYVQ3-JURBRk8';
    var getID = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + str +"&key=" + api;
    var q = encodeURIComponent('select * from html where url="'+getID+'"');
    var yql = 'https://query.yahooapis.com/v1/public/yql?q='+q+'&format=json';
    $.ajax({
            url: yql,
            contentType: 'text/plain',
            method: "GET"
        }).done(function(ID) {
            console.log(ID);
            var obj = JSON.parse(ID.query.results.body);
            var photoRef = obj.results[0].photos[0].photo_reference;
            var photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference="+photoRef+"&key="+api;
            var checkIt = $("<div id='textbar' class='col-md-12'>");
            console.log(photo);
            b.addClass("col-md-4");
            b.addClass("cities");
            checkIt.html(str.replace(/\+/g, ' '));
            b.append(checkIt);
            var fader = $('<div id="fader">').css('background-color', 'rgba(0, 0, 0, 0.45)');
            b.append(fader);
            var image = $('<img>');
            image.addClass("photos");
            image.attr('src', photo);
            checkIt.append(image);
            console.log(b);
        });
}

var weatherAPIKey = "aedfac0b150f3c79";


function getWeather(lat, long, div) {
    var queryURL = "http://api.wunderground.com/api/"+weatherAPIKey+"/forecast/q/"+lat+","+long+".json"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){  
        var currentDay = response.forecast.simpleforecast.forecastday[0];
        var weatherImage = $("<img src="+currentDay.icon_url+">");          
        var lowTemp = currentDay.low.fahrenheit;
        var highTemp = currentDay.high.fahrenheit;
        var newDiv = $("<div>");
        newDiv.append(weatherImage);
        newDiv.append("<h2>Low: "+lowTemp+"\xB0F</h2>");
        newDiv.append("<h2>High: "+highTemp+"\xB0F</h2>");
        $(div).prepend(newDiv);
    });
}

var airportcodes = getAirportList();
var oLat;
var oLon;
var currentLocation = navigator.geolocation.getCurrentPosition(getPosition);
function getPosition(position){
    oLat = position.coords.latitude;
    oLon = position.coords.longitude;
}
function getAirport(city, div) {
var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
queryURL += $.param({
    'query': city,
    'type': "airport",
    'key': placesAPIKey,
});
var yqlURL = "https://query.yahooapis.com/v1/public/yql";
$.ajax({
    url: yqlURL,
    type: "GET",
    dataType: "jsonp",
    cache: false,
    data: {
        'q': 'SELECT * FROM json WHERE url="'+queryURL+'"',
        'format': 'json',
        'jsonCompat': 'new',
    },
    success: function(response){
        console.log(response);
        var data = response.query.results.json.results[0];
        var dLat = data.geometry.location.lat;
        var dLon = data.geometry.location.lng;
        var destination = getAirportCode(dLon, dLat, 0.1);
        currentLocation = navigator.geolocation.getCurrentPosition(getPosition);
        var origin = getAirportCode(oLon,oLat,0.1);
        getAirlinePricing(origin,destination,div);
        getWeather(dLat,dLon,div);
    },          
});
}
function getAirportCode(lon, lat, range){
        if(range < 3){
            for (var i = 0; i < airportcodes.length; i++){
                var current = airportcodes[i];
                if (current.type==="airport"){
                    var cLat = parseInt(current.lat);
                    var cLon = parseInt(current.lon);
                    if (lon - range < cLon && lon + range > cLon && lat - range < cLat && lat + range > cLat) {
                        console.log(current.iata);
                        return current.iata;
                    }
                }
            }
            return getAirportCode(lon,lat,range*2);
        }
        else{
            return false;
        }
}
var qpxAPIKey = "AIzaSyBCZ_Nx9Hdm4n-VOeVZvfltwPy76PXCp-8";
var placesAPIKey = "AIzaSyDQoY_8yJb2FdgZMn5xxnehR-_1qCtK-tE";

//Only getting current date for now, should probably let users choose date or use a date range
function getCurrentDate(){
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth()+1;
    if (month < 10){
        month = "0"+month;
    }
    var day = currentDate.getDate();
    if (day < 10){
        day = "0"+day;
    }
    return year+"-"+month+"-"+day;
}

function getAirlinePricing(startCode, endCode, div){
    var currentDate = getCurrentDate();
    var flight = {
      "request": {
        "slice": [
          {
            "origin": startCode,
            "destination": endCode,
            "date": currentDate
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 1,         //limit results to 1 for testing
        "refundable": false
      }
    };
    $.ajax({
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key="+qpxAPIKey,
        method: "POST",
        contentType: "application/json", 
        dataType: "json",
        data: JSON.stringify(flight)
    }).done(function(response){
        console.log(response);
        var newDiv = $("<div>");
        newDiv.addClass("planeDiv");
        if(response.trips.tripOption){
             newDiv.html(response.trips.tripOption[0].saleTotal);
        }
        else{
            newDiv.html("No Direct Flights Found");
        }
        $(div).append(newDiv);
    });
}


function makeButtons() {
   
   $("#btnDiv").empty();
    var insideLocales = JSON.parse(localStorage.getItem("buttons"));

    if (!Array.isArray(insideLocales)) {
        insideLocales = [];
    }

    for (var i = 0; i < locales.length; i++) { 

        var str = locales[i];
        var newButton = $("<div id='circlePin'>");
        newButton.addClass("cities");                  
        var weatherButton = $("<div>");
        weatherButton.addClass("weatherDiv");
        getPhoto(str,newButton);
        getAirport(str,weatherButton);
        var newRow = $("<div class='row'>");
        newRow.append(newButton);
        newRow.append(weatherButton);
        $("#btnDiv").append(newRow);
    }
}
//localStorage.clear();
makeButtons();

// $(document).on("click", "button.delete", function() {
//     var buttonsList = JSON.parse(localStorage.getItem("buttons"));
//     var currentIndex = $(this).attr("data-index");

//     buttonsList.splice(currentIndex, 1);

//     locales = buttonsList;

//     localStorage.setItem("buttons", JSON.stringify(locales));

//     makeButtons();

// });

$("#searchBtn").on("click", function(event){
    event.preventDefault();

    var city = $("#cityName").val().trim();
    var replaced = city.replace(/\s/g, '+');
    locales.push(replaced);

    localStorage.setItem("buttons", JSON.stringify(locales));
    
    makeButtons();

});

$("#randomBtn").on("click",function() {
    var i = Math.floor(Math.random() * (cities.length - 1));
    $("#cityName").val(cities[i]);
    $("#cityName").focus();
    // $("#searchBtn").trigger("click");
    return false;
});

$(function () {

    $('#content-slider').slidesjs({
    width: 1920,
    height: 600,
    effect: {
        slide:{ speed: 800}
    },
    navigation: {
        active: false
    },
    pagination: {
        active: false
    },
    play:{
        interval: 5000,
        auto: true
    }
});
});







