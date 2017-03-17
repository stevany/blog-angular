 angular
        .module('app')
        .factory('DiscussionService', DiscussionService);

    DiscussionService.$inject = ['$http', '$rootScope'];
    function DiscussionService($http, $rootScope) {
        var service = {};
        var urlApi=$rootScope.pathServerJSON;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUser= GetByUser;
        service.GetByUserAndArticle= GetByUserAndArticle;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll(articleId, page,size) {
            return $http.get(urlApi+'/api/article/'+ articleId+ '/discussion/page/'+page+'/size/'+size).then(handleSuccess, handleError('Error getting all discussion'));
        }
        function GetByUser(id, page,size) {
            return $http.get(urlApi+'/api/article/discussion/user/'+ id + '/page/'+page+'/size/'+size).then(handleSuccess, handleError('Error getting all discussion'));
        }

        function GetById(articleId, id) {
            return $http.get(urlApi+'/api/article/'+articleId+'/discussion/' + id).then(handleSuccess, handleError('Error getting discussion by id'));
        }

        function GetByUserAndArticle(articleId, userId, page,size) {
            return $http.get(urlApi+'/api/article/'+articleId +'/discussion/name/' +name + '/user/'+userId+ '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get discussion by name'));
        }
       
        function Create(discussion) {
            return $http.post(urlApi+'/api/article/'+discussion.articleId+'/discussion', discussion).then(handleSuccess, handleError('Error creating discussion'));
        }

        function Update(discussion) {
            return $http.put(urlApi+'/api/article/'+discussion.articleId+'/discussion/edit/' + discussion.id, discussion).then(handleSuccess, handleError('Error updating discussion'));
        }

        function Delete(articleId, id) {
            return $http.delete(urlApi+'/api/article/'+articleId+'/discussion/del/' + id).then(handleSuccess, handleError('Error deleting discussion'));
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

