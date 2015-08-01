/**
 * Created by mayaj on 2015-07-31.
 */
Meteor.methods({
    serverSessionSet : function (key, value) {
        ServerSession.set(key, value);
    },
    getToken : function (username, token){
        console.log('1111111');
        /*if(username){
            var user = Meteor.users.findOne({username: username});

            if(!user.services.token || !user.services.token.loginToken ) {
                return Accounts.createToken(username);
            } else {
                return user.services.token.loginToken;
            }
        }else {
            throw new Meteor.Error("logged-out",
                "The user must be logged in to post a comment.");
        }*/
    },
    checkToken : function(username) {
        var user = Meteor.users.findOne({username: username});
        return user.services.token.loginToken ? true : false;
    }
});