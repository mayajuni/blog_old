/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog', [
    'ngAnimate',
    'angular-meteor',
    'ui.router',
    'utils'
])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainCtrl'
                })
                .state('main2', {
                    url: '/main2',
                    templateUrl: 'client/html/main/main.ng.html',
                    controller: 'mainCtrl'
                });

            /*$urlRouterProvider.otherwise('/parties');*/
        }]);