/**
 * Created by 동준 on 2015-07-25.
 */
/**
 * 회원가입 체크
 */
Accounts.validateNewUser(function(user) {
    return true;
});

/**
 * 로그인 완료후
 */
Accounts.validateLoginAttempt(function(obj) {
    return true;
});

/**
 * 토큰을 만들고 해당 유저에 넣는다..
 *
 * @param userId
 * @returns {*}
 */
Accounts.createToken = function(userId) {
    var token = Random.secret();
    Meteor.users.update({_id:userId}, {$set: {'services.token.loginToken': token}});

    return token;
};

/**
 * 토큰을 이용해서 로그인한다.
 *
 * @param userId
 * @returns {*}
 */
Accounts.registerLoginHandler("accounts-token", function(options) {
    if (!options.token) {
        throw new Meteor.Error(400, "invalid-token");
    }

    var user = Meteor.users.findOne({ 'services.token.loginToken': options.token });

    if(!user) {
        throw new Meteor.Error(401, "Not Member");
    }

    return {
        userId: user._id
    };
});

/**
 *
 *
 * @constructor
 */
LoginCheck = function(userId) {
    if(!userId) {
        throw new Meteor.Error(401, errorM.needLogin);
    }
};

Meteor.methods({
    /**
     * 토큰을 리턴한다
     *
     * @param userId : [String] 유저 아이디
     * @returns {*} : [String] 토큰
     */
    getToken : function (){
        LoginCheck(this.userId);

        var user = Meteor.users.findOne({_id: this.userId});

        if(!user.services.token || !user.services.token.loginToken ) {
            return Accounts.createToken(this.userId);
        } else {
            return user.services.token.loginToken;
        }
    }
});