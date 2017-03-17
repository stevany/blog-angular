 angular
        .module('app')
        .factory('ArticleService', ArticleService);

    ArticleService.$inject = ['$http', '$rootScope'];
    function ArticleService($http, $rootScope) {
        var service = {};
        var urlApi=$rootScope.pathServerJSON;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByName= GetByName;
        service.GetByUser= GetByUser;
        service.GetByCategory= GetByCategory;
        service.GetByDateBetween=GetByDateBetween;
        service.GetByNameAndDateBetween=GetByNameAndDateBetween
        service.GetByTag=GetByTag;
        service.GetByUserAndName=GetByUserAndName;
        service.GetByUserAndCategory=GetByUserAndCategory;
        service.GetByUserAndDate=GetByUserAndDate;
        service.GetByUserAndTag=GetByUserAndTag;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll(page,size) {
            return $http.get(urlApi+'/api/article/page/'+page+'/size/'+size).then(handleSuccess, handleError('Error getting all article'));
        }
        function GetByUser(id, page,size) {
            return $http.get(urlApi+'/api/article/user/'+ id + 'page/'+page+'/size/'+size).then(handleSuccess, handleError('Error getting all article'));
        }

        function GetById(id) {
            return $http.get(urlApi+'/api/article/id/' + id).then(handleSuccess, handleError('Error getting article by id'));
        }

        function GetByName(name, page,size) {
            return $http.get(urlApi+'/api/article/name/' +name + '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByCategory(id, page,size) {
            return $http.get(urlApi+'/api/article/category/' + id + '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByDateBetween(d1, d2, page,size) {
            return $http.get(urlApi+'/api/article/d1/' + d1 + '/d2/' + d2 +  '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByNameAndDateBetween(name, d1, d2, page,size) {
            return $http.get(urlApi+'/api/article/name/'+ name +'/d1/' + d1 + '/d2/' + d2 +  '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByTag(tag, page,size) {
            return $http.get(urlApi+'/api/article/tag/' + tag + '/page/' + page + '/size/' +size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByUserAndName(name, userId, page,size) {
            return $http.get(urlApi+'/api/article/name/' +name + '/user/'+userId+ '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByUserAndCategory(id, userId, page,size) {
            return $http.get(urlApi+'/api/article/category/' + id + '/user/'+userId + '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByUserAndDate(date, userId, page,size) {
            return $http.get(urlApi+'/api/article/date/' + date + '/user/'+userId + '/page/' + page + '/size/' + size).then(handleSuccess, handleError('Error get article by name'));
        }
        function GetByUserAndTag(tag, userId, page,size) {
            return $http.get(urlApi+'/api/article/tag/' + tag + '/user/'+userId + '/page/' + page + '/size/' +size).then(handleSuccess, handleError('Error get article by name'));
        }
        function Create(article) {
            return $http.post(urlApi+'/api/article', article).then(handleSuccess, handleError('Error creating article'));
        }

        function Update(article) {
            return $http.put(urlApi+'/api/article/edit/' + article.id, article).then(handleSuccess, handleError('Error updating article'));
        }

        function Delete(id) {
            return $http.delete(urlApi+'/api/article/del/' + id).then(handleSuccess, handleError('Error deleting article'));
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

