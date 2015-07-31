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
}