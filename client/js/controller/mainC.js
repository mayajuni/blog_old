/**
 * Created by ���� on 2015-07-22.
 */
angular.module('blog')
    .controller('mainC', ['$scope', '$http', function($scope, $http){
        $scope.test = function() {
            $http.jsonp('http://www.naver.com'). then(function(response){
                var a = $(response);
                console.log(a);
            })
        }
    }]);