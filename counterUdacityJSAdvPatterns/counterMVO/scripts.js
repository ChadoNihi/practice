if (document.addEventListener)
	document.addEventListener("DOMContentLoaded", main);
else
	window.attachEvent('load', main); //IE8 and earlier

function main(event) {
	var model = {
		imgBlcksData: [
		{title: "Big city at dawn", url: "../res/city.jpg", clicks: 0},
		{title: "Huge green hedge", url: "../res/hedge.jpg", clicks: 0},
		{title: "Somewhere in NZ", url: "../res/ton.jpg", clicks: 0},
		{title: "Mountain road", url: "../res/road.jpg", clicks: 0},
		{title: "East-Indian landscape", url: "../res/india.jpg", clicks: 0}
		],
		currImg: 0,
		add: function(obj) {
			imgBlcksData.push(obj);
		}
	};

	var octopus = {
		getImgsData: function() {
			return model.imgBlcksData;
		},
		addNewImg: function(ttl, src) {
			model.add({
				title: ttl,
				url: src,
				clicks: 0
			})
		},
		getCurrImg: function() {
			return model.currImg;
		},
		setCurrImg: function(i) {
			model.currImg = i;
		}
	};

	var view = {
		init: function() {
			var titles = getElementsByClassName('titles')[0];
			var imgsData = octopus.getImgsData();
			var numOfImgs = imgsData.length();
			var handler = function(){fstClick();};
			var curr = octopus.getCurrImg;

			var htmlStr = '';
			for (var i=0; i<numOfImgs; i++) {
				htmlStr += "<li><h3 class='title'>"+ imgsData.title +"</h3>"+
				"<div class='img-w-counter'><img src='"+imgsData.url+"' alt='"+imgsData.title+"'><h4 class='counter'>Click the image!</h4>
				</div>"
				+"</li>";
			};
			titles.innerHTML = htmlStr;

			for (i=0; i<numOfImgs; i++) {
				addEListener(titles.getElementsByClassName('title')[i], 'click', (function(cCopy){return function() {showImg(cCopy);};})(i));
				addEListener(titles.getElementsByTagName('img')[i], 'click', handler);
			};
		},

		showImg: function(i) {
			var curr = octopus.getCurrImg;
			if (curr != i){


				octopus.setCurrImg(i);
			}
		},

		countClicks: function() {

		}
	};
}

function addEListener (elem, evName, f, useCptr) {
	if (elem.addEventListener) {   // For all major browsers, except IE 8 and earlier
		useCptr = useCptr && true;
		elem.addEventListener(evName, f, useCptr);
	} else if (elem.attachEvent) { // For IE 8 and earlier versions
		elem.attachEvent('on'+evName, f);
	}
}

function removeEListener (elem, evName, f, useCptr) {
	if (elem.removeEventListener) {   // For all major browsers, except IE 8 and earlier
		useCptr = useCptr && true;
		elem.removeEventListener(evName, f, useCptr);
	} else if (elem.detachEvent) { // For IE 8 and earlier versions
		elem.detachEvent('on'+evName, f);
	}
}