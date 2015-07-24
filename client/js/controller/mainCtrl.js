/**
 * Created by ?èôÏ§? on 2015-07-22.
 */
angular.module('blog')
    .controller('mainCtrl', ['$scope', function($scope){
        $scope.sectionHeader = {
            backImg: "main"
        };
        $scope.$emit('sectionHeaderChange', $scope.sectionHeader);
    }]);
