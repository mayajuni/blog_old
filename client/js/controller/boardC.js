/**
 * Created by 동준 on 2015-07-29.
 */
angular.module('blog')
    .controller('boardListC',['$scope', '$stateParams', function($scope, $stateParams){
        $scope.division = $stateParams.division;
    }])
    .controller('boardDetailC', ['$scope', '$meteor', '$stateParams', 'boardS',
        function($scope, $meteor, $stateParams, boardS) {
            $scope.$meteorSubscribe('getBoardDetail', $stateParams.seq).then(function() {
                $scope.board = $scope.$meteorCollection(Board)[0];

                $scope.$emit('sectionHeaderChange', {board:  $scope.board, isBoard: true});
            });

            $scope.openCreateBoard = function() {
                var scope = $scope.$new();
                scope.division = $scope.board.division;
                boardS.openCreateBoard(scope);
            };
        }])

    .controller('boardCreateC', ['$scope', 'meteorS', 'menuS', '$alert',
        function($scope, meteorS, menuS, $alert) {
            $scope.board = {
                division: $scope.division
            };

            /* 메뉴 가져오기 */
            menuS.getMenu({'$or': [{isBoard: true}, {subMenuList: {$elemMatch: {isBoard: true}}}]}).then(function(menuList) {
                $scope.menuList = menuList;
            });

            $scope.submit = function() {
                meteorS.call('boardSave', $scope.board).then(function() {
                    $alert({content: 'Success Create!', container: '#alerts-container', type: 'success', show: true, duration: '3', animation: 'am-fade-and-slide-top'});
                });
            }
        }])
;