/*jshint esversion: 6 */

(function() {
	var app = angular.module('App', ['ui.router'])
	.config(function($sceDelegateProvider, $locationProvider) {
	    $sceDelegateProvider.resourceUrlWhitelist([
	    	'self',
	    	'*://www.youtube.com/**'
	    ]);

		$locationProvider
		  .html5Mode(false)
		  .hashPrefix('!');
	 })
	.config(function($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise('/');
    	$stateProvider
        .state('home', {
        	url: '/',
        	templateUrl: '/src/templates/pages/home/index.html'
        })
        .state('list', {
        	url: '/list/:type?/:name?',
        	templateUrl : '/src/templates/pages/list/index.html',
	    	resolve: {
	    		listService: function($http) {
	    			return $http.get('/concerts');
	    		}
	    	},
	    	controller: 'ListCtrl'
        })
        .state('watch', {
        	url: '/watch/:id',
			templateUrl : '/src/templates/pages/watch/index.html',
			resolve: {
				watchService: function($http, $stateParams) {
					var params = {'id': $stateParams.id};
					return $http.get('/concert', {params: params});
				}
			},
	    	controller: 'WatchCtrl',
	    	controllerAs: 'watch'
        })
        .state('about', {
        	template: '<h1 style="text-align: center;"> About page </h1>'
        })
        .state('404', {
        	template: '<h1 style="text-align: center;">Page not found</h1>'
        });
	});

	app.controller('ListCtrl', function(listService, $scope, $stateParams) {
		var type = $stateParams.type;
		var name = $stateParams.name;

		$scope.type = type;
		$scope.name = name;

		$scope.orderBy = type;
		$scope.search = name;

		$scope.concerts = listService.data;
	});

	app.controller('WatchCtrl', function($scope, $stateParams, watchService) {
		$scope.id = $stateParams.id;
		$scope.concert = watchService.data;
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

	app.controller('RandomCtrl', function($http) {
		$http.get('/random').then((res) => {
			this.id = res.data;
		});
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
		};
	});


	app.directive('watchComponent', function() {
		return {
			templateUrl: '/src/templates/directives/watch.html'
		};
	});
})();