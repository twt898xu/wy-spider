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

    singerRequest(catId) {

        option.url = `${url}${catId}&initial=-1`;

        return new Promise((resolve, reject) => {

            request(option, (error, res, body) => {

                if (error) reject(error);

                let singerObj = [];
                    $ = cheerio.load(body);

                $('.nm.nm-icn.f-thide.s-fc0').each((i, item) => {

                    let singerId = $(item).attr('href').match(/(?<==)\d+/)[0],
                        singerName = $(item).text();

                    singerObj.push({
                        'singerId':singerId,
                        'singerName':singerName
                    });

                });

                resolve(singerObj);

            })

        });
    }

}