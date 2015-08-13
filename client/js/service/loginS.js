/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .factory('loginS', ['$modal', '$meteor', '$rootScope', '$localStorage', '$sessionStorage', '$q',
        function($modal, $meteor, $rootScope, $localStorage, $sessionStorage, $q) {
            var loginModel = $modal({templateUrl: 'client/html/account/login.tpl.ng.html', show: false, controller: 'loginC'});
            var service = {
                openLoginModal: function() {
                    loginModel.$promise.then(loginModel.show);
                },
                processingAutoLogin: function() {
                    $meteor.logout().then(function(){
                        var token = $localStorage.get('token') || $sessionStorage.get('token') || false;

                        if(!!token) {
                            Accounts.loginWithToken(token, function(error){
                                if(error) {
                                    console.log(error);
                                    $sessionStorage.clear();
                                    $localStorage.clear();
                                    return;
                                }

                                if(!$sessionStorage.get('token')) {
                                    $sessionStorage.set('token', token);
                                }
                            });
                        }
                    });
                },
                doLogin : function(id, pw, isAuto) {
                    var deferred  = $q.defer();

                    $meteor.loginWithPassword(id, pw).then(
                        function () {
                            $meteor.call('getToken').then(function(token) {
                                if(isAuto) {
                                    $localStorage.set('token', token);
                                }

                                $sessionStorage.set('token', token);
                            });

                            loginModel.$promise.then(loginModel.hide);
                        },
                        function(err){
                            deferred.reject(err);
                        });

                    return deferred.promise;
                },
                logout: function() {
                    $sessionStorage.clear();
                    $localStorage.clear();
                    $meteor.logout();
                },
                isLogin: function() {
                    return $rootScope.loggingIn;
                }
            };

            return service;
        }]);