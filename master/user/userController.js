angular.module('app')
.controller('UserController', UserController)
.directive('equals', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
});

UserController.$inject=[ '$location', '$rootScope','$scope',  'FlashService', 'Base64', 'UserService','RoleService'];
function UserController( $location, $rootScope, $scope,  FlashService, Base64, UserService, RoleService){
	$scope.save=save;
	$scope.search=search;
	$scope.update=update;
	$scope.del=del;
	$scope.list=list;
	$scope.edit=edit;
	$scope.add=add;
	$scope.getRole=getRole;
	$scope.cancel=cancel;
	$scope.encrypt=encrypt;

	$scope.user=null;
	$scope.users=[];

	$scope.roless=null;
	$scope.roleList={roled:[]};

	//get all user
	function list(){
		UserService.GetAll()
			.then(function(data){
			if(data){
				$scope.users=data;
			}else{
				FlashService.Error(data);
			}
		})
			
	}
	function getRole(){
		RoleService.GetAll()
		.then(function(data){
			if(data){
				$scope.roless=data;
			}
		})
	}
	function save(user){
		if($scope.user.password==user.passwordConfirm){
			var passkey=encrypt(user.username, user.password);
	        user.password=passkey;
	        user.passwordConfirm=passkey;   
	        user.active=true;     
	        user.roles=$scope.roleList.roled;
	        UserService.Create(user)
	            .then(function (data) {            
	                FlashService.Success('Registration successful', true);
	                //if user is not log in then direct to login page
	                if(!$rootScope.isLogIn){
						$location.path('/login');
					}
					$scope.users.push(data)                
	            });		
			}
		$scope.user=null;
		$scope.roleList={roled:[]};
	}

	function search(name){
		UserService.GetByName(name)
			.then(function(data){
				if(data){
					$scope.users=data;
				}else{
					FlashService.Error('error not found');
			}
		})
	}

	function update(user){
		if($scope.user.password==$scope.user.passwordConfirm){
			var passkey=encrypt($scope.user.username, $scope.user.password);
	        user.password=passkey;
	        user.passwordConfirm=passkey; 
	        user.roles=$scope.roleList.roled;       
			UserService.Update(user)
				.then(function(data){
					if(data){
						list();
						$scope.user=null;
					}else{
						FlashService.Error('error update!');
					}
				})
		}
		
	}

	function del(user){
		UserService.Delete(user)
			.then(function(data){
				if(data){
					$scope.user.splice($scope.users.indexOf(user),1);
				}else{
					FlashService.Error('error delete!');
				}
			})
	}

	function edit(user){
		alert(user.id+ ' pass ' + user.password + ' passkey ' + user.passwordConfirm);
		$scope.user={
			id:user.id,
			username:user.username,
			password:'',
			passwordConfirm:'',
			active:user.active
		}
	
		var r=[];
		angular.forEach(user.roles,function(item){
			r.push(item.id);
		})
		$scope.roleList.roled=r;


	}
	function add(){
		$scope.user=null;
		$scope.roleList={roled:[]}
	}
	function cancel(){
		add();
	}

	function encrypt(username, password){
		return passkey=Base64.encode(username + ':' + password);
	}

	//get all list User
	$scope.list();
	$scope.getRole();

}

