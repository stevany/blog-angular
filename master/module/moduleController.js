angular
.module('app')
.controller('ModuleController',ModuleController);

ModuleController.$inject=['$scope', 'FlashService', 'ModuleService'];
function ModuleController( $scope,  FlashService, ModuleService){
	$scope.save=save;
	$scope.search=search;
	$scope.update=update;
	$scope.del=del;
	$scope.list=list;
	$scope.edit=edit;
	$scope.add=add;
	$scope.cancel=cancel;

	$scope.module=null;
	$scope.modules=[];

	//get all modules
	function list(){
		ModuleService.GetAll()
			.then(function(data){
			if(data){
				$scope.modules=data;
			}else{
				FlashService.Error(data);
			}
		})
			
	}
	function save(module){

		ModuleService.Create(module)
			.then(function (data) {
	            if (data) {
	                FlashService.Success('create module successful', true);
	                $scope.modules.push(data);
	                $scope.module=null;
	            } else {
	               FlashService.Error('error');
	            }
	        })
	}

	function search(name){
		ModuleService.GetByName(name)
			.then(function(data){
				if(data){
					$scope.modules=data;
				}else{
					FlashService.Error('error not found');
			}
		})
	}

	function update(module){
		ModuleService.Update(module)
			.then(function(data){
				if(data){
					list();
					$scope.module=null;
				}else{
					FlashService.Error('error update!');
				}
			})
	}

	function del(module){
		ModuleService.Delete(module)
			.then(function(data){
				if(data){
					$scope.modules.splice($scope.modules.indexOf(module),1);
				}else{
					FlashService.Error('error delete!');
				}
			})
	}

	function edit(module){
		$scope.module=module;

	}
	function add(){
		$scope.module=null;
	}
	function cancel(){
		$scope.module=null;
	}

	//get all list module
	$scope.list();

	}