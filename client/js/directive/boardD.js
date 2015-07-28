/**
 * Created by 동준 on 2015-07-25.
 */
angular.module('blog')
    .directive('boardList', function(){
        return {
            restrict: 'AE',
            scope: {
                division: '@',
                perPage: '@'
            },
            templateUrl: 'client/html/board/boardList.tpl.ng.html',
            controller: ['$scope', '$meteor', function($scope, $meteor){
                $scope.perPage = !$scope.perPage ? 10 : $scope.perPage;

                $scope.pageChanged = function(page) {
                    $scope.page = page;
                };

                $scope.boardList = $meteor.collection(function() {
                    return Board.find({}, {sort: {regDt : -1}});
                });


                $meteor.autorun($scope, function() {
                    $meteor.subscribe('getBoardList', {
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                        sort: {regDt : -1}
                    }).then(function(){
                        $scope.totalCount = $meteor.object(Counts ,'boardTotalCount', false).count;
                    });
                });
            }]
        }
    });