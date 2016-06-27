'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  		'ngRoute',
  		'LocalStorageModule'
	]);
app.constant('api_url', 'http://localhost:8000/api');

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	localStorageServiceProvider
		.setPrefix('myApp')
		// .setStorageType('LocalStorage')
}]);

app.config(['$routeProvider', function($routeProvider) {
	console.log('Hello, me.');
	$routeProvider
	    .when('/', { 
	      	controller: 'HomeController',
	    	templateUrl: 'components/views/home.html'
	  	})
	  	.when('/gifts', {
	  		controller: 'GiftController',
	  		templateUrl: 'components/views/gifts.html'
	  	})
	  	.when('/login', {
	  		controller: 'LoginController',
	  		templateUrl: 'components/views/login.html'
	  	})
	  	.when('/logout', {
	  		controller: 'LogoutController'
	  	})
	  	.when('/register', {
	  		controller: 'RegisterController',
	  		templateUrl: 'components/views/register.html'
	  	})
	    .otherwise({
	    	redirectTo: '/'
	  	});
}]);

app.run(function ($rootScope, $location, User, localStorageService) {
    $rootScope.logout = function() {
        User.logout();        
        $rootScope.currentUser = null;
        $location.path('/login');
    }
	$rootScope.currentUser = JSON.parse(localStorageService.get('user'));
});