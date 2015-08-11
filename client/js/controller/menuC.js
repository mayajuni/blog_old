/**
 * Created by 동준 on 2015-07-29.
 */
angular.module('blog')
    .controller('menuC', ['$scope', '$rootScope', '$location', '$meteor', 'loginS', '$modal',
        function($scope, $rootScope, $location, $meteor, loginS, $modal){
            /*$scope.menuList = $scope.$meteorCollection(function() {
                return Menu.find({}, {}, {sort: {rank : -1}});
            });

            $meteor.autorun($scope, function() {
                 $scope.$meteorSubscribe('getMenuList');
             });*/
            $scope.$meteorSubscribe('getMenuList').then(function() {
                $scope.menuList = $scope.$meteorCollection(function() {
                    return Menu.find({}, {}, {sort: {rank : -1}});
                }, false);
            });

            $scope.adminMenu = [
                {
                    "text": "<i class=\"fa fa-bars\"></i> Menu",
                    "click": "openEditMenu()"
                },
                {
                    "text": "<i class=\"fa fa-pencil\"></i> Board</a>",
                    "click": "openEditMenu()"
                },
                {
                    "divider": true
                },
                {
                    "text": "<i class=\"fa fa-sign-out\"></i> Logout",
                    "click": "logout()"
                }
            ];
            $scope.openLogin = function() {
                loginS.openLoginModal();
            };

            $scope.logout = function() {
                loginS.logout();
            };

            $scope.openEditMenu = function() {
                $modal({templateUrl: 'client/html/menu/menuEdit.tpl.ng.html', controller: 'editMenuC', animation: 'am-fade-and-slide-top'});
            };

            $scope.menuClose = function() {
                $(".collapse").collapse('hide');
            };

            $rootScope.$on('$locationChangeSuccess', function() {
                /*hideMenu();*/
                var sectionHeader = {};
                if(!!$scope.menuList) {
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
        }])
    .controller('editMenuC', ['$scope', '$rootScope', '$meteor',
        function($scope, $rootScope, $meteor){
            $scope.menu = {};
            $scope.select = {};
            $scope.showButtom = true;

            $scope.isBoard = function() {
                if($scope.menu.isBoard){
                    $scope.menu.url = '/board/'+$scope.menu.name;
                }else{
                    $scope.menu.url = '';
                }
            };

            $scope.checkName = function() {
                $scope.nameError = false;
                for(var i=0;i<$scope.menuList.length;i++) {
                    if($scope.menuList[i].name == $scope.menu.name) {
                        $scope.nameError = true;
                        break;
                    }
                    for(var j=0;j<$scope.menuList[i].subMenuList.length;j++) {
                        if($scope.menuList[i].subMenuList[j].name == $scope.menu.name) {
                            $scope.nameError = true;
                            break;
                        }
                    }
                }
            };

            $scope.changeStep1 = function() {
                $scope.menu = {};

                if($scope.select.step1) {
                    if($scope.division != 'new'){
                        $scope.step2List = $scope.select.step1.subMenuList;

                        setMenu($scope.select.step1);
                    }else {
                        $scope.step2List = [];
                    }
                }
            };

            $scope.changeStep2 = function() {
                $scope.menu = {};

                if($scope.division != 'new'){
                    if(!$scope.select.step2) {
                        setMenu($scope.select.step1);
                    }else {
                        setMenu($scope.select.step2);
                    }
                }else {
                    $scope.step2List = [];
                    $scope.menu = {};
                }
            };

            $scope.submit = function() {
                $scope.showButtom = false;
                if($scope.division == 'new') {
                    $meteor.call('saveMenu', $scope.menu).then(function() {
                        reset()
                    }, function(err) {
                        console.log(err);
                        $scope.showButtom = true;
                    });
                } else {
                    $scope.menu._id = $scope.select.step1._id;
                    $meteor.call('updateMenu', $scope.menu).then(function() {
                        reset()
                    }, function(err) {
                        console.log(err);
                        $scope.showButtom = true;
                    })
                }
            };

            $scope.remove = function() {
                $scope.showButtom = false;
                $scope.menu._id = $scope.select.step1._id;
                $meteor.call('removeMenu', $scope.menu).then(function() {
                    reset()
                }, function(err) {
                    Session.set('errorMessage', err);
                    $scope.showButtom = true;
                });
            };

            function setMenu(obj) {
                $scope.menu = {};
                $scope.menu.name = obj.name;
                $scope.menu.url = obj.url;
                $scope.menu.isBoard = obj.isBoard;
                $scope.menu.rank = obj.rank;
                if(obj.seq) {
                    $scope.menu.seq = obj.seq;
                }
            }

            function reset() {
                $scope.menu = {};
                $scope.select = {};
                $scope.showButtom = true;
            }
            $scope.$watch('division', function(){
                reset();
            });

            $scope.$meteorSubscribe('getMenuList').then(function() {
                $scope.menuList = $scope.$meteorCollection(function() {
                    return Menu.find({}, {}, {sort: {rank : -1}});
                }, false);
            });
        }])
;
