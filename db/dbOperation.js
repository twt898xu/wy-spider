let mongoose = require('mongoose'),
    screma = require('./dbSchema');

mongoose.connect("mongodb://127.0.0.1:27017/wy");

let singerModal = mongoose.model('singer', screma.singerSchema),
    songModel = mongoose.model('song', screma.songSchema),
    commentModal = mongoose.model('comment', screma.commentSchema);

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

    /**
     * 更新歌曲的评论数量
     * @param {String} 歌曲id
     * @param {Object} 更新内容
     */
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