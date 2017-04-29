/*var weatherAPIKey = "aedfac0b150f3c79";
var qpxAPIKey = "AIzaSyBCZ_Nx9Hdm4n-VOeVZvfltwPy76PXCp-8";
var placesAPIKey = "AIzaSyAGAmaVfOaIUJD8InL1xVYy1hSahuGED-U";
var airportcodes = getAirportList();
var oLat;
var oLon;
var currentLocation = navigator.geolocation.getCurrentPosition(getPosition);*/


/*function getWeather(lat, lon, button) {
	var queryURL = "https://api.wunderground.com/api/"+weatherAPIKey+"/forecast/q/"+lat+","+lon+".json"
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			var currentDay = response.forecast.simpleforecast.forecastday[0];
			var weatherImage = $("<img src="+currentDay.icon_url+">");			
			var lowTemp = currentDay.low.fahrenheit;
			var highTemp = currentDay.high.fahrenheit;
			button.append(weatherImage);
			button.append("<h2>Low: "+lowTemp+"\xB0F</h2>");
			button.append("<h2>High: "+highTemp+"\xB0F</h2>");
		});
}*/
//Only getting current date for now, should probably let users choose date or use a date range
/*function getCurrentDate(){
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
}*/

/*function getAirlinePricing(startCode, endCode, button){
	var currentDate = getCurrentDate();
	var flight = {
	  "request": {
	    "slice": [
	      	{"origin": startCode,
	        "destination": endCode,
	        "date": currentDate}],
	    "passengers": 
	    	{"adultCount": 1,
	     	"infantInLapCount": 0,
	     	"infantInSeatCount": 0,
	     	"childCount": 0,
	     	"seniorCount": 0},
	    "solutions": 1,			//limit results to 1 for testing
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
			var price = "No direct flights found."
				if(response.trips.tripOption !== undefined){
					price = response.trips.tripOption[0].saleTotal;
				}
			$(button).append(price);
		});
}*/


/*function getPosition(position){
	oLat = position.coords.latitude;
	oLon = position.coords.longitude;
	console.log(oLat+":"+oLon);
}*/


/*function getAirport(dLat, dLon, b) {
	var destination = getAirportCode(dLon, dLat, 0.01);
	var origin = getAirportCode(oLon,oLat,0.01);
	getAirlinePricing(origin,destination,b);
}*/

/*function getCoordinates(city,obj){
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
			var data = response.query.results.json.results[0];
			obj.lat = data.geometry.location.lat;
			obj.lon = data.geometry.location.lng;
			}
		});
}*/

/*function getAirportCode(lon, lat, range){
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
}*/
/*$(".search").on("click",function(event){
 	event.preventDefault();
	var city = $("#cityName").val().trim();
 	getAirport(city);
});*/