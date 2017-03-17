 angular
        .module('app')
        .factory('RoleService', RoleService);

    RoleService.$inject = ['$http', '$rootScope'];
    function RoleService($http, $rootScope) {
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
            return $http.get(urlApi+'/api/role').then(handleSuccess, handleError('Error getting all role'));
        }

        function GetById(id) {
            return $http.get(urlApi+'/api/role/' + id).then(handleSuccess, handleError('Error getting role by id'));
        }

        function GetByName(name) {
            return $http.get(urlApi+'/api/role/name/' +name ).then(handleSuccess, handleError('Error get role by name'));
        }

        function Create(role) {
            return $http.post(urlApi+'/api/role', role).then(handleSuccess, handleError('Error creating role'));
        }

        function Update(role) {
            return $http.put(urlApi+'/api/role/edit/' + role.id, role).then(handleSuccess, handleError('Error updating role'));
        }

        function Delete(id) {
            return $http.delete(urlApi+'/api/role/del/' + id).then(handleSuccess, handleError('Error deleting role'));
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

