
angular.module('usersApplication')
    .controller('UsersController', UsersController)
    UsersController.$inject = ['$scope', 'UsersService', 'ModalsService'];

    function UsersController($scope, UsersService, ModalsService){
        $scope.usernameTaken = false;
        $scope.repeatPassword = '';
        $scope.emailTaken = false;
        $scope.passwordsMatch = false;
        $scope.showMessage = ModalsService.messageVisible;
        $scope.allUsers = [];

        $scope.$watch(function() {
          return ModalsService.modalName;
        }, function(newVal) {
          $scope.typeOfModal = newVal;
        });

        $scope.$watch(function() {
          return UsersService.chosenUser;
        }, function(newVal) {
          $scope.chosenUser = newVal;
        });

        $scope.checkUsername = function() {
            if( $scope.allUsers.find((element)=>{element.username === $scope.chosenUser.username;})){
                return this.usernameTaken = true;
            }else{
                return
            }
            
          };
      
          $scope.checkEmail = function() {
            if( $scope.allUsers.find((element)=>{element.email === $scope.chosenUser.email;})){
                return this.emailTaken = true;
            }else{
                return
            }
          };

          $scope.getAllUsers = function(){
            UsersService.fetchUsers()
            .then((res)=> $scope.allUsers = res)
            .catch((err)=> console.error(err))
          }

          $scope.checkPasswords = function() {
            if ($scope.chosenUser.password !== $scope.repeatPassword) {
              $scope.passwordsMatch = false;
            } else {
              $scope.passwordsMatch = true;
            }
          };
      
          $scope.submitForm = function() {
            if(ModalsService.modalName === true){
              UsersService.saveNewUser($scope.chosenUser)
              .then((response => console.log('User added successfully:', response)))
              .then($scope.modalClose())
              .then(ModalsService.showMessage('Success, user was created', false))
              .catch(function(err){
                if(err.status === 404){
                  ModalsService.showMessage('404 Not Found', true)
                }else if( err.status === 403){
                  ModalsService.showMessage('403 Forbidden', true)
                }else{
                  console.log('Error on saving user', err)
                }
              });
            }else{
              UsersService.updateUser($scope.chosenUser)
              .then((response => console.log('User updated successfully:', response)))
              .then($scope.modalClose())
              .then(ModalsService.showMessage('Success, user was updated', false))
              .catch(function(err){
                if(err.status === 404){
                  ModalsService.showMessage('404 Not Found', true)
                }else if( err.status === 403){
                  ModalsService.showMessage('403 Forbidden', true)
                }else{
                  console.log('Error on updating user', err)
                }
              });
            }
          };

          $scope.modalClose = function(){
            ModalsService.modalVisible = false;
          }

          $scope.getAllUsers();
      
    }