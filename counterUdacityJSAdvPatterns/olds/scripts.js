var clicked1 = false;
var clicked2 = false;
var cntr1;
var cntr2;
var clCount1 = 1;
var clCount2 = 1;

var name1 = "Big city at dawn";
var name2 = "Huge green hedge";

document.addEventListener("DOMContentLoaded", function(event) {
	var img1 = document.getElementsByClassName('img-to-click')[0];
	var img2 = document.getElementsByClassName('img-to-click')[1];
	
	document.getElementsByClassName('name')[0].innerHTML = name1;
	document.getElementsByClassName('name')[1].innerHTML = name2;

	function countClicks (i) {
		var clicked = window["clicked"+i];
		console.log(window["clicked"+i]);
		if (clicked) {
			window["cntr"+i].innerHTML = ++window["clCount"+i];
		} else {
			var hcount = document.getElementsByClassName('counter')[i-1];

			hcount.innerHTML = "You've clicked <span>1</span> times!";
			window["clicked"+i] = true;
			window["cntr"+i] = hcount.children[0];
		}
	}


	if (img1.addEventListener) {                    // For all major browsers, except IE 8 and earlier
	    img1.addEventListener("click", function(){countClicks(1);});
	} else if (img1.attachEvent) {                  // For IE 8 and earlier versions
	    img1.attachEvent("onclick", function(){countClicks(1);});
	}

	if (img2.addEventListener) {                    // For all major browsers, except IE 8 and earlier
	    img2.addEventListener("click", function(){countClicks(2);});
	} else if (img2.attachEvent) {                  // For IE 8 and earlier versions
	    img2.attachEvent("onclick", function(){countClicks(2);});
	}
});