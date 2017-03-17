app.factory('getService',['$http','$q',function($http,$q){
  return{
    
    getData:function(url){
      var deferred = $q.defer();
      $http.get(url,{headers: {
    'Content-type': 'application/json'
      }})
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (error) {
            deferred.reject(error);
        });

      return deferred.promise;
    }
    
  }
}]);