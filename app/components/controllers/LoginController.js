app.controller('LoginController', ['$rootScope', '$scope', '$location', 'User', 'localStorageService', function ($rootScope, $scope, $location, User, localStorageService) {
	$scope.message = '';

	$scope.login = function() {
		User.login(
			$scope.email, $scope.password,
			function(response){
				User.get(function(response) {
					// console.log(response.data.user);
					var user = JSON.stringify(response.data.user);
					$rootScope.currentUser = response.data.user;
                    localStorageService.set('user', user);
				});
				$scope.message = response.data.error;
				$location.path('/');
			},
			function(response){
				alert('Email or password incorrect. Try again later!');
			}
		);
	}

	$scope.email = '';
	$scope.password = '';

	if(User.check()) {
		$location.path('/');
	}
}]);