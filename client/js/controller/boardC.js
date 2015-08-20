/**
 * Created by 동준 on 2015-07-29.
 */
angular.module('blog')
    .controller('boardListC',['$scope', '$stateParams', function($scope, $stateParams){
        $scope.division = $stateParams.division;
    }])
    .controller('boardDetailC', ['$scope', '$meteor', '$stateParams', 'boardS', 'meteorS', '$state', '$dropdown',
        function($scope, $meteor, $stateParams, boardS, meteorS, $state, $dropdown) {
            var division = '';
            $scope.$meteorSubscribe('getBoardDetail', $stateParams.seq).then(function() {
                $scope.board = $scope.$meteorCollection(Board, false)[0];
                division = $scope.board.division;
                $scope.$emit('sectionHeaderChange', {board:  $scope.board, isBoard: true});
            });

            $scope.openCreateBoard = function() {
                var scope = $scope.$new();
                scope.division = division;
                boardS.openCreateBoard(scope);
            };

            $scope.openEditBoard = function() {
                var scope = $scope.$new();
                scope.boardDetail = $scope.board;
                boardS.openCreateBoard(scope);
            };

            $scope.deleteBoard = function() {
                if(!confirm('Delete?')){
                    return;
                }
                meteorS.call('boardDelete', $scope.board).then(function() {
                    $state.go('board', {division: division});
                });
            };
        }])

    .controller('boardCreateC', ['$scope', 'meteorS', 'menuS', '$alert',
        function($scope, meteorS, menuS, $alert) {
            if($scope.boardDetail) {
                $scope.board = {
                    _id: $scope.boardDetail._id,
                    title: $scope.boardDetail.title,
                    content: $scope.boardDetail.content,
                    fileList: $scope.boardDetail.fileList,
                    division: $scope.boardDetail.division
                };
            } else {
                $scope.board = {
                    division: $scope.division
                };
            }

            /* 메뉴 가져오기 */
            menuS.getMenu({'$or': [{isBoard: true}, {subMenuList: {$elemMatch: {isBoard: true}}}]}).then(function(menuList) {
                $scope.menuList = menuList;
            });

            $scope.submit = function() {
                /* $$hashKey 삭제 */
                angular.forEach($scope.board.fileList, function(prop) {
                    if (prop.$$hashKey)
                        delete prop.$$hashKey;
                });

                if($scope.board._id) {
                    meteorS.call('boardUpdate', $scope.board).then(function() {
                        $alert({content: 'Success Update!', container: '#alerts-container', type: 'success', show: true, duration: '3', animation: 'am-fade-and-slide-top'});
                    });
                }else{
                    meteorS.call('boardSave', $scope.board).then(function() {
                        $alert({content: 'Success Create!', container: '#alerts-container', type: 'success', show: true, duration: '3', animation: 'am-fade-and-slide-top'});
                    });
                }
            };
        }])
;