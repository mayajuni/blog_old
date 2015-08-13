/**
 * Created by mayaj on 2015-08-13.
 */
/**
 * Created by ���� on 2015-07-28.
 */
angular.module('blog')
    .factory('menuS', ['$meteor', '$rootScope', '$q', '$location',
        function($meteor, $rootScope, $q, $location) {
            /* body Ŭ�� �̺�Ʈ */
            $('body').click(function(e) {
                /* �޴��� ���϶� */
                if($('body').hasClass('show-menu')){
                    /* section�� header�� Ŭ���ϸ� �ݾƶ� */
                    if($('section').has(e.target).length > 0 || ($('header').has(e.target).length > 0 && $('#toggleMenuBtn').has(e.target).length < 1)){
                        $("section, .container-fluid").animate({ 'right': '0px' }, 200);
                        $("#menuBox").animate({ 'right': '-300px' }, 200);
                        $('body').removeClass('show-menu');
                    }
                }
            });

            var service = {
                /**
                 * �޴� ����
                 */
                getMenu: function() {
                    var deferred  = $q.defer();
                    $meteor.subscribe('getMenuList').then(function() {
                        deferred.resolve(
                            $meteor.collection(function() {
                                return Menu.find({}, {}, {sort: {rank : -1}});
                            }, false));
                    });
                    return deferred.promise;
                },
                /**
                 * ����Ͱ� ����ɶ����� �̺�Ʈ
                 * ���� �ɶ����� active�� �޴��� ã�´�.
                 *
                 * @param $scope: Object
                 */
                changeMenuEvent: function($scope) {
                    /* �޴��� ���� �ɶ����� �̺�Ʈ �Ͼ��. */
                    $rootScope.$on('$locationChangeSuccess', function() {
                        /* ���� �޴� active */
                        service.activeMenu($scope);
                    });
                },
                /**
                 * active�� �޴��� ã�´�.
                 *
                 * @param $scope: Object
                 */
                activeMenu: function ($scope) {
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
                },
                /* ������ �޴� */
                adminMenus: [
                    { "text": "<i class=\"fa fa-bars\"></i> Menu", "click": "openEditMenu()" },
                    { "text": "<i class=\"fa fa-pencil\"></i> Board</a>", "click": "openEditMenu()" },
                    { "divider": true },
                    { "text": "<i class=\"fa fa-sign-out\"></i> Logout", "click": "logout()" }
                ]
            };

            return service;
        }]);