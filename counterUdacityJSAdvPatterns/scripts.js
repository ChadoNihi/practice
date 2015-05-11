document.addEventListener("DOMContentLoaded", function(event) {
	var currImg = 0; //from 0
	var titlesStrs = ["Big city at dawn", "Huge green hedge", "Somewhere in NZ", "Mountain road", "East-Indian landscape"];
	var imgBlocks = document.getElementsByClassName('img-w-counter');
	var htitles = document.getElementsByClassName('title');
	var hcounters = document.getElementsByClassName('counter');
	var handler = function(){fstClick();};

	for (var c=0; c<titlesStrs.length; c++) {
		window['clCount'+c] = 1;

		htitles[c].innerHTML = titlesStrs[c];
		imgBlocks[c].getElementsByTagName('img')[0].alt = titlesStrs[c];

		addEListener(htitles[c], 'click', (function(cCopy){return function() {showImg(cCopy);};})(c));
		addEListener(imgBlocks[c].getElementsByTagName('img')[0], 'click', handler);
	}

	function showImg (i) {
		if (currImg!=i) {
			htitles[i].style.fontWeight = "bold";
			htitles[currImg].style.fontWeight = "normal";
			imgBlocks[currImg].style.left = -6000+"px";

			imgBlocks[i].style.left = 10+"px";
			currImg = i;
		}
	}

	function fstClick () {
		var imgEl = imgBlocks[currImg].getElementsByTagName('img')[0];
		hcounters[currImg].innerHTML = "You've clicked <span>1</span> times!";

		removeEListener(imgEl, 'click', handler);
		addEListener(imgEl, 'click', function(){countClicks();});
	}

	function countClicks () {
		hcounters[currImg].getElementsByTagName('span')[0].innerHTML = ++window["clCount"+currImg];
	}

	function addEListener (elem, evName, f, useCptr) {
		if (elem.addEventListener) {   // For all major browsers, except IE 8 and earlier
			var cptr = useCptr && true;
			elem.addEventListener(evName, f, cptr);
		} else if (elem.attachEvent) { // For IE 8 and earlier versions
			elem.attachEvent('on'+evName, f);
		}
	}

	function removeEListener (elem, evName, f, useCptr) {
		if (elem.removeEventListener) {   // For all major browsers, except IE 8 and earlier
			var cptr = useCptr && true;
			elem.removeEventListener(evName, f, cptr);
		} else if (elem.detachEvent) { // For IE 8 and earlier versions
			elem.detachEvent('on'+evName, f);
		}
	}
});