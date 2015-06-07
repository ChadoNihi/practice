var initializeMap = function() {
	var mapOptions = {
	    center: { lat: -20, lng: 100},
	    zoom: 2
	  };

	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

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

var map;
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

	this.srchForMarker = function(formEl) {
		var selectEl = formEl["select-list"];
		if ( selectEl.options[selectEl.selectedIndex].index )
			map.panTo(this.markerList()[ selectEl.options[selectEl.selectedIndex].index-1 ].getPosition());
		else {
			var patt = new RegExp(formEl["srch-bar"].value, 'i');
			for(var i=0, len=this.markerList().length; i<len; i++) {
				if ( patt.test(this.markerList()[i].title) ) {
					map.panTo(this.markerList()[i].getPosition());
					return;
				}
			}
		}
	}
};

google.maps.event.addDomListener(window, 'load', function(){initializeMap(); ko.applyBindings(new MapViewModel());});