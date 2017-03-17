 angular
        .module('app')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http', '$rootScope'];
    function CategoryService($http, $rootScope) {
        var service = {};
        var urlApi=$rootScope.pathServerJSON;
        service.GetAll = GetAll;
        service.GetPageAll = GetPageAll;


        service.GetById = GetById;
        service.GetByName= GetByName;
        service.GetByPageName= GetByPageName;

        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(urlApi+'/api/category').then(handleSuccess, handleError('Error getting all category'));
        }
        function GetPageAll(page,size) {
            return $http.get(urlApi+'/api/category/page/'+ page+ '/size/'+size).then(handleSuccess, handleError('Error getting all category'));
        }
        
        function GetById(id) {
            return $http.get(urlApi+'/api/category/id/' + id).then(handleSuccess, handleError('Error getting category by id'));
        }

        function GetByName(name) {
            return $http.get(urlApi+'/api/category/name/' +name ).then(handleSuccess, handleError('Error get category by name'));
        }
        function GetByPageName(name, page, size) {
            $http.get(urlApi+'/api/category/name/' +name+ '/page/'+ page+ '/size/'+size).success(function(data){
                console.log(data);
                return data;

            }).error(function(data,status,headers,config){
                return status;
            })

            
        }
        function Create(category) {
            return $http.post(urlApi+'/api/category', category).then(handleSuccess, handleError('Error creating category'));
        }

        function Update(category) {
            return $http.put(urlApi+'/api/category/edit/' + category.id, category).then(handleSuccess, handleError('Error updating category'));
        }

        function Delete(id) {
            return $http.delete(urlApi+'/api/category/del/' + id).then(handleSuccess, handleError('Error deleting category'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

