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
 * 메소드
 */
Meteor.methods({
    boardSave: function(board) {
        LoginCheck(this.userId);
        var vo = boardVO(board, code.insert);
        vo.userId = this.userId;

        Board.insert(vo);
    },
    boardUpdate: function(board){
        LoginCheck(this.userId);
        var vo = boardVO(board, code.insert);
        var _id = vo._id;
        delete vo._id;

        Board.update({_id: vo._id, userId: this.userId}, {$set: vo});
    },
    boardDelete: function(board){
        LoginCheck(this.userId);
        var vo = boardVO(board, code.insert);

        Board.update({_id: vo._id, userId: this.userId}, {$set: vo});
    }
});