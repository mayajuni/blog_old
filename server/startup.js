/**
 * Created by mayaj on 2015-07-30.
 */
Meteor.startup(function() {
    Meteor.users.find({ "status.online": true }).observe({
        added: function(id) {
            console.log(id.username + ' online');
            // id just came online
        },
        removed: function(id) {
            console.log(ServerSession.get('autoLogin'));
            console.log(id.username+ ' offline');
            // id just went offline
        }
    });
});

Meteor.methods({
    serverSessionSet : function (key, value) {
        ServerSession.set(key, value);
    }
});