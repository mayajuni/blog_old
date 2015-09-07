/**
 * Created by mayaj on 2015-08-21.
 */
Meteor.methods({
    last_action: function() {
        $ = cheerio.load(Meteor.http.get("http://www.naver.com").content);

        var data = {
            'og:type':null,
            'og:title':null,
            'og:description':null,
            'og:image':null,
            'twitter:title':null,
            'twitter:image':null,
            'twitter:description':null,
            'twitter:site':null,
            'twitter:creator':null,
        }
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

        return null;
    }
});