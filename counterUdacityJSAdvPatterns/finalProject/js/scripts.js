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
		var marker = new google.maps.Marker({
			position: markObj.position,
			map: markObj.map,
			title: markObj.title
  		});

		google.maps.event.addListener(marker, 'click', (function(markerCopy){return function() {self.showWeather(markerCopy);};})(marker));

		self.markerList.push(marker);
	});

	this.showWeather = function (marker) {
		var infowindow = new google.maps.InfoWindow({
			content: '<i>...measuring temperature... please wait</i>'
		});
		var xmlhttp=new XMLHttpRequest();

		infowindow.open(map,marker);

		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var temp = JSON.parse(xmlhttp.responseText).weather.curren_weather[0].temp;
				infowindow.content = '<p>Temp. outside: <strong>'+temp+' °C</strong></p>';
			}
			else if (xmlhttp.readyState==4)
				infowindow.content = '<p><strong>TERRIBLE FAILUREAAA</strong></p>';
		}
		xmlhttp.open("GET","http://www.myweather2.com/developer/forecast.ashx?uac=GMkjCZ7LKN&output=json&query="+marker.getPosition().lat()+","+marker.getPosition().lng(),true);
		xmlhttp.send();
	};

	this.srchForMarker = function(formEl) {
		var selectEl = formEl["select-list"];
		if ( selectEl.options[selectEl.selectedIndex].index ) {
			map.panTo(this.markerList()[ selectEl.options[selectEl.selectedIndex].index-1 ].getPosition());
			map.setZoom(4);
		}
		else {
			var patt = new RegExp(formEl["srch-bar"].value, 'i');
			for(var i=0, len=this.markerList().length; i<len; i++) {
				if ( patt.test(this.markerList()[i].title) ) {
					map.panTo(this.markerList()[i].getPosition());
					map.setZoom(4);
					return;
				}
			}
		}
	};

	this.resetSelected = function() {
		document.getElementsByTagName('option')[0].selected = true;
	};
};

google.maps.event.addDomListener(window, 'load', function(){initializeMap(); ko.applyBindings(new MapViewModel());});