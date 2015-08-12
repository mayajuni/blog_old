/**
 * Created by 동준 on 2015-07-29.
 */
angular.module('blog')
    .controller('menuC', ['$scope', '$rootScope', '$location', '$meteor', 'loginS', '$modal',
        function($scope, $rootScope, $location, $meteor, loginS, $modal){
            /* 메뉴리스트 가져오기 */
            $scope.$meteorSubscribe('getMenuList').then(function() {
                $scope.menuList = $scope.$meteorCollection(function() {
                    return Menu.find({}, {}, {sort: {rank : -1}});
                }, false);
                /* 현재 메뉴 active */
                activeMenu();
            });

            /* 관리자 메뉴 설정 */
            $scope.adminMenu = [
                { "text": "<i class=\"fa fa-bars\"></i> Menu", "click": "openEditMenu()" },
                { "text": "<i class=\"fa fa-pencil\"></i> Board</a>", "click": "openEditMenu()" },
                { "divider": true },
                { "text": "<i class=\"fa fa-sign-out\"></i> Logout", "click": "logout()" }
            ];

            /* 로그인창 오픈 */
            $scope.openLogin = function() {
                loginS.openLoginModal();
            };

            /* 로그아웃 */
            $scope.logout = function() {
                loginS.logout();
            };

            /* 메뉴 Edit 창 오픈 */
            $scope.openEditMenu = function() {
                $modal({templateUrl: 'client/html/menu/menuEdit.tpl.ng.html', controller: 'editMenuC', animation: 'am-fade-and-slide-top'});
            };

            /* 메뉴 닫기 */
            $scope.menuClose = function() {
                $(".collapse").collapse('hide');
            };

            /* 메뉴가 변경 될때마다 이벤트 일어난다. */
            $rootScope.$on('$locationChangeSuccess', function() {
                /* 현재 메뉴 active */
                activeMenu();
            });

            /* 현재 메뉴 active 하기 */
            function activeMenu() {
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
            }

            /* 사이트 메뉴박스 닫기 */
            function hideSideMenu() {
                $("section, .container-fluid").animate({ 'right': '0px' }, 200);
                $("#menuBox").animate({ 'right': '-300px' }, 200);
                $('body').removeClass('show-menu');
            }

            /* body 클릭 이벤트 */
            $('body').click(function(e) {
                /* 메뉴가 보일때 */
                if($('body').hasClass('show-menu')){
                    /* section과 header를 클릭하면 닫아라 */
                    if($('section').has(e.target).length > 0 || ($('header').has(e.target).length > 0 && $('#toggleMenuBtn').has(e.target).length < 1)){
                        hideSideMenu();
                    }
                }
            });
        }])
    .controller('editMenuC', ['$scope', '$rootScope', '$meteor',
        function($scope, $rootScope, $meteor){
            $scope.menu = {};
            $scope.select = {};

            /* 메뉴가 보드였을시 url 변경 */
            $scope.isBoard = function() {
                if($scope.menu.isBoard){
                    $scope.menu.url = '/board/'+$scope.menu.name;
                }else{
                    $scope.menu.url = '';
                }
            };

            /* 이름이 바꼈을때 중복된 메뉴인지 체크 및 메뉴가 보드였을시 url 변경 */
            $scope.checkName = function() {
                $scope.nameError = false;
                for(var i=0;i<$scope.menuList.length;i++) {
                    if($scope.menuList[i].name == $scope.menu.name) {
                        $scope.nameError = true;
                        break;
                    }
                    if($scope.menuList[i].subMenuList){
                        for(var j=0;j<$scope.menuList[i].subMenuList.length;j++) {
                            if($scope.menuList[i].subMenuList[j].name == $scope.menu.name) {
                                $scope.nameError = true;
                                break;
                            }
                        }
                    }
                }
                $scope.isBoard();
            };

            /* 메뉴step1이 변경되었을때 설정 */
            $scope.changeStep1 = function() {
                $scope.menu = {};

                if($scope.select.step1) {
                    if($scope.division != 'create'){
                        $scope.step2List = $scope.select.step1.subMenuList;

                        setMenu($scope.select.step1);
                    }else {
                        $scope.step2List = [];
                    }
                }
            };

            /* 메뉴2가 변경되었을때 설정 */
            $scope.changeStep2 = function() {
                $scope.menu = {};

                if($scope.division != 'create'){
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

            /* 등록 및 수정 진행 */
            $scope.submit = function() {
                /* 버튼 디세이블 */
                $scope.disabledButtom = true;
                /* 등록일시 */
                if($scope.division == 'create') {
                    $meteor.call('saveMenu', $scope.menu).then(reset, error);
                }
                /* 수정일시 */
                else if($scope.division == 'update') {
                    $scope.menu._id = $scope.select.step1._id;
                    $meteor.call('updateMenu', $scope.menu).then(reset, error)
                }
                /* 삭제일시 */
                else {
                    $scope.menu._id = $scope.select.step1._id;
                    $meteor.call('removeMenu', $scope.menu).then(reset, error);
                }
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

            function error(err) {
                console.log(err);
                Session.set('errorMessage', err);
                $scope.disabledButtom = false;
            }

            function reset() {
                $scope.menu = {};
                $scope.select = {};
                $scope.disabledButtom = false;
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
