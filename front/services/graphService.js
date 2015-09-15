angular.module("graph").factory('graphService', function ($http) {
  return {
    get: function () {
      return $http({
        url: '/api/get',
        method: 'get'
      });
    }
  };
});
