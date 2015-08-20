/**
 * Created by mayaj on 2015-08-20.
 */
angular.module('blog')
    .factory('boardS', ['$modal', function($modal) {
            var service = {
                /**
                 * 인자값은 $scope.$new(true); <- 이렇게 선언해서 넘겨줘야된다.
                 *
                 * @param scope
                 */
                openCreateBoard: function(scope) {
                    var option = {
                        templateUrl: 'client/html/board/boardEdit.tpl.ng.html',
                        show: true,
                        animation: 'am-fade-and-slide-top',
                        controller: 'boardCreateC'
                    };
                    if(scope) {
                        option.scope = scope;
                    }
                    $modal(option);
                }
            };

            return service;
        }]);