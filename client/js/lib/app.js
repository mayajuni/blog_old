/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog', [
    'ngAnimate',
    'angular-meteor',
    'ui.bootstrap',
    'ngDialog',
    'angularUtils.directives.dirPagination',
    'ui.router',
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
                .state('main2', {
                    url: '/main2',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainC'
                })
                .state('1', {
                    url: '/1',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainC'
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
        }]);