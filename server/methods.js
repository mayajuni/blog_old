/**
 * Created by mayaj on 2015-07-31.
 */
Meteor.methods({
    serverSessionSet : function (key, value) {
        ServerSession.set(key, value);
    },
    getToken : function (userId){
        if(userId){
            var user = Meteor.users.findOne({username: userId});
            console.log(user);
            if(!user.services.token || !user.services.token.loginToken ) {
                return Accounts.createToken(userId);
            } else {
                return user.services.token.loginToken;
            }
        }else {
            throw new Meteor.Error("logged-out",
                "The user must be logged in to post a comment.");
        }
    }
});