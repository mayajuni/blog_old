/**
 * Created by mayaj on 2015-09-07.
 */
bookmarkVO = function(data, todo) {
    var VO = {
        _id : {todo: "update, delete", validate : true},
        userId : String,
        division : {validate : true},
        title : {todo: "insert, update", validate : true},
        hashTag : {todo: "insert, update", validate : true},
        memo : String,
        url : String,
        regDt : {default: new Date()}
    };

    VO = setAndValdate(data, VO, todo);
    return VO;
};