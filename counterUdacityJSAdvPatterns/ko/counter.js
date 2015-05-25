var initialPhotos = [
	{
		numberOfClicks: 0,
		title: "Big city at dawn",
		url: "../res/city.jpg",
		onPicture: ["sky","people"]
	},
	{
		numberOfClicks: 0,
		title: "Huge green hedge",
		url: "../res/hedge.jpg",
		onPicture: ["sky","people"]
	},
	{
		numberOfClicks: 0,
		title: "Somewhere in NZ",
		url: "../res/ton.jpg",
		onPicture: ['mountains','a road','boulders','a cloud']
	},
	{
		numberOfClicks: 0,
		title: "Mountain road",
		url: "../res/road.jpg",
		onPicture: ["a mountain","sand"]
	},
	{
		numberOfClicks: 0,
		title: "East-Indian landscape",
		url: "../res/india.jpg",
		onPicture: ["hills","a town"]
	},
];

var Photo = function(data) {
	this.numberOfClicks = ko.observable(data.numberOfClicks);
	this.title = ko.observable(data.title);
	this.url = ko.observable(data.url);
	this.ranks = ko.observableArray(["Newbee","Junior","Mentor","Master"]);
	this.onPicture = ko.observableArray(data.onPicture);
	this.currentRank = ko.pureComputed(function() {
		var nOfCl = this.numberOfClicks();
    	if (nOfCl>150) return this.ranks()[3];
    	else if (nOfCl>100) return this.ranks()[2];
    	else if (nOfCl>10) return this.ranks()[1];
    	else return this.ranks()[0];
	}, this);
};

var ClickCounterViewModel = function() {
	var self = this;
	this.photoList = ko.observableArray([]);
	initialPhotos.forEach(function(phObj){
		self.photoList.push( new Photo(phObj));
	});
	this.currentPhoto = ko.observable(new Photo(initialPhotos[0]));
	this.registerClick = function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    };
    this.changePhoto = function(phObj) {
    	self.currentPhoto(phObj);
    };
}

ko.applyBindings(new ClickCounterViewModel());