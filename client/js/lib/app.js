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
    'ngFileUpload',
    'textAngular',
    'utils'
])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 'paginationTemplateProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider, paginationTemplateProvider){
            /* 페이징 tpl */
            paginationTemplateProvider.setPath('client/html/pagination/pagination.tpl.ng.html');

            /* html5 모드 */
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainC'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainC'
                })
                .state('board', {
                    url: '/board/:division',
                    templateUrl: 'client/html/board/boardList.ng.html',
                    controller: 'boardListC'
                })
                .state('boardDetail', {
                    url: '/board/:division/detail/:seq',
                    templateUrl: 'client/html/board/boardDetail.ng.html',
                    controller: 'boardDetailC'
                })
            ;

            $urlRouterProvider.otherwise('/');
        }])
    .run(['loginS', function(loginS) {
        loginS.processingAutoLogin();
    }])
;