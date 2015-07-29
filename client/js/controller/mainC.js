/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog')
    .controller('mainC', ['$scope', '$meteor', function($scope, $meteor){

        $scope.ddd = $meteor.collection(Board);
        /*$scope.sectionHeader = {
            backImg: "main"
        };
        $scope.$emit('sectionHeaderChange', $scope.sectionHeader);*/
    }]);
