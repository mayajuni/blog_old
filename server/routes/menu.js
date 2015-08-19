/**
 * Created by 동준 on 2015-07-25.
 */
/**
 * 메뉴를 가지고 온다.
 */
Meteor.publish("getMenuList", function (){
    return Menu.find({}, {sort: {rank : 1}});
});

/**
 * 등록, 수정, 삭제
 */
Meteor.methods({
    /**
     * 메뉴 등록
     */
    saveMenu: function (menuInfo){
        LoginCheck(this.userId);

        if(!menuInfo) {
            throw new Meteor.Error("menu", errorM.needParams);
        }

        /* step2 추가 */
        if(!!menuInfo._id) {
            var _id = menuInfo._id;
            /* 업데이트를 하기 위해 _id 삭제 */
            delete menuInfo._id;

            /* 하위 object의 유일키 만들기 */
            AutoSeqs.upsert({_id: 'menu'}, {$inc : {seq: 1}});
            var autoSeqs = AutoSeqs.findOne({_id: 'menu'});
            menuInfo.seq = autoSeqs.seq;

            /* step2 추가 */
            Menu.update({'_id': _id}, {
                $push: {'subMenuList': menuInfo}
            });
        }
        /* step1 추가 */
        else {
            Menu.insert(menuInfo);
        }

        return null;
    },
    updateMenu: function(menuInfo) {
        LoginCheck(this.userId);
        if(!menuInfo) {
            throw new Meteor.Error("menu", errorM.needParams);
        }

        var selector = {'_id': menuInfo._id};
        var modifier = {};
        /* step2 변경처리 */
        if(!!menuInfo.seq) {
            selector.subMenuList = { $elemMatch: {'seq': menuInfo.seq} };
            modifier = {$set: { 'subMenuList.$.name': menuInfo.name, 'subMenuList.$.rank': menuInfo.rank, 'subMenuList.$.isBoard': menuInfo.isBoard, 'subMenuList.$.url': menuInfo.url }}
        }
        /* step1 변경처리 */
        else {
            modifier = {$set: { 'name': menuInfo.name, 'rank': menuInfo.rank, 'isBoard': menuInfo.isBoard, 'url': menuInfo.url }}
        }

        Menu.update(selector,modifier);

        return null;
    },
    removeMenu: function(menuInfo) {
        LoginCheck(this.userId);
        if(!menuInfo) {
            throw new Meteor.Error("menu", errorM.needParams);
        }

        /* step2 삭제 */
        if(!!menuInfo.seq) {
            Menu.update({_id: menuInfo._id}, {$pull: {subMenuList : {seq: menuInfo.seq}}});
        }
        /* step1 삭제 */
        else {
            Menu.remove({_id : menuInfo._id});
        }

        return null;
    }
});