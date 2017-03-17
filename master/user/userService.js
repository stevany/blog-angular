 angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope'];
    function UserService($http, $rootScope) {
        var service = {};
        var urlApi=$rootScope.pathServerJSON;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsernameAndPassword = GetByUsernameAndPassword;
        service.GetByUsername=GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(urlApi+'/api/user').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(urlApi+'/api/user/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsernameAndPassword(username, password) {
            return $http.get(urlApi+'/api/user/name/' + username + '/password/' + password).then(handleSuccess, handleError('Error login'));
        }
         function GetByUsername(username) {
            return $http.get(urlApi+'/api/user/name/' + username ).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post(urlApi+'/api/user', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put(urlApi+'/api/user/edit/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(urlApi+'/api/user/del/' + id).then(handleSuccess, handleError('Error deleting user'));
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

