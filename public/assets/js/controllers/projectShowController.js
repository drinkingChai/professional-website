angular.module('ProfessionalWebsite')
  .controller('ProjectShowController', function(Project, $scope, $routeParams, $location) {
    $scope.project = new Project;
    Project.get({title: $routeParams.title}).$promise.then(function(data) {
      Object.assign($scope.project, data);
    });

    $scope.delete = function(project) {
      project.$delete().then(function() {
        $location.path('/projects');
      })
    }
  });
