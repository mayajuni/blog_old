/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .factory('loginS', ['$modal', '$meteor', '$rootScope', '$state', '$localStorage', '$sessionStorage',
        function($modal, $meteor, $rootScope, $state, $localStorage, $sessionStorage) {
            var loginModel = $modal({templateUrl: 'client/html/account/login.tpl.ng.html', show: false, controller: 'loginC'});
            return {
                openLoginModal: function() {
                    loginModel.$promise.then(loginModel.show);
                },
                closeLoginModal: function() {
                    loginModel.$promise.then(loginModel.hide);
                },
                processingAutoLogin: function() {
                    console.log('local = ' + $localStorage.get('token'));
                    console.log('session = ' + $sessionStorage.get('token'));
                    var token = $localStorage.get('token') || $sessionStorage.get('token') || false;
                    console.log(token);
                    if(!!token) {
                        Accounts.loginWithToken(token);
                        if(!$sessionStorage.get('token')) {
                            $sessionStorage.set('token', token);
                        }
                    }
                },
                logout: function() {
                    $sessionStorage.clear();
                    $localStorage.clear();
                    $meteor.logout();
                },
                isLogin: function() {
                    return $rootScope.loggingIn;
                }
            }
        }]);