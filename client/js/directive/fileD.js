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
                $scope.files = $meteor.collectionFS(Files, false).subscribe('files');

                $scope.addFile = function(files) {
                    if (files.length > 0) {
                        for(var i=0; i<files.length; i++){
                            $scope.files.save(files[i]);
                        }
                    }
                };

                $scope.showInfo = function(info) {
                    $modal({templateUrl: 'client/html/menu/menuEdit.tpl.ng.html', controller: 'editMenuC', animation: 'am-fade-and-scale', placement:'center'});
                };

                $scope.info = function(info) {
                    return [
                        {"text": "Name : " +info.original.name},
                        {"text": "Size : " +info.original.size * 0.000977},
                        {"text": "Type : " +info.original.type},
                        {"text": "URL : " +info.url()}
                    ]
                };

                $scope.remove = function(_id) {
                    $scope.files.remove(_id);
                };
            }]
        }
    });