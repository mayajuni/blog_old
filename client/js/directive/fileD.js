/**
 * Created by mayaj on 2015-08-13.
 */
/**
 * Created by 동준 on 2015-07-25.
 */
angular.module('blog')
    .directive('fileBox', function(){
        return {
            restrict: 'AE',
            scope: {
                fileList: '='
            },
            templateUrl: 'client/html/file/file.tpl.ng.html',
            controller: ['$scope', '$meteor', '$modal', function($scope, $meteor, $modal){
                $scope.fileList = [];
                $scope.uploadedFiles = [];
                $scope.files = $meteor.collectionFS(Files, false).subscribe('files');


                $scope.addFile = function(files) {
                    if (files.length > 0) {
                        for(var i=0; i<files.length; i++){
                            $scope.fileList.push(files[i]);

                            $scope.files.save(files[i]).then(function(fileObj) {
                                $scope.uploadedFiles.push(fileObj[0]._id);
                            });
                        }
                    }
                };

                $scope.remove = function(_id, index) {
                    $scope.fileList.splice(index, 1);
                    $scope.uploadedFiles.splice(index, 1);
                    $scope.files.remove(_id);
                };
            }]
        }
    });