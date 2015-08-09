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
    .controller('boardEditC', ['$scope', '$meteor', '$stateParams',
        function($scope, $meteor, $stateParams) {
            $scope.board = {};
            if(!!$stateParams.seq) {
                $scope.board = $scope.$meteorCollection(Board).$meteorSuvscribe('getBoardDetail', $stateParams.seq);
            }


        }])
;