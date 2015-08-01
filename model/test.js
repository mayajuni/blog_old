/**
 * Created by mayaj on 2015-07-31.
 */
if(Meteor.isClient) {
    Accounts.loginWithToken = function(token, callback) {
        Accounts.callLoginMethod({
            methodArguments: [{
                token: token
            }],
            userCallback: callback
        });
    };

    Tracker.autorun(function(){
        if(Meteor.userId()) {
            console.log(111);
        }else {
            console.log(2222);
        }
    })
}