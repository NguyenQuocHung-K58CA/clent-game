app.controller('GiftController', ['$rootScope', '$scope', '$location', 'Gift', 'User', function($rootScope, $scope, $location, Gift, User) {
	console.log("giftcontroller run");
	if(!User.check()) {
		$location.path('/login');
	}

	$scope.gift_id = 0;
	Gift.getAll().then(function(res){
		$scope.gifts = res.data;
	});

	$scope.sendGift = function(gift_id){
		console.log("post send gift running. " + gift_id);
		if (gift_id==0) {
			$scope.message = "You must be choose a gift."
		}
		else {			
			Gift.sendGift($rootScope.currentUser.id, gift_id).then(function(res){
				$scope.message = res.data.message;
			});
		}
	}
}]);