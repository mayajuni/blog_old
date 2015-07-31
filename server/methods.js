/**
 * Created by mayaj on 2015-07-31.
 */
Meteor.methods({
    serverSessionSet : function (key, value) {
        ServerSession.set(key, value);
    },
    getClientIP : function(){
        return this.connection.clientAddress;
    }
});