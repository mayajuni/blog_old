/**
 * Created by ���� on 2015-07-22.
 */
angular.module('blog')
    .directive('sectionHeader', function(){
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'client/html/index/sectionHeader.tpl.ng.html',
            controller: ['$scope', function($scope){

                $scope.$on('sectionHeaderChange', function(e, data){
                    $scope.backImg = Math.floor(Math.random() * 9)+1;
                    $scope.data = data;
                })
            }]
        }
    });