app.factory('Gift', ['$http', 'api_url', function($http, api_url) {
  	return {
  		getAll: function(){
  			return $http.get(api_url + '/gifts');
        },
        getGiftById: function(gift_id) {
        	return $http.get(api_url + '/gifts/' + gift_id);
        },
        sendGift: function(user_id, gift_id) {
        	var data = {user_id: user_id, gift_id: gift_id};
        	console.log(data);
        	return $http({
        		method: 'POST',
        		url: api_url + '/gifts',
        		header: {'Content-Type': 'application/x-www-form-urlencoded'},
        		data: data
        	});
        	// return $http.get(api_url + '/gifts/' + )
        }
    }
}]);
