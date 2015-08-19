/**
 * Created by mayaj on 2015-08-13.
 */
/**
 * Created by 동준 on 2015-07-28.
 */
angular.module('blog')
    .factory('menuS', ['$meteor', '$rootScope', '$q', '$location',
        function($meteor, $rootScope, $q, $location) {
            /* body 클릭 이벤트 */
            $('body').click(function(e) {
                /* 메뉴가 보일때 */
                if($('body').hasClass('show-menu')){
                    /* section과 header를 클릭하면 닫아라 */
                    if($('section').has(e.target).length > 0 || ($('header').has(e.target).length > 0 && $('#toggleMenuBtn').has(e.target).length < 1)){
                        $("section, .container-fluid").animate({ 'right': '0px' }, 200);
                        $("#menuBox").animate({ 'right': '-300px' }, 200);
                        $('body').removeClass('show-menu');
                    }
                }
            });

            var service = {
                /**
                 * 메뉴 리턴
                 */
                getMenu: function(query) {
                    var deferred  = $q.defer();
                    $meteor.subscribe('getMenuList').then(function() {
                        deferred.resolve(
                            $meteor.collection(function() {
                                return Menu.find(query || {}, {sort: {rank : 1}});
                            }, false));
                    });
                    return deferred.promise;
                },
                /**
                 * 라우터가 변경될때마다 이벤트
                 * 병경 될때마다 active한 메뉴를 찾는다.
                 *
                 * @param $scope: Object
                 */
                changeMenuEvent: function($scope) {
                    /* 메뉴가 변경 될때마다 이벤트 일어난다. */
                    $rootScope.$on('$locationChangeSuccess', function() {
                        /* 현재 메뉴 active */
                        service.activeMenu($scope);
                    });
                },
                /**
                 * active한 메뉴를 찾는다.
                 *
                 * @param $scope: Object
                 */
                activeMenu: function ($scope) {
                    var sectionHeader = {};
                    if(!!$scope.menuList) {
                        for(var i=0; i<$scope.menuList.length; i++){
                            if((!$scope.menuList[i].subMenuList ||$scope.menuList[i].subMenuList.length < 1)
                                && $location.path().indexOf($scope.menuList[i].url) > -1){

                                $scope.menuList[i].active = true;
                                sectionHeader.title = $scope.menuList[i].name;
                            }else{
                                $scope.menuList[i].active = false;
                            }

                            if(!!$scope.menuList[i].subMenuList && $scope.menuList[i].subMenuList.length > 0) {
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
                },
                /* 관리자 메뉴 */
                adminMenus: [
                    { "text": "<i class=\"fa fa-bars\"></i> Menu", "click": "openEditMenu()" },
                    { "text": "<i class=\"fa fa-pencil\"></i> Board</a>", "click": "openCreateBoard()" },
                    { "divider": true },
                    { "text": "<i class=\"fa fa-sign-out\"></i> Logout", "click": "logout()" }
                ]
            };

            return service;
        }]);