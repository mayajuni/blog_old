/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .factory('loginS', ['ngDialog', '$meteor', function(ngDialog, $meteor) {
        return {
            openLoginModal: function(){
                ngDialog.open({
                    template: 'client/html/account/login.tpl.ng.html',
                    controller: 'loginC',
                    className: 'ngdialog-theme-default ngdialog-theme-custom'
                });
            },
            logout: function() {
                $meteor.logout();
            }
        }
    }]);