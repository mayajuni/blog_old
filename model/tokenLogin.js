/**
 * Created by 동준 on 2015-07-31.
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
}