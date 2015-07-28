/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .controller('loginC', ['$scope', '$meteor', 'ngDialog', function($scope, $meteor, ngDialog){
        $scope.login = {};
        $scope.doLogin = function() {
            $meteor.loginWithPassword($scope.login.id, $scope.login.pw).then(function () {
                ngDialog.closeAll();
            }, function(err) {
                if(err) {
                    $scope.login.error = err.reason;
                }
            });
        };
    }]);