(function() {
	var app = angular.module('App', []).config(function($sceDelegateProvider) {
	   $sceDelegateProvider.resourceUrlWhitelist([
	     'self',
	     '*://www.youtube.com/**'
	   ]);
	 });

	app.controller('FeaturedCtrl', function() {
		this.concert = featured;
	});

	var featured = {
		artist: "Robert Glasper Trio",
		artists: ["Robert Glasper", "Derick Hodge", "Chris Dave"],
		year: "2012",
		festival: "Jazz a la Villette Festival",
		venue: "Cite de la Musique",
		city: "Paris, France",
		id: "kScYtiy4PEs",
		url: "http://www.youtube.com/embed/kScYtiy4PEs"
	};
})();