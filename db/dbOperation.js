let mongoose = require('mongoose'),
    screma = require('./dbSchema');

let db = mongoose.connect("mongodb://127.0.0.1:27017/wy");

let singerModal = mongoose.model('singer', screma.singerSchema),
    songSchema = mongoose.model('song', screma.songSchema),
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

        songSchema.create(data, (err) => {

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

    }

}