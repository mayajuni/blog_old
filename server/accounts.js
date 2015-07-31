/**
 * Created by 동준 on 2015-07-25.
 */
/**
 * 회원가입 체크
 */
Accounts.validateNewUser(function(user) {
    console.log(user);

    return true;
});

/**
 * 로그인 완료후
 */
Accounts.validateLoginAttempt(function(obj) {
    /*var userId = obj.user.username;
    var dd = Accounts.token.getToken(userId);

    obj.user.token = dd;*/
    return true;
});

Accounts.createToken = function(userId) {
    var token = Random.secret();
    Meteor.users.update({username:userId}, {$set: {'services.token.loginToken': token}});

    return token;
};

Accounts.registerLoginHandler("accounts-token", function(options) {
    if (!options.token) {
        return {error: new Meteor.Error(400, "invalid-token")};
    }

    var user = Meteor.users.findOne({ 'services.token.loginToken': options.token });

    /*var stampedToken = Accounts._generateStampedLoginToken();
    var hashStampedToken = Accounts._hashStampedToken(stampedToken);

    Meteor.users.update(user._id,
        {$push: {'services.resume.loginTokens': hashStampedToken}}
    );*/

    return {
        userId: user._id
    };
});