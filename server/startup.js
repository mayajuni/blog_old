/**
 * Created by mayaj on 2015-07-30.
 */

/**
 * 처음 시작할때 구동
 */
Meteor.startup(function() {
    /**
     * user-stuts 를 사용하여 로그아웃 됐을시 처리 해준다.
     */
    /*Meteor.users.find({ "status.online": true }).observe({
        added: function(id) {
            console.log(id.username + ' online');
            // id just came online
        },
        removed: function(id) {
            console.log(id.username+ ' offline');
            // id just went offline
        }
    });*/
    UserStatus.events.on("connectionLogout", function(fields) {
        console.log("-------------logout");
    });
    UserStatus.events.on("connectionIdle", function(fields) {
        console.log("-------------Idle");
    });
    UserStatus.events.on("connectionActive", function(fields) {
        console.log("-------------Active");
    });
});

