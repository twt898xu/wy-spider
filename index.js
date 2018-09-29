let song = require('./reptilian/song'),
    common = require('./reptilian/comment'),
    singer = require('./reptilian/singer'),
    db=require('./db/dbOperation'),
    fs = require('fs');

    let request=require('request');

let crowlSongIds = new Set(), //存储待爬取的歌曲id
    crowedSongIds = []; //已经爬取的id


let catId = [1001, 1002, 1003]; //华语男歌手 ，华语女歌手 ，华语组合


startRequest = async (id) => {

    let result = await song.requestSong(id);
    let commons = await common.commonRequest(id);
    console.log(result);
    console.log(commons);
}

//startRequest(2080326);

(async () => {

    let result = await singer.singerRequest(1001);
    //fs.writeFile('singerJson.txt',JSON.stringify(result));

    db.connectDB(result);
    console.log('数据写入成功');

})();




