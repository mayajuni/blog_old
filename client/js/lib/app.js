/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog', [
    'ngAnimate',
    'angular-meteor',
    'mgcrea.ngStrap',
    'angularUtils.directives.dirPagination',
    'ngSanitize',
    'ui.router',
    'storage',
    'utils'
])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 'paginationTemplateProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider, paginationTemplateProvider){
            paginationTemplateProvider.setPath('client/html/pagination/pagination.tpl.ng.html');

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainC'
                })
                .state('board', {
                    url: '/board/:division',
                    templateUrl: 'client/html/board/boardList.ng.html',
                    controller: 'boardC'
                })
                .state('4', {
                    url: '/4',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainC'
                })
                .state('3', {
                    url: '/3',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainC'
                });

            /*$urlRouterProvider.otherwise('/parties');*/
        }])
    .run(['loginS', function(loginS) {
        loginS.processingAutoLogin();
    }])
;