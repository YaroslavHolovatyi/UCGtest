angular.module('usersApplication')
    .service('ModalsService', ModalsService);
    
    ModalsService.$inject = ['$timeout'];

    function ModalsService($timeout){
        var self = this;
        self.modalVisible = false;
        self.modalName = true;
        self.messageVisible = false;
        self.messageName = '';
        self.isError = false;

        self.showMessage = function(message, error){
            self.messageVisible = true;
            self.messageName = message;
            self.isError = error;

            $timeout(function() {
                self.hideMessage();
              }.bind(self), 3000);
        }

        self.hideMessage = function(){
            self.messageVisible = false;
            self.messageName = '';
            self.isError = false;
        }
    }