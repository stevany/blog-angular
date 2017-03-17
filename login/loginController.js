angular
.module('app')
.controller('LoginController', LoginController);

LoginController.$inject=['$scope','UserService', 'AuthenticationService', '$location', 'FlashService' ];
function LoginController( $scope, UserService, AuthenticationService, $location, FlashService){
	$scope.login=login;
	$scope.username='';
	$scope.password='';

	  (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
	
	function login(){
		// UserService.GetByUsernameAndPassword($scope.username,$scope.password
		AuthenticationService.Login($scope.username,$scope.password
			, function(response){
			if(response.success){
			
				AuthenticationService.SetCredentials($scope.username,$scope.password, response.data.id);
				$location.path('/');
			}else{
				
				FlashService.Error(response);

			}
		})
	}

	
}