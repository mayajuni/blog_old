/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog')
    .controller('mainC', ['$scope', '$http', '$meteor', 'meteorS', function($scope, $http,$meteor, meteorS){
        meteorS.call('last_action').then(function(data) {
            console.log(data);
        });
    }]);