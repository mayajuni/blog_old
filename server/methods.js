/**
 * Created by mayaj on 2015-07-31.
 */
Meteor.methods({
    serverSessionSet : function (key, value) {
        ServerSession.set(key, value);
    },
    getToken : function(userId){
        if(userId){
            return Accounts.getToken('userId');
        }else {
            throw new Meteor.Error("logged-out",
                "The user must be logged in to post a comment.");
        }
    }/*,
    newMember : function() {
        var userId = Accounts.createUser({password:'dkssud12', email:'mayajuni101@gmail.com', jwt: token})
    }*/
});