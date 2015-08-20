/**
 * Created by mayaj on 2015-08-20.
 */
angular.module('blog')
    .factory('errorS', ['$alert', '$rootScope', 'loginS',
        function($alert, $rootScope, loginS) {
            var service = {
                throw: function(error){
                    Session.set('errorMessage', error);
                    $rootScope.$broadcast("loader_hide");
                    if(error.error === 401){
                        loginS.openLoginModal();
                    }
                }
            };

            /**
             * 에러 메세지가 들어왔을시 모달을 띠어준다.
             */
            Tracker.autorun(function(){
                if(Session.get('errorMessage')) {
                    var errorAlert = $alert({title: 'Error!!', content: Session.get('errorMessage').message, templateUrl: 'client/html/common/errorAlert.tpl.ng.html',
                        duration: '5', show: true, animation: 'am-fade-and-slide-top'});
                    delete Session.keys['errorMessage'];
                }
            });

            return service;
        }]);