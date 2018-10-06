let song = require('./spider/song'),
    common = require('./spider/comment'),
    singer = require('./spider/singer'),
    db = require('./db/dbOperation'),
    fs = require('fs');

let catIds = [1001, 1002, 1003, 2001, 2002, 2003, 6001, 6002, 6003, 7001, 7002, 7003, 4001, 4002, 4003]; //华语男歌手 ，华语女歌手 ，华语组合 ,欧美男 欧美女 欧美组合

//抓取歌手信息
for (let catId of catIds) {

    (async () => {

        let result = await singer.singerRequest(catId);
        db.saveSinger(result);

    })()

}


//抓取歌曲信息
let singerList = [],
    songCount = 1;
async function startSongRequest() {

    if (!singerList.length) return false;
    console.log(`第 ${songCount++} 位歌手`);

    let data = await song.requestSong(singerList.shift().singerId);
    await db.saveSong(data);
    startSongRequest();

}

(async () => {

    singerList = await db.findAllSingerId();
    startSongRequest();

})();


//抓取评论信息
let songList = [],
    songCount = 1;
async function startCommentRequest() {

    if (!songList.length ) {

        console.log(' ===== 抓取完毕 ====== ');
        return false;

    };
    console.log(`第 ${songCount++} 首歌`);
    let song = songList.shift();

    let data = await common.commonRequest(song.songId);
    await db.saveComment(data.hotComments);
    await db.updateSong(song._id,{commentCount:data.totalComent});
    startCommentRequest();

}

(async () => {

    songList = await db.findAllSongId();
    startCommentRequest();

})();