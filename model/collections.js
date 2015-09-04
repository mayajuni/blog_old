/**
 * Created by 동준 on 2015-07-26.
 */
/**
 * 게시판
 *
 * @type {Meteor.Collection}
 */
Board = new Meteor.Collection("boards");

/**
 * 북마크
 *
 * @type {Meteor.Collection}
 */
Bookmarks = new Meteor.Collection("bookmarks");

/**
 * seq
 *
 * @type {Meteor.Collection}
 */
AutoSeqs = new Meteor.Collection("autoSeqs");

/**
 * FileLogs
 *
 * @type {Meteor.Collection}
 */
FileLogs = new Meteor.Collection("FileLogs");

/**
 * menus
 *
 * @type {Meteor.Collection}
 */
Menu = new Meteor.Collection("menus");

/**
 * File
 *
 * @type {Meteor.Collection|Mongo.Collection}
 */
Files = new FS.Collection("Files", {
    filter: {
        maxSize: 1048576 * 10 // 10메가
    },
    stores: [
        new FS.Store.FileSystem("files", {path: "~/uploads"})
    ]
});