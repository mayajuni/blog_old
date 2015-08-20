/**
 * Created by mayaj on 2015-08-20.
 */
angular.module('blog')
    .service('meteorS', ['$q', '$rootScope', 'errorS',
        function($q, $rootScope, errorS) {
            this.call = function(){
                var deferred = $q.defer();
                $rootScope.$broadcast("loader_show");
                Array.prototype.push.call(arguments, function (err, data) {
                    if (err){
                        errorS.throw(err);
                    }
                    else{
                        $rootScope.$broadcast("loader_hide");
                        deferred.resolve(data);
                    }
                });
                Meteor.call.apply(this, arguments);

                return deferred.promise;
            };
        }]);