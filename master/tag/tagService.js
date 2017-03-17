 angular
        .module('app')
        .factory('TagService', TagService);

    TagService.$inject = ['$http', '$rootScope'];
    function TagService($http, $rootScope) {
        var service = {};
        var urlApi=$rootScope.pathServerJSON;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByName= GetByName;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(urlApi+'/api/tag').then(handleSuccess, handleError('Error getting all tag'));
        }

        function GetById(id) {
            return $http.get(urlApi+'/api/tag/' + id).then(handleSuccess, handleError('Error getting tag by id'));
        }

        function GetByName(name) {
            return $http.get(urlApi+'/api/tag/name/' +name ).then(handleSuccess, handleError('Error get tag by name'));
        }

        function Create(tag) {
            return $http.post(urlApi+'/api/tag', tag).then(handleSuccess, handleError('Error creating tag'));
        }

        function Update(tag) {
            return $http.put(urlApi+'/api/tag/edit/' + tag.id, tag).then(handleSuccess, handleError('Error updating tag'));
        }

        function Delete(id) {
            return $http.delete(urlApi+'/api/tag/del/' + id).then(handleSuccess, handleError('Error deleting tag'));
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

