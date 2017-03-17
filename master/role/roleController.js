angular
.module('app')
.controller('RoleController', RoleController);

RoleController.$inject=['$scope', 'FlashService', 'RoleService', 'ModuleService'];
function RoleController( $scope,  FlashService, RoleService, ModuleService){
	$scope.save=save;
	$scope.search=search;
	$scope.update=update;
	$scope.del=del;
	$scope.list=list;
	$scope.edit=edit;
	$scope.add=add;
	$scope.cancel=cancel;
	$scope.getModule=getModule;

	$scope.role=null;
	$scope.roles=[];
	
	$scope.moduless=null;
	$scope.moduleList={moduled:[]};

	//get all roles
	function list(){
		RoleService.GetAll()
			.then(function(data){
			if(data){
				$scope.roles=data;
			}else{
				FlashService.Error(data);
			}
		})
			
	}
	function getModule(){
		ModuleService.GetAll().then(function(data){
			if(data){
				$scope.moduless=data;
			}
		})
	}
	function save(role){
		role.modules=$scope.moduleList.moduled;
		RoleService.Create(role)
			.then(function (data) {
	            if (data) {
	                FlashService.Success('create role successful', true);
	                $scope.roles.push(data);
	               	add();
	 
	            } else {
	               FlashService.Error('error');
	            }
	        })
	}

	function search(name){
		RoleService.GetByName(name)
			.then(function(data){
				if(data){
					$scope.roles=data;
				}else{
					FlashService.Error('error not found');
			}
		})
	}

	function update(role){
		role.modules=$scope.moduleList.moduled;
		RoleService.Update(role)
			.then(function(data){
				if(data){
					list();
					add();

				}else{
					FlashService.Error('error update!');
				}
			})
	}

	function del(Role){
		RoleService.Delete(role)
			.then(function(data){
				if(data){
					$scope.roles.splice($scope.roles.indexOf(role),1);
				}else{
					FlashService.Error('error delete!');
				}
			})
	}

	function edit(role){
		$scope.role=role;
		var m=[];
		angular.forEach(role.modules,function(item){
			m.push(item.id);
		})
		$scope.moduleList.moduled=m;

	}
	function add(){
		$scope.role=null;
        $scope.moduleList={moduled:[]}
	}
	function cancel(){
		add();
	}

	//get all list Role
	$scope.list();
	$scope.getModule();

	}