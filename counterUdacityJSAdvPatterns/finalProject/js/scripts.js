var initializeMap = function() {
	var mapOptions = {
	    center: { lat: -20, lng: 100},
	    zoom: 2
	  };
	var map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	console.log("in initmap");

	initialMarkers = [
		{
			position: { lat: -31, lng: 115},
			map: map,
			title: 'Australia'
		},
		{
			position: { lat: -41, lng: 174},
			map: map,
			title: 'New Zealand'
		},
		{
			position: { lat: 37, lng: -122},
			map: map,
			title: 'California'
		},
		{
			position: { lat: 37, lng: 126},
			map: map,
			title: 'South Korea'
		}
	];
};

var initialMarkers;

var MapViewModel = function() {
	var self = this;
	this.markerList = ko.observableArray([]);

	initialMarkers.forEach(function(markObj){
		self.markerList.push( new google.maps.Marker({
			position: markObj.position,
			map: markObj.map,
			title: markObj.title
  		}));
	});
};

google.maps.event.addDomListener(window, 'load', function(){initializeMap(); ko.applyBindings(new MapViewModel());});