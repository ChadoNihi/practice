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
			{employer: "ZZ2", title: "Junior VR uplifter", dates: "2013-2015", location: "Paris", description: "Was resposible for stuff. Was resposible for stuff. Was resposible for stuff."},
			{employer: "H++", title: "VR architector", dates: "2016-2018", location: "remote", description: "Was resposible for stuff. Was resposible for stuff."}
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
			{title: "Explore the depth", dates: "2012-2013", description: "Testing with current knowledge. Fun.", imgsrc: "http://pixabay.com/static/uploads/photo/2014/12/20/09/27/hydroslides-573773_640.jpg"},
			{title: "Circle of biases", dates: "2015-2019(hopefully)", description: "Testing with current knowledge. Fun. Testing with current knowledge. Fun. Testing with current knowledge. Fun.", imgsrc: "http://pixabay.com/static/uploads/photo/2014/12/20/09/27/hydroslides-573773_640.jpg"}
		]
	}
};
var octopus = {
	getBio: function() {
		return model.bio;
	},
	getWork: function() {
		return model.work;
	},
	getProjects: function() {
		return model.projects;
	},
	init: function() {
		view.init();
	}
};
var view = {
	init: function() {
		view._initHeader();
		view._initSection(octopus.getWork().jobs, '#workExperience', HTMLwork);
		view._initSection(octopus.getProjects().projects, '#projects', HTMLprojects);
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
	},/*
	_initWork: function() {
		var work = octopus.getWork();
		var $workSection = $('#workExperience');
		var HTMLworkFullEntries = '';
		var numOfJobs = work.jobs.length;

		for(var i=0;i<numOfJobs;i++) {
			var job = work.jobs[i];
			var HTMLworkEntryInners = view._replaceDummy(HTMLworkEmployer,job.employer)+view._replaceDummy(HTMLworkTitle,job.title)+view._replaceDummy(HTMLworkDates,job.dates)+view._replaceDummy(HTMLworkLocation,job.location)+view._replaceDummy(HTMLworkDescription,job.description);
			HTMLworkFullEntries += HTMLworkStart.replace('</div>', HTMLworkEntryInners+'</div>');
		}


		$workSection.append(HTMLworkFullEntries);
	},*/
	_initProjects: function() {
		var projects = octopus.getProjects();
	},
	_initEducation: function() {

	},
	_initSection: function(arrOfObjsWData, idSel, HTMLarr) {
		var $section = $(idSel);
		var HTMLallEntries = '';
		var numOfEntries = arrOfObjsWData.length;
		var numOfInners = HTMLarr.length;

		for(var i=0;i<numOfEntries;i++) {
			var HTMLentryInners = '';
			for (var j = 1; j<numOfInners; j++) {
				var entryData = view._getValues(arrOfObjsWData[i]);
				var k = j-1;
				HTMLentryInners += view._replaceDummy(HTMLarr[j], entryData[k]);
			}

			HTMLallEntries += HTMLarr[0].replace('</div>', HTMLentryInners+'</div>');
		}

		$section.append(HTMLallEntries);
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