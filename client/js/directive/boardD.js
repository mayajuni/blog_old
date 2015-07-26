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
                $scope.view = !$scope.view ? 10 : $scope.view;
                $scope.currentPage = 1;

                var params = {
                    division: $scope.division,
                    view: $scope.view
                };

                $scope.getBoardList = function() {
                    params.page = $scope.currentPage;
                    $scope.boardList = $meteor.collection(Board).subscribe('getBoardList', params);
                    $scope.totalCount = $meteor.collection(Board).subscribe('getTotalCount', params.division);
                };

                $scope.pageChanged = function() {
                    $scope.getBoardList();
                };

                $scope.getBoardList();
            }]
        }
    });