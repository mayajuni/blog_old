/**
 * Created by 동준 on 2015-07-24.
 */
angular.module('blog')
    .directive('menuBoxRight', function(){
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'client/html/index/menu.tpl.ng.html',
            controller: ['$scope', '$rootScope', '$location', '$meteor', 'loginS',
                function($scope, $rootScope, $location, $meteor, loginS){
                    $scope.menuList = $meteor.collection(Menu).subscribe('getMenuList');

                    $scope.openLogin = function() {
                        loginS.openLoginModal();
                    };

                    $scope.logout = function() {
                        loginS.logout();
                    };

                    $scope.menuClose = function() {
                        $(".collapse").collapse('hide');
                    };

                    $rootScope.$on('$locationChangeSuccess', function() {
                        /*hideMenu();*/
                        var sectionHeader = {};
                        for(var i=0; i<$scope.menuList.length; i++){
                            if(!$scope.menuList[i].subMenuList && $location.path().indexOf($scope.menuList[i].url) > -1){
                                $scope.menuList[i].active = true;
                                sectionHeader.title = $scope.menuList[i].name;
                            }else{
                                $scope.menuList[i].active = false;
                            }

                            if(!!$scope.menuList[i].subMenuList) {
                                for (var j = 0; j < $scope.menuList[i].subMenuList.length; j++) {
                                    $scope.menuList[i].subActive = false;
                                    if ($location.path().indexOf($scope.menuList[i].subMenuList[j].url) > -1) {
                                        $scope.menuList[i].active = true;
                                        $scope.menuList[i].subMenuList[j].active = true;

                                        /* sectionHeader setting */
                                        sectionHeader.title = $scope.menuList[i].name;
                                        sectionHeader.subTitle = $scope.menuList[i].subMenuList[j].name;

                                        $("#"+$scope.menuList[i].name).collapse('show');
                                    } else {
                                        $scope.menuList[i].subMenuList[j].active = false;
                                    }
                                }
                            }
                        }

                        $scope.$emit('sectionHeaderChange', sectionHeader);
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