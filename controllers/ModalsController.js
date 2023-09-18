angular.module('usersApplication')
    .controller('ModalsController', ModalsController)
    ModalsController.$inject = ['$scope', 'ModalsService'];

    function ModalsController($scope, ModalsService){

        $scope.$watch(function() {
            return ModalsService.messageName;
          }, function(newVal) {
            $scope.messageName = newVal;
          });

          $scope.$watch(function() {
            return ModalsService.isError;
          }, function(newVal) {
            $scope.isError = newVal;
          });
    }