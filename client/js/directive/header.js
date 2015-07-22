/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog')
    .directive('headerBox', function(){
        return {
            restrict: 'AE',
            templateUrl: 'client/templates/index/header.ng.html',
            controller: ['$scope', function($scope){
                $('#mainNav').affix({
                    offset: {
                        top: 50
                    }
                });

                $scope.toggleMenu = function(){
                    if(angular.element('body').hasClass('show-menu')){
                        angular.element('body').removeClass('show-menu');
                    } else {
                        angular.element('body').addClass('show-menu');
                    }
                };

                $('body').click(function(e) {
                    console.log($('#toggleMenuBtn').has(e.target).length);
                    if($('body').hasClass('show-menu')){
                        if($('#toggleMenuBtn, #menu').has(e.target).length < 1){
                            $('body').removeClass('show-menu');
                        }
                    }
                });
            }]
        }
    });