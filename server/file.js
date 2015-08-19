/**
 * Created by mayaj on 2015-08-13.
 */
Files.allow({
    /**
     * 파일이 업로드 될시 fileLogs 에도 등록해준다
     *
     * @param userId
     * @param file
     * @returns {boolean}
     */
    insert: function (userId, file) {
        LoginCheck(userId);

        if(FileLogs.find({_id: file._id}).count() < 1) {
            var _id = file._id;
            FileLogs.insert({_id: _id, userId: userId});
        }

        return true;
    },
    /**
     * 파일 삭제
     *
     * 삭제시 아이디 체크, 그리고 _id 체크한 후 fileLogs에서 파일 삭제 권한이 있는지 체크후 삭제한다.
     *
     * @param userId
     * @param file
     * @returns {boolean}
     */
    remove: function (userId, file) {
        LoginCheck(userId);

        if(!file._id) {
            throw new Meteor.Error(409, errorM.needFile);
        }

        if(FileLogs.find({_id: file._id, userId: userId}).count() < 1){
            throw new Meteor.Error(409, errorM.notAuth);
        }

        FileLogs.remove({_id: file._id});

        return true;
    }
});

/**
 * 파일 찾기
 */
Meteor.publish('files', function() {
    return Files.find({});
});