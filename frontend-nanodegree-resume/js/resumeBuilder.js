var model = {
	bio: {
		name: "Jeremy Tee",
		role: "VR-websites engineer",
		contacts: {
			modile: "78-98-77",
			email: "jt@gmail.com",
			github: "jt.github.com",
			twitter: "jt.twitter.com",
			location: "sunny AU"
		},
		welcomeMessage: "Hey you!.. welcome!",
		skills: ["modern web-dev", "algorithm design", "VR refactoring", "vegan meals"],
		biopic: "../images/fry.jpg"
	},//---------------------------------------------------------------------------------------------
	work: {
		jobs: [
			{employer: "ZZ2", title: "Junior VR uplifter", location: "Paris", dates: "2013-2015", description: "Was resposible for stuff. Was resposible for stuff. Was resposible for stuff."},
			{employer: "H++", title: "VR architector", location: "remote", dates: "2016-2018", description: "Was resposible for stuff. Was resposible for stuff."}
		]
	},//---------------------------------------------------------------------------------------------
	education: {
		schools: [
			{name: "IT School", location: "Sydney", degree: "Bach.", majors: ["CS","Web"], dates: 2010, url: "itschool.org"},
			{name: "Night genius", location: "Dublin", degree: "PhD", majors: ["Robots","VR"], dates: 2014, url: "ng.org"}
		],
		onlineCourses: [
			{title: "Web design", school: "New-Mex", date: 2013, url: "coursera.org"},
			{title: "Dart for VR", school: "Google S", date: 2013, url: "udacity.com"}
		]
	},//---------------------------------------------------------------------------------------------
	projects: {
		projects: [
			{title: "Explore the depth", dates: "2012-2013", description: "Testing with current knowledge. Fun."},
			{title: "Circle of biases", dates: "2015-2019(hopefully)", description: "Testing with current knowledge. Fun. Testing with current knowledge. Fun. Testing with current knowledge. Fun."}
		]
	}
};
var octopus = {
	init: function() {
		view.init();
	}
};
var view = {
	init: function() {
		view._initHeader();
		view._initWork();
		view._initProjects();
		view._initEducation();
	},

	//'private' section
	_initHeader: function() {
		var $header = $('#header');
		for(var k in HTMLcontactLis){
			if (HTMLcontactLis.hasOwnProperty(k)) {

			}
		}
	},
	_initWork: function() {

	},
	_initProjects: function() {

	},
	_initEducation: function() {

	}
};
$(function() {
	octopus.init();
});