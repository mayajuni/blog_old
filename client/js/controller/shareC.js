/**
 * Created by mayaj on 2015-08-21.
 */
angular.module('blog')
    .controller('shareC', ['$scope', '$window', '$location',
        function($scope, $window, $location){

            $scope.facebookShare = function() {
                $window.open('https://www.facebook.com/sharer/sharer.php?u='+$location.absUrl());
            };

            $scope.googleShare = function() {
                $window.open('https://plus.google.com/share?url='+$location.absUrl());
            };
        }]);