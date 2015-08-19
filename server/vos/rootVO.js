/**
 * Created by mayaj on 2015-08-19.
 */
setAndValdate = function(data, objectVO, todo) {
    for(var key in objectVO) {
        if(!!objectVO[key].validate) {
            if((!objectVO[key].method || !!objectVO[key].method && (objectVO[key].method.toUpperCase().indexOf(todo.toUpperCase()) > -1))){
                if(!data[key]){
                    var msg = !errorM[key] ? "Check " + key : errorM[key];
                    throw new Meteor.Error(409, msg);
                    break;
                }
            }
        }
        if(!!data[key]){
            objectVO[key] = data[key];
        }else if(!!objectVO[key].default && !data[key]){
            objectVO[key] = objectVO[key].default ;
        }else{
            delete objectVO[key];
        }
    }
};