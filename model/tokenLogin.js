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

    /*Tracker.autorun(function() {
        if(Meteor.loggingIn()) {
            Meteor.call('getToken', Meteor.userId(), function(error, token) {
                if(!error){
                    window.sessionStorage['token'] = token;
                }
            });
        }
    });*/
}