let song = require('./spider/song'),
    common = require('./spider/comment'),
    singer = require('./spider/singer'),
    db = require('./db/dbOperation'),
    fs = require('fs');

let catIds = [1001, 1002, 1003, 2001, 2002, 2003, 6001, 6002, 6003, 7001, 7002, 7003, 4001, 4002, 4003]; //华语男歌手 ，华语女歌手 ，华语组合 ,欧美男 欧美女 欧美组合

startRequest = async (id) => {

    let result = await song.requestSong(id);
    let commons = await common.commonRequest(id);
    console.log(result);
    console.log(commons);
}

// (async () => {

//     let result = await singer.singerRequest(1001);
//     //fs.writeFile('singerJson.txt',JSON.stringify(result));

//     db.connectDB(result);
//     console.log('数据写入成功');

// })();

// for (let singerId of catIds) {

//     (async () => {

//         let result = await singer.singerRequest(singerId);
//         db.saveSinger(result);

//     })()

// }

// function sleep() {

//     return new Promise((resolve) => {

//         setTimeout(() => {

//             resolve('1231');

//         }, 5000);

//     });

// }

// let singerList = [],
//     songCount = 1;
// async function startSongRequest() {

//     if (!singerList.length) return false;
//     console.log(`第 ${songCount++} 位歌手`);

//     let data = await song.requestSong(singerList.shift().singerId);
//     await db.saveSong(data);
//     startSongRequest();

// }

// (async () => {

//     singerList = await db.findAllSingerId();
//     startSongRequest();

// })();

let songList = [],
    songCount = 1;
async function startCommentRequest() {

    if (!songList.length || songCount === 4000 ) {

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