/**
 * Created by µ¿ÁØ on 2015-07-22.
 */
angular.module('blog')
    .controller('mainC', ['$scope', '$meteor', function($scope, $meteor){
        $scope.files = $meteor.collectionFS(Files, false).subscribe('files');

        $scope.addFile = function(files) {
            if (files.length > 0) {
                for(var i=0; i<files.length; i++){
                    $scope.files.save(files[i]);
                }
            }
        };

        $scope.remove = function(_id) {
            $scope.files.remove(_id);
        };
    }]);