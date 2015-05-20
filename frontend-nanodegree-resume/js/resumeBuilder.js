var model = {
	bio: {
		name: "Jeremy Tee",
		role: "VR-websites engineer",
		contacts: {
			modile: "78-98-77",
			email: "jt@gmail.com",
			twitter: "jt.twitter.com",
			github: "jt.github.com",
			location: "sunny AU"
		},
		welcomeMessage: "Hey you!.. welcome!",
		skills: ["modern web-dev", "algorithm design", "VR refactoring", "vegan meals"],
		biopic: "images/fry.jpg"
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
	getBio: function() {
		return model.bio;
	},
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
		var bio = octopus.getBio();
		var contacts = view._getValues(bio.contacts);
		var HTMLskillsLis="";
		var numOfSkills = bio.skills.length;
		var HTMLskillsFullList;
		var i = 0;

		$header.append(view._replaceDummy(HTMLheaderName, bio.name), view._replaceDummy(HTMLheaderRole, bio.role));

		for(var k in HTMLcontactLis){
			if (HTMLcontactLis.hasOwnProperty(k)) {
				$('#topContacts').append(view._replaceDummy(HTMLcontactLis[k], contacts[i++]));
			}
		}

		for(i=0; i<numOfSkills; i++) HTMLskillsLis+=view._replaceDummy(HTMLskills, bio.skills[i]);
		HTMLskillsFullList = HTMLskillsStart.replace('</ul>', HTMLskillsLis)+'</ul>';
		$header.append(view._replaceDummy(HTMLbioPic, bio.biopic), view._replaceDummy(HTMLwelcomeMsg, bio.welcomeMessage), HTMLskillsFullList);
	},
	_initWork: function() {
		var $workSection = $('#workExperience');
		var HTMLworkEntries = '';


		$workSection.append();
	},
	_initProjects: function() {

	},
	_initEducation: function() {

	},
	_getValues: function(obj) {
		var vals = [];
		for(var k in obj){
			if (obj.hasOwnProperty(k)) {
				vals.push(obj[k]);
			}
		}
		return vals;
	},
	_replaceDummy: function(strToChange, filler) {
		return strToChange.replace('%data%', filler);
	}
};
$(function() {
	octopus.init();
});