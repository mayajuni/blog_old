/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog')
    .directive('headerBox', function(){
        return {
            restrict: 'AE',
            templateUrl: 'client/html/index/header.tpl.ng.html',
            controller: ['$rootScope', '$scope', '$meteor', function($rootScope, $scope, $meteor){
                $('#mainNav').affix({
                    offset: {
                        top: 50
                    }
                });

                $scope.toggleMenu = function(){
                    if($("body").hasClass('show-menu')){
                        $("section, .container-fluid").animate({ 'right': '0px' }, 200);
                        $("#menuBox").animate({ 'right': '-300px' }, 200);
                        $('body').removeClass('show-menu');
                    } else {
                        $("section, .container-fluid").animate({ 'right': '300px' }, 200);
                        $("#menuBox").animate({ 'right': '0px' }, 200);
                        $('body').addClass('show-menu');
                    }
                };

                $scope.showShare = function() {

                };

                $scope.$on('isBoardDetail', function(e, isBoardDetail){
                    $scope.isBoardDetail = isBoardDetail;
                })
            }]
        }
    });