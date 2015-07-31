/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .factory('loginS', ['$modal', '$meteor', '$rootScope', '$state', '$localStorage', 'autoLogin',
        function($modal, $meteor, $rootScope, $state, $localStorage, autoLogin) {
            var loginModel = $modal({templateUrl: 'client/html/account/login.tpl.ng.html', show: false, controller: 'loginC'});
            return {
                openLoginModal: function() {
                    loginModel.$promise.then(loginModel.show);
                },
                closeLoginModal: function() {
                    loginModel.$promise.then(loginModel.hide);
                },
                processingAutoLogin: function() {
                    $meteor.call('getClientIP').then(function(data){
                        console.log(data);
                    });
                    if($rootScope.loggingIn) {
                        var key = autoLogin + $rootScope.currentUser.username;
                        var autoLogin = $localStorage.get(key);
                        if(!!autoLogin) {
                            $meteor.call('serverSessionSet', key, autoLogin);
                        }
                    }
                },
                logout: function() {
                    $meteor.logout();
                }
            }
        }]);