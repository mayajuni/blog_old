/**
 * Created by ���� on 2015-07-22.
 */
angular.module('blog')
    .controller('mainC', ['$scope', '$meteor', function($scope, $meteor){
        $meteor.call('boardSave').then(function(){},function(error){console.log(error)})
    }]);