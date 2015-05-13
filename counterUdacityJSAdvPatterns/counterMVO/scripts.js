if (document.addEventListener)
	document.addEventListener("DOMContentLoaded", main);
else
	window.attachEvent('load', main); //IE8 and earlier

function main(event) {
	var model = {
		imgBlcksData: [
		{title: "Big city at dawn", url: "../res/city.jpg", clicks: 1},
		{title: "Huge green hedge", url: "../res/hedge.jpg", clicks: 1},
		{title: "Somewhere in NZ", url: "../res/ton.jpg", clicks: 1},
		{title: "Mountain road", url: "../res/road.jpg", clicks: 1},
		{title: "East-Indian landscape", url: "../res/india.jpg", clicks: 1}
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
			});
		},

		getCurrImg: function() {
			return model.currImg;
		},

		setCurrImg: function(i) {
			model.currImg = i;
		},

		getIncrementedClCount: function() {
			return ++(model.imgBlcksData[octopus.getCurrImg()].clicks);
		}
	};

	var view = {
		handler: function(){view.fstClick();},

		init: function() {
			var titles = document.getElementsByClassName('titles')[0];
			var imgsData = octopus.getImgsData();
			var numOfImgs = imgsData.length;

			var htmlStr = '';
			for (var i=0; i<numOfImgs; i++) {
				htmlStr += "<li><h3 class=\'title\'>"+ imgsData[i].title +
					"</h3><div class=\'img-w-counter\'><img src=\'"+imgsData[i].url+"\' alt=\'"+imgsData[i].title+"\'><h4 class=\'counter\'>Click the image!</h4></div></li>";
			}
			titles.innerHTML = htmlStr;

			for (i=0; i<numOfImgs; i++) {
				addEListener(titles.getElementsByClassName('title')[i], 'click', (function(iCopy){return function() {view.showImg(iCopy);};})(i));
				addEListener(titles.getElementsByTagName('img')[i], 'click', view.handler);
			}
		},

		showImg: function(i) {
			var curr = octopus.getCurrImg();
			if (curr != i){
				var htitles = document.getElementsByClassName('title');
				var imgBlocks = document.getElementsByClassName('img-w-counter');
				htitles[i].style.fontWeight = "bold";
				htitles[curr].style.fontWeight = "normal";
				imgBlocks[curr].style.left = -6000+"px";

				imgBlocks[i].style.left = 10+"px";

				octopus.setCurrImg(i);
			}
		},

		fstClick: function() {
			var curr = octopus.getCurrImg();
			var imgBlock = document.getElementsByClassName('img-w-counter')[curr];
			var imgEl = imgBlock.getElementsByTagName('img')[0];

			imgBlock.getElementsByClassName('counter')[0].innerHTML = "You've clicked <span>1</span> times!";

			removeEListener(imgEl, 'click', view.handler);
			addEListener(imgEl, 'click', function(){view.countClicks();});
		},

		countClicks: function() {
			var curr = octopus.getCurrImg();
			var count = octopus.getIncrementedClCount();
			document.getElementsByClassName('img-w-counter')[curr].getElementsByTagName('span')[0].innerHTML = count;
		}
	};

	view.init();
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