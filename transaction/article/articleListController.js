angular
.module('app')
.controller('ArticleListController', ArticleListController);

ArticleListController.$inject=['$scope', '$location','$filter','FlashService', 'ArticleService'];
function ArticleListController( $scope,  $location, $filter ,FlashService, ArticleService){
	
	$scope.search=search;
	
	$scope.list=list;
	$scope.edit=edit;
	$scope.add=add;
	$scope.find=find;
	$scope.search=search;
	$scope.del=del;
	$scope.cancel=cancel;

	$scope.articles=[];
	$scope.categories=[];

	$scope.isFind=false;
	$scope.d1=new Date();
	$scope.d2=new Date();
	$scope.name='';

	// Paging
	$scope.totalItems=0;
	$scope.itemsPerPage= 10;
	$scope.currentPage = 1;
	$scope.totalPages=0;
	

	//get all articles
	function list(){
		ArticleService.GetAll($scope.currentPage,$scope.itemsPerPage)
			.then(function(data){

			if(data){
				$scope.articles=data.content;
				$scope.articles.tags=null;
				$scope.totalItems=data.totalElements;
				$scope.totalPages=data.totalPages;
			}else{
				FlashService.Error(data);
			}
		})
			
	}
	$scope.onPaginate = function(page, limit) {
		console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
		console.log('Page: ' + page + ' Limit: ' + limit);	
	};

	function find(){
		if($scope.d1==undefined && $scope.d2==undefined){
			//find by name only
			if($scope.name!==' '){
				ArticleService.GetByName($scope.name,$scope.currentPage,$scope.itemsPerPage)
				.then(function(data){
					if(data.content){
						$scope.articles=data.content;
						$scope.totalItems=data.totalElements;
						$scope.totalPages=data.totalPages;
					}else{
						FlashService.Error('error not found');
				}
				})	

			}else{
				FlashService.Error('No searching word! Fill the searching word or the date please');
			}

		}else{
			var vd1 = $filter('date')($scope.d1,'yyyy-MM-dd');
			var vd2 = $filter('date')($scope.d2,'yyyy-MM-dd');

			if($scope.name== '' || $scope.name==null || $scope.name==undefined){
				//find article by date between only
				ArticleService.GetByDateBetween(vd1, vd2, $scope.currentPage,$scope.itemsPerPage)
				.then(function(data){
					if(data){
			
						$scope.articles=data.content;
						// $scope.totalItems=response.totalElements;
						// $scope.totalPages=response.totalPages;
					}else{
						FlashService.Error('error not found');
				}
				})	
			}else{
				//find article by name and date between

				ArticleService.GetByNameAndDateBetween($scope.name, vd1, vd2, $scope.currentPage,$scope.itemsPerPage)
				.then(function(data){
					if(data){
						$scope.articles=data;
						$scope.totalItems=data.totalElements;
						$scope.totalPages=data.totalPages;
					}else{
						FlashService.Error('error not found');
				}
				})	
			}
		}
		
	}

	function del(article){
	ArticleService.Delete(article)
		.then(function(data){
			if(data){
				$scope.categories.splice(scope.articles.indexOf(article),1);
			}else{
				FlashService.Error('error delete!');
			}
		})
	}

	function edit(article){
		$location.path('/article/detail/'+article.id);

	}
	function add(){
		alert('masuk');
		$location.path('/article/detail/new');
	}

	function search(){
		$scope.isFind=true;
	}

	function cancel(){
		$scope.isFind=false;
	}
	

	//get all list Article
	$scope.list();

	}