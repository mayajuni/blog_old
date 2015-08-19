/**
 * Created by mayaj on 2015-08-19.
 */
boardVO = function(data, todo) {
    function Vo() {
        return {
            _id : {todo: "update, delete", validate : true},
            id : String,
            name : String,
            division : {validate : true},
            title : {todo: "insert, update", validate : true},
            content : {todo: "insert, update", validate : true},
            url : String,
            fileList : Array,
            regDt : {default: Date()}
        }
    }

    var vo = new Vo();
    setAndValdate(data, vo, todo);
    return vo;
};