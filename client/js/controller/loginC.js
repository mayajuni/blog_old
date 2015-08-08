/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .controller('loginC', ['$scope', 'loginS', function($scope, loginS){
        $scope.login = {};
        $scope.showButtom = true;
        $scope.doLogin = function() {
            $scope.showButtom = false;
            loginS.doLogin($scope.login.id, $scope.login.pw, $scope.login.isAuto)
                .then(null, function(err){
                    $scope.showButtom = true;
                    if(err) {
                        $scope.login.error = err.reason;
                    }
                });
        };

        $scope.logout = function() {
            loginS.logout();
        };

        $scope.tokenlogin = function() {
            $meteor.call('getToken', 'mayajuni').then(function(data) {
                console.log(data);
                Accounts.loginWithToken(data, function(error, data){
                    console.log(error);
                });
            });
        };

        $scope.join = function() {
            $meteor.createUser({username:'mayajuni', password:'dkssud12', email:'mayajuni10@gmail.com'});
        }
    }]);