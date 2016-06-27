app.factory('User', ['$http', '$rootScope', 'api_url', 'localStorageService', function($http, $rootScope, api_url, localStorageService) {
  	
    // console.log(localStorageService.isSupported);

    function check(){
        if ($rootScope.currentUser)
            return true;
        else 
            return false;
    }

    function register(name, email, password, onSuccess, onError) {
        $http.post(api_url + '/register', 
        {
            name: name,
            email: email,
            password: password
        }).
        then(function(response) {
            localStorageService.set('token', response.data.token);
            onSuccess(response);
        }, function(response) {
            onError(response);
        });
    }

    function login(email, password, onSuccess, onError){
        $http({            
            method: 'POST',
            url: api_url + '/login',
            header: {'Content-Type': 'application/json'},
            data: {
                email: email,
                password: password
            }
        }).
        then(function(response) {
            localStorageService.set('token', response.data.token);
            onSuccess(response);
        }, function(response) {
            onError(response);
        });
    }

    function get(onSuccess){
        $http({            
            method: 'GET',
            url: api_url + '/login',
            header: {'Content-Type': 'application/json'},
            params: {
                token: localStorageService.get('token')
            }
        }).
        then(function(response) {
            onSuccess(response);
        });
    }

    function logout(){
        localStorageService.remove('token');
        localStorageService.remove('user');
    }

    function getCurrentToken(){
        return localStorageService.get('token');
    }

    return {
        check: check,
        register: register,
        login: login,
        get: get,
        logout: logout,
        getCurrentToken: getCurrentToken
    }
}]);
