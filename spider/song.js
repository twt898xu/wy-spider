let request = require('request'),
    cheerio = require('cheerio');

let url = 'https://music.163.com/artist?id=', //歌手主页
    option = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
        }
    }

module.exports = {

    /**
     * 根据歌手Id获取歌手主页热门歌曲
     * @param { Number } singerId 歌手Id 
     * @returns 热门歌曲
     */
    requestSong(singerId) {

        option.url = `${url}${singerId}`;

        return new Promise((resolve, reject) => {

            request(option, (error, res, body) => {

                if (error) {
                    reject(error);
                    throw error;
                };

                let $ = cheerio.load(body),
                    songlist = [];

                $('#hotsong-list tr td:nth-child(2)').each((i, item) => {

                    let songId = $(item).find('a')[0].attr('href').match(/(?<==)\d+/)[0],
                        songName = $(item).find('b')[0].attr('title');

                    songlist.push({
                        'songId': songId,
                        'songName': songName,
                        'singerId': singerId
                    });

                });

                console.log(`-------------- 歌手 ${singerId} 爬取完毕`);
                resolve(singerIds);

            })

        })

    }
}