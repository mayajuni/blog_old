/**
 * Created by 동준 on 2015-07-25.
 */
angular.module('blog')
    .directive('boardList', function(){
        return {
            restrict: 'AE',
            scope: {
                division: '@',
                view: '@'
            },
            templateUrl: 'client/html/board/boardList.tpl.ng.html',
            controller: ['$scope', '$meteor', function($scope, $meteor){
                var params = {
                    division: $scope.division,
                    view: $scope.view
                };

                $scope.getBoardList = function(page) {
                    params.page = page;
                    $scope.boardList = $meteor.collection(Board).subscribe('getBoardList', params);
                };

                $scope.getBoardList(1);
            }]
        }
    });