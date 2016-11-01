angular.module('ProfessionalWebsite')
  .controller('ProjectShowController', function(Project, $scope, $routeParams, $location) {
    Project.get({title: $routeParams.title}).$promise.then(function(data) {
        $scope.project = data;
    });

    $scope.delete = function() {
      Project.delete({title: $routeParams.title});
      $location.path('/projects');
    }
  });
