let request = require('request'),
    cheerio = require('cheerio');

let url = 'https://music.163.com/song?id=',
    option = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
        }
    }

module.exports = {

    requestSong(songId) {

        option.url = `${url}${songId}`;

        return new Promise((resolve, reject) => {

            request(option, (error, res, body) => {

                if (error) reject(error);

                let $ = cheerio.load(body),
                    songIds = [];

                $('.m-sglist.f-cb .f-thide:not(.s-fc4) a').each((i, item) => {

                    songIds.push($(item).attr('href').match(/(?<==)\d+/, '')[0]);

                })

                console.log(`-------------- 歌曲 ${songId} 爬取完毕`);
                resolve(songIds);

            })

        })

    }
}