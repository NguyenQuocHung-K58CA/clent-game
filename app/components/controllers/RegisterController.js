app.controller('RegisterController', ['$scope', '$location', 'User', function ($scope, $location, User) {
	$scope.register = function() {
		User.register(
			$scope.name, $scope.email, $scope.password,
			function(response){
				alert('Great! You are now signed in! Welcome, ' + $scope.name + '!');
				$location.path('/');
			},
			function(response){
				alert('Something went wrong with the register process. Try again later.');
			}
		);
	}

	$scope.name = '';
	$scope.email = '';
	$scope.password = '';

	if(User.check()){
		$location.path('/');
	}

}]);