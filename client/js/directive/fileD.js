/**
 * Created by 동준 on 2015-08-13.
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
            controller: ['$scope', '$meteor', function($scope, $meteor){
                $scope.oldFileCount = $scope.fileList.length;
                $scope.files = [];
                $scope.fileList = $scope.fileList || [];
                $scope.filesC = $meteor.collectionFS(Files, false);


                $scope.addFile = function(files) {
                    if (files.length > 0) {
                        for(var i=0; i<files.length; i++){
                            $scope.files.push(files[i]);
                            $scope.fileList.push(files[i]);
                            uploadFile($scope.fileList.length -1);
                        }
                    }
                };

                function uploadFile(index) {
                    $scope.filesC.save($scope.files[index]).then(function(fileObj) {
                        var fileInfo = {
                            _id: fileObj[0]._id._id,
                            name: fileObj[0]._id.original.name,
                            size: (fileObj[0]._id.original.size* 0.000977).toFixed(2),
                            type: fileObj[0]._id.original.type,
                            url: '/cfs/files/Files/'+fileObj[0]._id._id+'/'+ fileObj[0]._id.original.name
                        };
                        $scope.fileList[index] = fileInfo;
                    }, function(error){
                        $scope.fileList[index].error = error.message;
                    });
                }

                $scope.remove = function(_id, index, isError) {
                    if(isError) {
                        $scope.files.splice(index, 1);
                        $scope.fileList.splice(index, 1);
                    }else if(_id){
                        $scope.filesC.remove(_id).then(function() {
                            $scope.oldFileCount = $scope.oldFileCount -1;
                            $scope.files.splice(index, 1);
                            $scope.fileList.splice(index, 1);
                        }, function(error) {
                            console.log(error);
                        });
                    }
                };
            }]
        }
    });