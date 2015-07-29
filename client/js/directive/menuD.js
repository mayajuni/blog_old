/**
 * Created by 동준 on 2015-07-24.
 */
angular.module('blog')
    .directive('menuBoxRight', function(){
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'client/html/menu/menu.tpl.ng.html',
            controller: 'menuC'
            }
        });