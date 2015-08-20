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

        Board.insert(vo, function(error, result) {
            if(error) {
                throw new Meteor.Error(500, error);
            }

            if(vo.fileList.length > 0) {
                for(var i in vo.fileList) {
                    FileLogs.update({_id: vo.fileList[i]._id}, {$set: {boardId: result}});
                }
            }
        });
    },
    boardUpdate: function(board){
        LoginCheck(this.userId);
        var vo = boardVO(board, code.insert);
        var _id = vo._id;
        delete vo._id;

        Board.update({_id: _id, userId: this.userId}, {$set: vo}, function(error) {
            if(error) {
                throw new Meteor.Error(500, error);
            }

            if(vo.fileList.length > 0) {
                for(var i in vo.fileList) {
                    FileLogs.update({_id: vo.fileList[i]._id}, {$set: {boardId: _id}});
                }
            }
        });
    },
    boardDelete: function(board){
        LoginCheck(this.userId);
        var vo = boardVO(board, code.insert);

        var boardInfo = Board.findOne({_id: vo._id, userId: this.userId});
        if(!boardInfo) {
            throw new Meteor.Error(409, errorM.notAuth);
        }

        if(boardInfo.fileList.length > 0) {
            for(var i in vo.fileList) {
                FileLogs.remove({_id: boardInfo.fileList[i]._id});
                Files.remove(boardInfo.fileList[i]._id);
            }
        }

        Board.remove({_id: vo._id, userId: this.userId});
    }
});