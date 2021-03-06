let request = require('request'),
    cheerio = require('cheerio');

let url = 'https://music.163.com/discover/artist/cat?id=', //热门歌手
    option = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
        }
    };


module.exports = {

    /**
     * 根据歌手类型查询热门歌手
     * @param { Number } catId 歌手类型 
     * @returns { Array } 歌手对象数组
     */
    singerRequest(catId) {

        option.url = `${url}${catId}&initial=-1`;

        return new Promise((resolve, reject) => {

            request(option, (error, res, body) => {

                if (error) {
                    reject(error);
                    throw error;
                };

                let singerList = [];
                $ = cheerio.load(body);

                $('.nm.nm-icn.f-thide.s-fc0').each((i, item) => {

                    let singerId = $(item).attr('href').match(/(?<==)\d+/)[0],
                        singerName = $(item).text();

                    singerList.push({
                        'singerId': singerId,
                        'singerName': singerName,
                        'singerType': catId
                    });

                });

                resolve(singerList);

            })

        });
    }

}