/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog')
    .directive('headerBox', function(){
        return {
            restrict: 'AE',
            templateUrl: 'client/html/index/header.tpl.ng.html',
            controller: ['$scope', '$modal', function($scope, $modal){
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

                $scope.openShareBox = function() {
                    $modal({
                        templateUrl: 'client/html/share/shareBox.tpl.ng.html',
                        show: true,
                        animation: 'am-fade-and-slide-top',
                        controller: 'shareC'
                    })
                };

                $scope.$on('isBoardDetail', function(e, isBoardDetail){
                    $scope.isBoardDetail = isBoardDetail;
                })
            }]
        }
    });