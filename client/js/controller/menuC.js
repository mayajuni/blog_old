/**
 * Created by 동준 on 2015-07-29.
 */
angular.module('blog')
    .controller('menuC', ['$scope', '$rootScope', 'loginS', '$modal', 'menuS',
        function($scope, $rootScope, loginS, $modal, menuS){
            /* 관리자 메뉴 설정 */
            $scope.adminMenu = menuS.adminMenus;

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

            /* 메뉴가 변경될때 이벤트 */
            menuS.changeMenuEvent($scope);

            /* 메뉴 가지고 오기 */
            menuS.getMenu($scope).then(function(menuList) {
                $scope.menuList = menuList;
                menuS.activeMenu($scope);
            })
        }])
    .controller('editMenuC', ['$scope', '$rootScope', '$meteor', 'menuS',
        function($scope, $rootScope, $meteor, menuS){
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

            /* 메뉴 셋팅 */
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

            /* 에러 통합 */
            function error(err) {
                Session.set('errorMessage', err);
                $scope.disabledButtom = false;
            }

            /* reset */
            function reset() {
                $scope.menu = {};
                $scope.select = {};
                $scope.disabledButtom = false;
            }

            /* division 변경이 있을시 */
            $scope.$watch('division', function(){
                reset();
            });

            /* 메뉴 가져오기 */
            menuS.getMenu($scope).then(function(menuList) {
                $scope.menuList = menuList;
            })
        }])
;
