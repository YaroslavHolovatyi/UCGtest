angular.module('usersApplication')
    .service('UsersService',  UsersService); 
    UsersService.$inject = ['$q'] 
    function UsersService($q){
        var self = this;

        self.chosenUser;
        var usersOnServer = [
            {
                username: "BobShilger",
                first_name: "Bob",
                last_name: "Shilger",
                email: "BobShilger@gmail.com",
                password: "12345678",
                user_type: "Admin"
            },
            {
                username: "JimNeo",
                first_name: "Jim",
                last_name: "Neo",
                email: "JimNeo@gmail.com",
                password: "87654321",
                user_type: "Driver"
            },
            {
                username: "ManBig",
                first_name: "Man",
                last_name: "Big",
                email: "ManBig@gmail.com",
                password: "87456321",
                user_type: "Driver"
            },
            {
                username: "JudLo",
                first_name: "Jud",
                last_name: "Lo",
                email: "JudLo@gmail.com",
                password: "87456123",
                user_type: "Driver"
            },
        ];

        self.fetchUsers = function(){
            return $q.when(usersOnServer)
        }

        self.updateUser = function (updatedUser) {
            var existingUser = usersOnServer.find((obj) => {
              return obj.username === updatedUser.username;
            });
          
            if (existingUser) {
              for (var key in updatedUser) {
                if (updatedUser.hasOwnProperty(key) && existingUser.hasOwnProperty(key)) {
                  if (existingUser[key] !== updatedUser[key]) {
                    existingUser[key] = updatedUser[key];
                  }
                }
              }
              return $q.when(existingUser);
            } else {
              return $q.reject('User not found');
            }
          };
        
        self.saveNewUser = function(newUser){
            usersOnServer.push(newUser);
            return $q.when(newUser)
        }
    }