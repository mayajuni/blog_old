/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .controller('loginC', ['$scope', '$meteor', 'loginS', function($scope, $meteor, loginS){
        $scope.login = {};
        $scope.showButtom = true;
        $scope.doLogin = function() {
            $scope.showButtom = false;
            $meteor.loginWithPassword($scope.login.id, $scope.login.pw).then(function () {
                loginS.closeLoginModal();
            }, function(err) {
                $scope.showButtom = true;
                if(err) {
                    $scope.login.error = err.reason;
                }
            });
        };
    }]);