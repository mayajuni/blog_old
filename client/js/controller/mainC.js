/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog')
    .controller('mainC', ['$scope', '$meteor', '$window', function($scope, $meteor, $window){
        console.log($window.localStorage);
        /*UserStatus.startMonitor*/
        /*$scope.sectionHeader = {
            backImg: "main"
        };
        $scope.$emit('sectionHeaderChange', $scope.sectionHeader);*/
        /*console.log(1);
        $scope.$meteorSubscribe('userStatus').then(function(data){
            console.log(2);
            console.log($scope.$meteorCollection(Meteor.user));
            console.log(data);
        });*/
        /*$meteor.autorun($scope, function() {

        });*/
    }]);
window.onbeforeunload = function () {
    Meteor.call('getToken');

}