/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .controller('loginC', ['$scope', 'loginS', '$meteor', function($scope, loginS, $meteor){
        $scope.login = {};
        
        $scope.doLogin = function() {
            $scope.disabledButtom = true;
            loginS.doLogin($scope.login.id, $scope.login.pw, $scope.login.isAuto)
                .then(null, function(err){
                    $scope.disabledButtom = true;
                    if(err) {
                        $scope.login.error = err.reason;
                    }
                });
        };
    }]);