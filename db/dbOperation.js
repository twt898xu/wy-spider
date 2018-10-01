let mongoose = require('mongoose'),
    screma = require('./dbSchema');

let db = mongoose.connect("mongodb://127.0.0.1:27017/wy");

let singerModal = mongoose.model('singer', screma.singerSchema),
    songModel = mongoose.model('song', screma.songSchema),
    commentModal = mongoose.model('comment', screma.commentSchema);

let singer = [{
        singerId: '123',
        singerName: '着成功',
        singerType: 1001,
        songs: [{
                songId: 'aaaa',
                songName: 'aiaiaiai', //歌曲名称
                commentCount: 100 //评论数
            },
            {
                songId: 'bbbb',
                songName: 'bibibibibi', //歌曲名称
                commentCount: 101 //评论数
            }
        ]
    },
    {
        singerId: '123',
        singerName: '吗大力',
        singerType: 1001,
        songs: [{
                songId: 'aaaa',
                songName: 'aiaiaiai', //歌曲名称
                commentCount: 100 //评论数
            },
            {
                songId: 'bbbb',
                songName: 'bibibibibi', //歌曲名称
                commentCount: 101 //评论数
            }
        ]
    }
]

module.exports = {

    /**
     * 保存歌手接口
     * @param { Array ,Object } 歌手对象或对象数组
     */
    saveSinger: function (data) {

        singerModal.create(data, (err) => {

            if (err) {

                console.log('失败  =====  歌手数据存储失败');
                throw err;

            }

            console.log('成功  =====  歌手数据已存储');

        });

    },

    /**
     * 保存歌手接口
     * @param { Array ,Object } 歌曲对象或对象数组
     */
    saveSong: function (data) {

        songModel.create(data, (err) => {

            if (err) {

                console.log('失败  =====  歌曲数据存储失败');
                throw err;

            }

            console.log('成功  =====  歌曲数据已存储');

        });

    },

    /**
     * 保存评论接口
     * @param { Array ,Object } 歌手对象或对象数组
     */
    saveComment: function (data) {

        commentModal.create(data, (err) => {

            if (err) {

                console.log('失败  =====  评论存储失败');
                throw err;

            }

            console.log('成功  =====  评论数据已存储');

        });

    },

    /**
     * 获取所有歌手的id
     */
    findAllSingerId: function () {

        return new Promise((resolve,reject)=>{

            singerModal.find({}, { singerId:1 , _id:0 }, (err, data) => {

                if (err) {
                    console.log('获取所有歌手Id失败！！！');
                    reject(err);
                    throw err;
                }
    
                console.log(`共 ${data.length} 条数据`);
                resolve(data);
    
            })

        });

    },

    /**
     * 获取评论数为-1的所有歌曲
     */
    findAllSongId:function(){

        return new Promise((resolve,reject)=>{

            songModel.find({'commentCount':-1}, { songId:1 }, (err, data) => {

                if (err) {
                    console.log('获取所有歌曲Id失败！！！');
                    reject(err);
                    throw err;
                }
    
                console.log(`共 ${data.length} 首歌曲`);
                resolve(data);
    
            })

        });

    },

    updateSong:function(id,update){

        return new Promise((resolve,reject)=>{

            songModel.update({_id:id},{$set:update},(err)=>{

                if(err){
                    reject(err);
                    throw err;
                }

                console.log('歌曲评论数更新成功',id);
                resolve();

            });  

        });

    }

}