/**
 * Created by mayaj on 2015-09-07.
 */
/**
 * 게시판 리스트 가지고 온다
 *
 */
Meteor.publish("getBookmarkList", function(options, hashTag) {
    var search = {};
    if(hashTag) {
        search.hashTag = hashTag;
    }

    Counts.publish(this, 'bookmarkTotalCount', Bookmarks.find(search), {noReady: true});

    return Bookmarks.find(search, options);
});

/**
 * 메소드
 */
Meteor.methods({
    bookmarkSave: function(bookmark) {
        LoginCheck(this.userId);
        var vo = boardVO(board, code.insert);
        vo.userId = this.userId;
        Bookmarks.insert(vo, function(error) {
            if(error) {
                throw new Meteor.Error(500, error);
            }
        });
    },
    /* 해당 url의 메타태그를 가지고 온다. */
    getMetaInfo: function(url){
        LoginCheck(this.userId);
        if(url.indexOf("http://") < 0 || url.indexOf("https://") < 0) {
            url = "http://" + url;
        }

        $ = cheerio.load(Meteor.http.get(url).content);

        var data = {
            'og:title':null,
            'og:description':null,
            'og:image':null
        };

        var meta = $('meta');
        var keys = Object.keys(meta);
        for (var s in data) {
            keys.forEach(function(key) {
                if ( meta[key].attribs
                    && meta[key].attribs.property
                    && meta[key].attribs.property === s) {
                    data[s] = meta[key].attribs.content;
                }
            })
        }

        return data;
    }
});