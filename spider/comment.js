let request = require('request'),
    superagent = require('superagent'),
    querystring = require('querystring');
require('superagent-proxy')(superagent);

let url = 'http://music.163.com/weapi/v1/resource/comments/R_SO_4_', //评论获取地址
    postData = querystring.stringify({
        'params': 'IRxdefwoXs2Xc5wjf+7Q95AAn68tkXOtj0TF8o9lVMGLsgqg03tStZgMT6ybFyTHPu6vUaITbTW9P6YLtdnKukAim3BWyJrV+aHXkHs6KGOX7ODyJyZylCCtR0gs++Irr+mBxhdwJj09HP/4z5uaNDqZjzf/u8GXp5KCsQBV1oUWGHeKYN1L8jCbGpCZySOl',
        'encSecKey': '5bc7409cded7fbb2ba0f07d6adf59dd141a9dfdd173d94a1a7deebfe9b84870cf609990162517f3bf5678c0c464fef6b5d97518857b85e6f35368c2ff70387d497a0453e83ff421db85364525547e96120a2221cee1fd77cd8649066b9a726ab398c094b61be9bce1c27072fda4da5e974a2abd5d392ff8fff660c724e5b8a47'
    }),
    option = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': '',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Length': postData.length,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': '_ntes_nnid=d4f1f8a35b60589e598917a9aea68d2d,1485063186559; _ntes_nuid=d4f1f8a35b60589e598917a9aea68d2d; vjuids=-1c7fddbaf.159de646ffc.0.b4be15b03bf1e; usertrack=c+5+hligb0V3MHRsFmK3Ag==; vjlast=1485494841.1490342673.11; vinfo_n_f_l_n3=6448bee7253b7a45.1.4.1485494841401.1489049705638.1490343056867; _ga=GA1.2.1441860845.1486909257; playerid=90966100; JSESSIONID-WYYY=9b3DgY%5CGm8xTDPPETNNf4dJAohbwJhcqdts5xcl79GtV%2FROKP3BmES%5Co21h9Y%2Blh5y57sRjGE1nUoby52TBteF%5C%5Cp9J%2Bf5YG4cffgbx9vPucEp3McmxB%5C%5CO91IKkCW9nlsB2Zcnz71Z51H%2FKcoejVYCmI5HG0xKlBUWh3ckCNJxdRG95%3A1490514696421; _iuqxldmzr_=32; __utma=94650624.1386554663.1485063188.1490507005.1490512898.15; __utmb=94650624.8.10.1490512898; __utmc=94650624; __utmz=94650624.1490455193.13.9.utmcsr=jianshu.com|utmccn=(referral)|utmcmd=referral|utmcct=/p/07ebbb142c73',
            'Host': 'music.163.com',
            'Origin': 'http://music.163.com',
            'Pragma': 'no-cache',
            'Referer': '',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        },
        // proxy:'http://61.135.217.7:80/'
    };


module.exports = {

    /**
     * 根据歌曲id获取歌曲评论
     * @param { Number } songId  歌曲id
     * @returns 评论对象
     */
    commonRequest(songId) {

        return new Promise((resolve, reject) => {

            option.url = `${url}${songId}?${postData}`;
            option.headers.Referer = `http://music.163.com/song?id=${songId}`;

            request(option, (error, res, body) => {

                if (error) {
                    reject(error);
                    throw error;
                };

                let data = JSON.parse(body),
                    hotComments = [];

                data.hotComments.map((item, index) => {

                    //返回每首歌曲的热评第一条评论或者点赞数大于10000的评论
                    if (!index || item.likeCount > 10000) {

                        hotComments.push({
                            commentId: item.commentId,
                            songId: songId,
                            commentContent: item.content,
                            likeCount: item.likedCount,
                            creatDate: item.time,
                            commentator: {
                                personId: item.user.userId,
                                displayName: item.user.nickname,
                                avatar: item.user.avatarUrl
                            }
                        })
                    }

                });

                console.log(`歌曲 ${songId} 评论已抓取完毕`);
                resolve({
                    totalComent: data.total,
                    hotComments: hotComments
                });

            });

        });

    }

}