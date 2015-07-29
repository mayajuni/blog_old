/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .factory('loginS', ['$modal', '$meteor', '$rootScope', '$state', function($modal, $meteor, $rootScope, $state) {
        var loginModel = $modal({templateUrl: 'client/html/account/login.tpl.ng.html', show: false, controller: 'loginC'});
        return {
            openLoginModal: function(){
                loginModel.$promise.then(loginModel.show);
            },
            closeLoginModal: function(){
                loginModel.$promise.then(loginModel.hide);
            },
            logout: function() {
                $meteor.logout();
            }
        }
    }]);