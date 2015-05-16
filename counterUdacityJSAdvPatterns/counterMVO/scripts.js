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
		},

		passowrd: '123'
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
			return ++(this.getImgsData()[this.getCurrImg()].clicks);
		},

		updateImgData: function(ttl, src, c) {
			this.getImgsData()[this.getCurrImg()] = {title: ttl, url: src, clicks: c};
		},

		getPassword: function() {
			return model.passowrd;
		}
	};

	var view = {
		handler: function(){view.fstClick();},

		init: function() {
			this.titles = document.getElementsByClassName('titles')[0];
			this.htitles = document.getElementsByClassName('title');
			this.imgBlocks = document.getElementsByClassName('img-w-counter');
			this.imgs = document.getElementsByClassName('cl-img');
			this.cntrSpans = document.getElementsByClassName('times');
			this.admPanel = document.getElementsByClassName('admin-panel')[0];
			this.adminForm = document.getElementById('fields-to-change'); //document.forms[0]
			var imgsData = octopus.getImgsData();
			var numOfImgs = imgsData.length;

			var htmlStr = '';
			for (var i=0; i<numOfImgs; i++) {
				htmlStr += "<li><h3 class=\'title\'>"+ imgsData[i].title +
					"</h3><div class=\'img-w-counter\'><img class=\'cl-img\' src=\'"+imgsData[i].url+"\' alt=\'"+imgsData[i].title+"\'><h4 class=\'counter\'>Click the image!<span class='times'></span></h4></div></li>";
			}
			view.titles.innerHTML = htmlStr;

			for (i=0; i<numOfImgs; i++) {
				addEListener(view.htitles[i], 'click', (function(iCopy){return function() {view.showImg(iCopy);};})(i));
				addEListener(view.imgs[i], 'click', view.handler);
			}
			addEListener(document.getElementById('admin-btn'), 'click', view.adminLogin);
			addEListener(document.getElementById('close'), 'click', view.adminClose);
			addEListener(document.getElementById('apply'), 'click', view.adminApply);
			this.admPanel.style.top = document.getElementsByTagName('html')[0].clientHeight-50+'px';
		},

		showImg: function(i) {
			var curr = octopus.getCurrImg();
			if (curr != i){
				view.htitles[i].style.fontWeight = "bold";
				view.htitles[curr].style.fontWeight = "normal";
				view.imgBlocks[curr].style.left = -6000+"px";

				view.imgBlocks[i].style.left = 10+"px";

				octopus.setCurrImg(i);
			}
		},

		fstClick: function() {
			var curr = octopus.getCurrImg();
			var imgBlock = view.imgBlocks[curr];
			var imgEl = view.imgs[curr];

			imgBlock.getElementsByClassName('counter')[0].innerHTML = "You've clicked <span class='times'>1</span> times!";

			removeEListener(imgEl, 'click', view.handler);
			addEListener(imgEl, 'click', view.countClicks);
		},

		countClicks: function() {
			var curr = octopus.getCurrImg();
			var count = octopus.getIncrementedClCount();
			view.cntrSpans[curr].innerHTML = count;
		},

		adminLogin: function() {
			var pwFd = document.getElementById('admin-password');
			if (octopus.getPassword()===pwFd.value){
				var currImgObj = octopus.getImgsData()[octopus.getCurrImg()];

				pwFd.value = '';
				pwFd.style.backgroundColor = '#fff';

				view.adminForm.style.display = 'inline-block';
				document.getElementById('title-fld').value = currImgObj.title;
				document.getElementById('url-fld').value = currImgObj.url;
				document.getElementById('clicks-fld').value = currImgObj.clicks;
			} else {
				view.adminForm.style.display = 'none';
				pwFd.style.backgroundColor = '#a11';
			}
		},

		adminApply: function(e) {
			var newT = document.getElementById('title-fld').value;
			var newSrc = document.getElementById('url-fld').value;
			var newC = parseInt(document.getElementById('clicks-fld').value) || 0;
			octopus.updateImgData(newT, newSrc, newC);
			e.preventDefault();
			view.rerenderImg(octopus.getCurrImg());	
		},

		adminClose: function(e) {
			view.adminForm.style.display = 'none';
			document.getElementById('title-fld').value = '';
			document.getElementById('url-fld').value = '';
			document.getElementById('clicks-fld').value = '';

			e.preventDefault();
		},

		rerenderImg: function(i) {
			var imgObj = octopus.getImgsData()[i];
			view.htitles[i].innerHTML = imgObj.title;
			view.imgs[i].src = imgObj.url;
			view.imgBlocks[i].getElementsByClassName('counter')[0].innerHTML = "You've clicked <span class='times'>"+imgObj.clicks+"</span> times!";
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