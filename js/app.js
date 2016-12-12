(function() {
	var app = angular.module('App', ['ngRoute'])
	.config(function($sceDelegateProvider, $locationProvider) {
	   $sceDelegateProvider.resourceUrlWhitelist([
	     'self',
	     '*://www.youtube.com/**'
	   ]);
	   $locationProvider.html5Mode(true);
	 })
	.config(function($routeProvider) {
	  $routeProvider
	  .when('/watch/:id', {
	    templateUrl : '/templates/pages/watch/index.html',
	    controller: 'WatchCtrl',
	    controllerAs: 'watch'
	  })
	  .when('/list/:type/:name', {
	    templateUrl : '/templates/pages/list/index.html',
	    controller: 'ListCtrl',
	    controllerAs: 'list'
	  })
	  .when('/', {
	  	templateUrl: '/templates/pages/home/index.html'
	  })
	  .otherwise({
	  	redirectTo: '/'
	  });
	});

	app.controller('ListCtrl', function($routeParams) {
		this.type = $routeParams.type;
		this.name = $routeParams.name;
	});

	app.controller('WatchCtrl', function($scope, $routeParams) {
		var id = $routeParams.id;
		$scope.id = id;
		// $scope.concert = getConcertById($routeParams.id);

		$scope.concert = {
				artist: "Robert Glasper Trio",
				artists: ["Robert Glasper", "Derick Hodge", "Chris Dave"],
				year: "2012",
				festival: "Jazz a la Villette Festival",
				venue: "Cite de la Musique",
				city: "Paris, France",
				id: id,
				url: "http://www.youtube.com/embed/" + id
			};
	});

	app.controller('FeaturedCtrl', function($scope) {
		$scope.concert = featured;
	});

	app.controller('VenuesCtrl', function() {
		this.venues = venues;
	});

	app.controller('GenresCtrl', function() {
		this.genres = genres;
	});

	app.controller('RecentsCtrl', function() {
		this.recents = recents;
	});


	app.directive('watchComponent', function() {
		return {
			templateUrl: 'templates/directives/watch.html'
		}
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

	var venues = [
		{
			venue: "Village Vanguard",
			description: "NYC - lit since 1920s"
		},
		{
			venue: "55 Bar",
			description: "cozy venue blah blah"
		}
	];

	var genres = [ "Swing", "Hard-Bop", "Fusion" ];

	var recents = [
	{
		artist: "Snarky Puppy",
		venue: "Village Vanguard",
		year: "2012",
		id: "kScYtiy4PEs"
	},
	{
		artist: "Chris Potter",
		venue: "55 Bar",
		year: "2010",
		id: "kScYtiy4PEs"
	}];

})();