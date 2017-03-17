 angular
        .module('app')
        .factory('ModuleService', ModuleService);

    ModuleService.$inject = ['$http', '$rootScope'];
    function ModuleService($http, $rootScope) {
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
            return $http.get(urlApi+'/api/module').then(handleSuccess, handleError('Error getting all module'));
        }

        function GetById(id) {
            return $http.get(urlApi+'/api/module/' + id).then(handleSuccess, handleError('Error getting module by id'));
        }

        function GetByName(name) {
            return $http.get(urlApi+'/api/module/name/' +name ).then(handleSuccess, handleError('Error get module by name'));
        }

        function Create(module) {
            return $http.post(urlApi+'/api/module', module).then(handleSuccess, handleError('Error creating module'));
        }

        function Update(module) {
            return $http.put(urlApi+'/api/module/edit/' + module.id, module).then(handleSuccess, handleError('Error updating module'));
        }

        function Delete(id) {
            return $http.delete(urlApi+'/api/module/del/' + id).then(handleSuccess, handleError('Error deleting module'));
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

