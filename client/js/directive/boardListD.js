/**
 * Created by 동준 on 2015-07-25.
 */
angular.module('blog')
    .directive('boardList', function(){
        return {
            restrict: 'AE',
            scope: {
                division: '@',
                perPage: '@',
                search: '@'
            },
            templateUrl: 'client/html/board/boardList.tpl.ng.html',
            controller: ['$scope', '$meteor', 'boardS', function($scope, $meteor, boardS){
                $scope.perPage = !$scope.perPage ? 10 : $scope.perPage;

                $scope.pageChanged = function(page) {
                    $scope.page = page;
                };

                $scope.boardList = $scope.$meteorCollection(function() {
                    return Board.find({}, {sort: {regDt : -1}});
                }, false);

                $scope.openCreateBoard = function() {
                    var scope = $scope.$new();
                    scope.division = $scope.division;
                    boardS.openCreateBoard(scope);
                };

                $meteor.autorun($scope, function() {
                    $scope.$meteorSubscribe('getBoardList', {
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                        sort: {regDt : -1}
                    }, {
                        search: $scope.getReactively('search'),
                        division: $scope.getReactively('division')
                    }).then(function(){
                        $scope.totalCount = $meteor.object(Counts ,'boardTotalCount', false).count;
                    });
                });
            }]
        }
    });