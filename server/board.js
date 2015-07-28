/**
 * Created by 동준 on 2015-07-25.
 */

/**
 * 게시판을 가지고 온다
 *
 */
Meteor.publish("getBoardList", function(options, search) {
    Counts.publish(this, 'boardTotalCount', Board.find(search || {}), {noReady: true});

    return Board.find(search || {}, options);
});