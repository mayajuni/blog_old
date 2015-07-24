/**
 * Created by 동준 on 2015-07-24.
 */
angular.module('blog')
    .directive('menuBoxRight', function(){
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'client/html/index/menu.tpl.ng.html',
            controller: ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
                $scope.menuList = [
                    {name : 'Board', icon : 'fa  fa-fw fa-cogs', url: '/main2', rank : 1},
                    {name : 'Eoard', icon : 'fa  fa-fw fa-cogs', url: '', rank : 2,
                        subMenuList :
                            [
                                {name : 'SubBoard', icon : '', url: '1', rank : 1},
                                {name : 'SubBoard', icon : '', url: '5', rank : 1}
                            ]},
                    {name : 'Eoard2', icon : 'fa  fa-fw fa-cogs', url: '', rank : 2,
                        subMenuList :
                            [
                                {name : 'SubBoard', icon : '', url: '3', rank : 1},
                                {name : 'SubBoard', icon : '', url: '4', rank : 1}
                            ]}
                ];

                $rootScope.$on('$locationChangeSuccess', function(evt) {
                    /*hideMenu();*/
                    for(var i=0; i<$scope.menuList.length; i++){
                        if(!$scope.menuList[i].subMenuList && $location.path().indexOf($scope.menuList[i].url) > -1){
                            $scope.menuList[i].active = true;
                        }else{
                            $scope.menuList[i].active = false;
                        }

                        if(!!$scope.menuList[i].subMenuList) {
                            for (var j = 0; j < $scope.menuList[i].subMenuList.length; j++) {
                                $scope.menuList[i].subActive = false;
                                if ($location.path().indexOf($scope.menuList[i].subMenuList[j].url) > -1) {
                                    $scope.menuList[i].active = true;
                                    $scope.menuList[i].subMenuList[j].active = true;
                                } else {
                                    $scope.menuList[i].subMenuList[j].active = false;
                                }
                            }
                        }
                    }
                });

                function hideMenu() {
                    $("section, .container-fluid").animate({ 'right': '0px' }, 200);
                    $("#menuBox").animate({ 'right': '-300px' }, 200);
                    $('body').removeClass('show-menu');
                }

                $('body').click(function(e) {
                    if($('body').hasClass('show-menu')){
                        if($('section').has(e.target).length > 0 || ($('header').has(e.target).length > 0 && $('#toggleMenuBtn').has(e.target).length < 1)){
                            hideMenu();
                        }
                    }
                });

                $( window ).resize(function() {
                    $("#menuBox").css('minHeight', $( window ).height());
                });

                $("#menuBox").css('minHeight', $( window ).height());
            }]
        }
    });