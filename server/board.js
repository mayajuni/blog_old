/**
 * Created by 동준 on 2015-07-25.
 */

/**
 * 게시판 리스트 가지고 온다
 *
 */
Meteor.publish("getBoardList", function(options, params) {
    var search = {};
    if(params.search) {
        search.title = {$regex: params.search}
    }
    if(params.division) {
        search.division = params.division
    }

    Counts.publish(this, 'boardTotalCount', Board.find(search), {noReady: true});

    return Board.find(search, options);
});

/**
 * 게시판 상세 가지고 온다
 *
 */
Meteor.publish("getBoardDetail", function(seq) {
    return Board.find({_id: seq});
});

/**
 * 게시판 저장
 *
 */
Meteor.publish("saveBoard", function(param) {
    LoginCheck(this.userId);

    return Board.insert(param);
});

/**
 * 게시판 수정
 *
 */
Meteor.publish("updateBoard", function(seq) {
    LoginCheck(this.userId);

    return Board.update({_id: seq});
});

/**
 * 게시판 삭제
 *
 */
Meteor.publish("removeBoard", function(seq) {
    LoginCheck(this.userId);

    return Board.remove({_id: seq});
});