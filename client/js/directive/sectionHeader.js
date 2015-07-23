/**
 * Created by µø¡ÿ on 2015-07-22.
 */
angular.module('blog')
    .directive('sectionHeader', function(){
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                title: '@',
                subTitle: '@'
            },
            templateUrl: 'client/html/index/sectionHeader.tpl.ng.html'
        }
    })