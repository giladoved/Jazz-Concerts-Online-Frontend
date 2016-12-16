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
	    templateUrl : '/src/templates/pages/watch/index.html',
	    controller: 'WatchCtrl',
	    controllerAs: 'watch'
	  })
	  .when('/list/:type/:name', {
	    templateUrl : '/src/templates/pages/list/index.html',
	    controller: 'ListCtrl',
	    controllerAs: 'list'
	  })
	  .when('/', {
	  	templateUrl: '/src/templates/pages/home/index.html'
	  })
	  .otherwise({
	  	redirectTo: '/'
	  });
	});

	app.controller('ListCtrl', function($routeParams) {
		this.type = $routeParams.type;
		this.name = $routeParams.name;
	});

	app.controller('TracklistCtrl', function($scope) {
		$scope.jumpVideo = function(timestamp) {
			var timeParts = timestamp.split(':');
			var hours, minutes, seconds;

			if (timeParts.length == 3) {
				hours = timeParts[0];
				minutes = timeParts[1];
				seconds = timeParts[2];
			} else {
				minutes = timeParts[0];
				seconds = timeParts[1];
			}

			var totalSeconds = 0;
			if (timeParts.length == 3) {
				totalSeconds += hours * 60 * 60;
			}
			totalSeconds += minutes * 60;
			totalSeconds += seconds;

			console.log("Seeking to " + totalSeconds);
		}
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
				url: "http://www.youtube.com/embed/" + id + "?showinfo=0&rel=0"
			};
	});

	app.controller('FeaturedCtrl', function($scope, $http) {
		$http.get('/featured').then((res) => {
			$scope.concert = res.data;
		});
	});

	app.controller('VenuesCtrl', function($http) {
		$http.get('/venues').then((res) => {
			this.venues = res.data;
		});
	});

	app.controller('GenresCtrl', function($http) {
		$http.get('/genres').then((res) => {
			this.genres = res.data;
		});
	});

	app.controller('RecentsCtrl', function($http) {
		$http.get('/recents').then((res) => {
			this.recents = res.data;
		});
	});


	app.directive('watchComponent', function() {
		return {
			templateUrl: '/src/templates/directives/watch.html'
		};
	});
})();