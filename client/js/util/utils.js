/**
 * Created by ���� on 2015-07-22.
 */
angular.module('utils', [])
    /* ���� ���丮�� ���� ���� ��� */
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
    /* ���ڿ� �� �� ... ���̱� */
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
    /* ���� null�϶� �������ڷ� */
    .filter('nullToStr', function(){
        return function(input, str){
            if(input){
                return input;
            }

            return str;
        }
    })
    /* ù��° ��¥ �빮�ڷ� */
    .filter('firstCharUpper', function() {
        return function(input){
            if(input){
                return input.substring(0,1).toUpperCase()+input.substring(1,input.length);
            }
            return input;
        };
    })
;