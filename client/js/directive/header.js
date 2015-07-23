/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('blog')
    .directive('headerBox', function(){
        return {
            restrict: 'AE',
            templateUrl: 'client/html/index/header.tpl.ng.html',
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
                    if($('body').hasClass('show-menu')){
                        if($('section').has(e.target).length > 0){
                            $('body').removeClass('show-menu');
                        }
                    }
                });
            }]
        }
    });