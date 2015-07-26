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
Accounts.validateLoginAttempt(function() {
    return true;
});