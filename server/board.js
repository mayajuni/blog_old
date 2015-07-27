/**
 * Created by 동준 on 2015-07-25.
 */

/**
 * 게시판을 가지고 온다
 *
 * @param params : [Object] page, view, title(search 구문으로 가지고 온다), division
 */
Meteor.publish("getBoardList", function(params) {
    var where = {};
    var page = !params.page ? 1 : params.page;
    var view = !params.view ? 10 : params.view;
    if(params.search) {
        where.title = '/'+params.search+'/';
    }

    return Board.find(where, {}, {sort : {"regDt" : -1}, skip : view * (page- 1), limit: view });
});

/**
 * 게시물의 총 갯수를 가지고 온다.
 *
 * @param division : [String] 구분
 */
Meteor.publish("getTotalCount", function(division){
    var where = {};
    if(division) {
        where.division = division;
    }
    return Board.find(where);
});