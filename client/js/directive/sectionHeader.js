/**
 * Created by ���� on 2015-07-22.
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
            templateUrl: 'client/templates/index/sectionHeader.ng.html'
        }
    })