var app=angular.module('app', [
  'ngMaterial',
  'ngAnimate',
  'ngRoute',
  'ngCookies',
  'md.data.table',
  'checklist-model'
 
   ])
app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider',
  function($routeProvider, $locationProvider, $mdThemingProvider) {
  $routeProvider
      .when('/', {
       templateUrl: 'home/home.html',

      })
      .when('/login',{
        templateUrl:'login/login.html',
        controller:'LoginController'
      })
      .when('/category',{
        templateUrl:'master/category/category.html',
        controller:'CategoryController'
      })
      .when('/tag',{
        templateUrl:'master/tag/tag.html',
        controller:'TagController'
      })
      .when('/user',{
        templateUrl:'master/user/user.html',
        controller:'UserController'
      })
      .when('/user',{
        templateUrl:'master/user/user.html',
        controller:'UserController'
      })
      .when('/role',{
        templateUrl:'master/role/role.html',
        controller:'RoleController'
      })
      .when('/module',{
        templateUrl:'master/module/module.html',
        controller:'ModuleController'
      })
      .when('/article',{
        templateUrl:'transaction/article/articleList.html',
        controller:'ArticleListController'
      })
      .when('/article/detail/:id',{
        templateUrl:'transaction/article/article.html',
        controller:'ArticleController'
      })
      .otherwise({ redirectTo: '/login' });
     
    //theme 
    // $mdThemingProvider.theme('default')
    // .dark();

    }])

app.run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.pathServerJSON='http://localhost:8080';
        $rootScope.globals = $cookies.getObject('globals') || {};
        $rootScope.isLogIn=false;
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/user']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            $rootScope.isLogIn=loggedIn==null?false:true;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }])

app.controller('appController',
      function($scope, $mdSidenav, $rootScope, $location){

        $scope.toggleLeft=function(){
        $mdSidenav('left').toggle()
          .then(function(){

          });
        }

        function closeMenu(){
        $mdSidenav('left')
              .close()
                .then(function () {
                  //$log.debug("toggle " + navID + " is done");
                }); 
      }
      $scope.category=function(){
          closeMenu();
          $location.path('/category');
      }

      $scope.tag=function(){
          closeMenu();
          $location.path('/tag');
      }

      $scope.user=function(){
          closeMenu();
          $location.path('/user');
      }
      $scope.role=function(){
          closeMenu();
          $location.path('/role');
      }
      $scope.module=function(){
          closeMenu();
          $location.path('/module');
      }

      $scope.article=function(){
          closeMenu();
          $location.path('/article');
      }
      $scope.logout=function(){
       
        $location.path('/login');
      }
  })

  


  
