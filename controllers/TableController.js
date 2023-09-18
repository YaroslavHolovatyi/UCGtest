
angular.module('usersApplication')
    .controller('TableController', TableController)
    
    TableController.$inject = [ '$scope', 'UsersService', 'ModalsService'];
    
    function TableController($scope, UsersService, ModalsService){
        $scope.users = [];
        

        $scope.$watch(function() {
          return ModalsService.messageVisible;
        }, function(newVal) {
          $scope.showMessage = newVal;
        });

        $scope.getUsers = function() {
          UsersService.fetchUsers()
            .then((response) => {$scope.users = response})
            .catch((err)=>{console.error(err)});
          }

          
          $scope.$watch(function() {
            return ModalsService.modalVisible;
          }, function(newVal) {
            $scope.modalIsVisible = newVal;
          });
          
          $scope.openDialog = function(user, purpose){
            UsersService.chosenUser = Object.assign({}, user);
            ModalsService.modalName = purpose;
            ModalsService.modalVisible = true;
            $scope.modalIsVisible = ModalsService.modalVisible;
          }

          $scope.closeModal = function(){
            ModalsService.modalVisible = false;
          }
          
          $scope.getUsers();


    }

    

