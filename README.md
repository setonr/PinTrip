
# PinTrip

PinTrip is a website where you pin travel destinations, but in addition to beautiful location photos, you will get weather, plane tickets cost, and hotel prices to get a more detailed profile.

## Screenshots
![alt tag](https://raw.githubusercontent.com/CheetahSpots/PinTrip/master/assets/images/screenshot.png)
![alt tag](https://raw.githubusercontent.com/CheetahSpots/PinTrip/master/assets/images/screenshot2.png)
![alt tag](https://raw.githubusercontent.com/CheetahSpots/PinTrip/master/assets/images/screenshot3.png)


## Technologies used
You can give a brief listing of the technologies you've learned and applied here
* animation plugins
* jQuery
* Bootstrap
* GoogleMaps API
* GoogleMaps Javascript Library
* Weather Underground API
* Google qpxExpress API (Airline pricing)
* Google Fonts

## Getting Started

Pull down this Repo. Should work in it's current form. Be sure to clear local storage if your PinTrip list is too large!

### Prerequisities

None

## Built With

* VisualStudio Code
* Sublime
* Javascript
* Bootstrap

## Interesting Coding Challenges

Below is some code that works amazingly. However gave us trouble in retreiving the returned data. 
```
function getCoordinates(city,obj){
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
```

## Authors

* **Seton Raynor** - Front End & UX, Styling and Design
* **Paul Siewers** - Backend Airline Ticket & Weather API & Back to Front End Implementor
* **Cynthia Richards** - Front End & UX, Layout & Planning
* **Byron Anderson** - Backend Google Maps API, javascripting animations & Back to Front End Implementor

See also the list of [contributors](https://github.com/CheetahSpots/PinTrip/graphs/contributors) who participated in this project.
