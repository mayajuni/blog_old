/**
 * Created by 동준 on 2015-08-19.
 */
boardVO = function(data, todo) {
    var VO = {
            _id : {todo: "update, delete", validate : true},
            id : String,
            name : String,
            division : {validate : true},
            title : {todo: "insert, update", validate : true},
            content : {todo: "insert, update", validate : true},
            url : String,
            fileList : Array,
            regDt : {default: new Date()}
    };

    VO = setAndValdate(data, VO, todo);
    return VO;
};