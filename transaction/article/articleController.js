angular
.module('app')
.controller('ArticleController', ArticleController);

ArticleController.$inject=['$rootScope','$scope', '$location','$routeParams', 'FlashService','CategoryService', 'TagService','ArticleService', 'DiscussionService' ];
function ArticleController( $rootScope, $scope,  $location, $routeParams , FlashService, CategoryService, TagService, ArticleService, DiscussionService){
	$scope.startModule=startModule;
	$scope.addArticle=addArticle;
	$scope.saveArticle=saveArticle;
	$scope.updateArticle=updateArticle;
	$scope.cancelArticle=cancelArticle;


	$scope.saveDiscussion=saveDiscussion;
	$scope.updateDiscussion=updateDiscussion;
	$scope.list=list;
	// $scope.editDiscussion=editDiscussion;
	$scope.addDiscussion=addDiscussion;
	$scope.cancelDiscussion=cancelDiscussion;

	$scope.getCategories=getCategories;
	$scope.getTags=getTags;
	$scope.getCategory=getCategory;

	$scope.article=null;
	$scope.discussion=null;
	$scope.discusses=null;
	$scope.categories=null;
	$scope.tagss=null;
	$scope.tagList={tagged:[]};

	// Paging
	$scope.totalItems=0;
	$scope.itemsPerPage= 10;
	$scope.currentPage = 1;
	$scope.totalPages=0;


	function startModule(){
		var param=$routeParams.id;
		getCategories();
		getTags();

		if(param=='new'){
			$scope.article=null;
			$scope.discussion=null;
		}else{
			ArticleService.GetById(param)
				.then(function(data){
					if(data){					
						$scope.article=data;
						getCategory(data.category);
						$scope.tagList.tagged=data.tags;
					}else{
						FlashService.Error('error');
					}
				})
			//get discussess
			list(param);	
		}	
	
	}

	function getCategories(){
	    CategoryService.GetPageAll(1,15).then(function (response) {
	        $scope.categories=response.content;
	    })
		
	}

	function getTags(){
		TagService.GetAll().then(function(data){
			if(data){
				$scope.tagss=data;
			}
		})
	}

	function getCategory(id){
		CategoryService.GetById(id).then(function(response){
			console.log(response);
			$scope.article.category=response;	
		})
	}

	function addArticle(){
		$scope.article=null;
		$scope.discussion=null;
		$scope.tagList={tagged:[]}


	}

	function saveArticle(article){
		article.userCreated=$rootScope.globals.currentUser.user;
		article.category=article.category.id;
		article.tags=$scope.tagList.tagged;
		ArticleService.Create(article)
			.then(function (data) {
	            if (data) {
	                FlashService.Success('create article successful', true);
	                $scope.article.id=data.id;
	                getCategory(data.category);
	            } else {
	               FlashService.Error('error');
	            }
	        })
	}

	function updateArticle(article){
		article.tags=$scope.tagList.tagged;
		article.userCreated=article.userCreated;
		article.userUpdate=$rootScope.globals.currentUser.user;
		article.category=$scope.article.category;
		ArticleService.Update(article)
			.then(function(data){
				if(data){
					getCategory(data.category);
					FlashService.Success('Success update!');
				}else{
					FlashService.Error('error update!');
				}
			})
	}


	function cancelArticle(){
		$scope.article=null;
		$location.path('/article');
	}

	function addDiscussion(){
		$scope.discuss=null;
	}


	function cancelDiscussion(){
		$scope.discussion=null;
	}


	function list(id){
		DiscussionService.GetAll(id, $scope.currentPage,$scope.itemsPerPage)
			.then(function(data){
			if(data){
				$scope.discusses=data.content;
				$scope.totalItems=data.totalElements;
				$scope.totalPages=data.totalPages;
			}else{
				FlashService.Error(data);
			}
		})
			
	}

	function saveDiscussion(discussion){
		//check if article already created, if not then user can't save discussion
		if($scope.article.id==null){
			return false
		}else{
			discussion.userId=$rootScope.globals.currentUser.user;
			discussion.articleId=$scope.article.id
			discussion.dateCreated=new Date()

			DiscussionService.Create(discussion)
				.then(function (data) {
		            if (data) {
		                FlashService.Success('create discussion successful', true);
		                $scope.discusses.push(data.content);
		                $scope.discussion=null;
		            } else {
		               FlashService.Error('error');
		            }
		        })
		}
	}

	
	function updateDiscussion(discussion){
		discussion.userId=$rootScope.globals.currentUser.user;

		DiscussionService.Update(discussion)
			.then(function(data){
				if(data){
					list(discussion.id);
					$scope.discussion=null;
				}else{
					FlashService.Error('error update!');
				}
			})
	}

	//start module
	$scope.startModule();

}
