/**
 * Created by 동준 on 2015-07-22.
 */
angular.module('utils', [])
    /* 로컬 스토리지 저장 삭제 등등 */
    .factory('$localStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            remove : function(key){
                delete $window.localStorage[key];
            }
        }
    }])
    /* 문자열 컷 후 ... 붙이기 */
    .filter('limitAndJjum', ['limitToFilter', function(limitToFilter){
        return function(input, limit){
            if(input){
                if(input.length > limit){
                    return limitToFilter(input, limit-3) + '...'
                }
                return input;
            }

            return input;
        }
    }])
    /* 값이 null일때 다음문자로 */
    .filter('nullToStr', function(){
        return function(input, str){
            if(input){
                return input;
            }

            return str;
        }
    })
    /* 첫번째 글짜 대문자로 */
    .filter('firstCharUpper', function() {
        return function(input){
            if(input){
                return input.substring(0,1).toUpperCase()+input.substring(1,input.length);
            }
            return input;
        };
    })
;