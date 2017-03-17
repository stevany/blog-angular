angular
.module('app')
.controller('TagController', TagController);

TagController.$inject=['$scope', 'FlashService', 'TagService'];
function TagController( $scope,  FlashService, TagService){
	$scope.save=save;
	$scope.search=search;
	$scope.update=update;
	$scope.del=del;
	$scope.list=list;
	$scope.edit=edit;
	$scope.add=add;
	$scope.cancel=cancel;

	$scope.tag=null;
	$scope.tags=[];

	//get all tags
	function list(){
		TagService.GetAll()
			.then(function(data){
			if(data){
				$scope.tags=data;
			}else{
				FlashService.Error(data);
			}
		})
			
	}
	function save(tag){

		TagService.Create(tag)
			.then(function (data) {
	            if (data) {
	                FlashService.Success('create Tag successful', true);
	                $scope.tags.push(data);
	                $scope.tag=null;
	            } else {
	               FlashService.Error('error');
	            }
	        })
	}

	function search(name){
		TagService.GetByName(name)
			.then(function(data){
				if(data){
					$scope.tags=data;
				}else{
					FlashService.Error('error not found');
			}
		})
	}

	function update(tag){
		TagService.Update(tag)
			.then(function(data){
				if(data){
					list();
					$scope.tag=null;
				}else{
					FlashService.Error('error update!');
				}
			})
	}

	function del(tag){
		TagService.Delete(tag)
			.then(function(data){
				if(data){
					$scope.tags.splice($scope.tags.indexOf(tag),1);
				}else{
					FlashService.Error('error delete!');
				}
			})
	}

	function edit(tag){
		$scope.tag=tag;

	}
	function add(){
		$scope.tag=null;
	}
	function cancel(){
		$scope.Tag=null;
	}

	//get all list tag
	$scope.list();

	}