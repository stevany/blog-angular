angular
.module('app')
.controller('CategoryController', CategoryController);

CategoryController.$inject=['$scope', 'FlashService', 'CategoryService'];
function CategoryController( $scope,  FlashService, CategoryService){
	$scope.save=save;
	$scope.search=search;
	$scope.update=update;
	$scope.del=del;
	$scope.list=list;
	$scope.edit=edit;
	$scope.add=add;
	$scope.cancel=cancel;

	$scope.category=null;
	$scope.categories=[];

	//get all categories
	function list(){
		CategoryService.GetAll()
			.then(function(data){
			if(data){
				$scope.categories=data;
			}else{
				FlashService.Error(data);
			}
		})
			
	}
	function save(category){

		CategoryService.Create(category)
			.then(function (data) {
	            if (data) {
	                FlashService.Success('create category successful', true);
	                $scope.categories.push(data);
	                $scope.category=null;
	            } else {
	               FlashService.Error('error');
	            }
	        })
	}

	function search(name){
		
		CategoryService.GetByName(name)
			.then(function(data){
				if(data){
					$scope.categories=data;
				}else{
					FlashService.Error('error not found');
			}
		})
	}

	function update(category){
		CategoryService.Update(category)
			.then(function(data){
				if(data){
					list();
					$scope.category=null;
				}else{
					FlashService.Error('error update!');
				}
			})
	}

	function del(category){
		CategoryService.Delete(category)
			.then(function(data){
				if(data){
					$scope.categories.splice($scope.categories.indexOf(category),1);
				}else{
					FlashService.Error('error delete!');
				}
			})
	}

	function edit(category){
		$scope.category=category;

	}
	function add(){
		$scope.category=null;
	}
	function cancel(){
		$scope.category=null;
	}

	//get all list category
	$scope.list();

	}