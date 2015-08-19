/**
 * Created by 동준 on 2015-07-29.
 */
angular.module('blog')
    .controller('boardListC',['$scope', '$meteor', function($scope, $meteor){

    }])
    .controller('boardDetailC', ['$scope', '$meteor', '$stateParams',
        function($scope, $meteor, $stateParams) {
            $scope.board = $scope.$meteorCollection(Board).$meteorSuvscribe('getBoardDetail', $stateParams.seq);
        }])
    .controller('boardCreateC', ['$scope', '$meteor', 'menuS',
        function($scope, $meteorm, menuS) {
            /* 메뉴 가져오기 */
            menuS.getMenu({'$or': [{isBoard: true}, {subMenuList: {$elemMatch: {isBoard: true}}}]}).then(function(menuList) {
                console.log(menuList);
                $scope.menuList = menuList;
            });
        }])
;