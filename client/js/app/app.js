/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog', [
    'angular-meteor',
    'ui.router'
])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'client/html/main/main.ng.html'
                });

            $urlRouterProvider.otherwise('/parties');
        }]);