let mongoose = require('mongoose');

module.exports = {

    'singerSchema': new mongoose.Schema({

        singerId: String, //歌手id
        singerName: String, //歌手名称
        singerType: Number, //歌手类型

    }),

    'songSchema':new mongoose.Schema({

        songId: String,     //歌曲id
        singerId: String,   //歌手id
        songName: String,   //歌曲名称
        commentCount: Number //评论数

    }),

    'commentSchema': new mongoose.Schema({

        commentId: String,      //评论id
        songId: String,         //歌曲id
        commentContent: String, //评论内容
        likeCount: Number,      //点赞数
        creatDate: Number,      //评论时间
        commentator: {
            personId: String,     //用户id
            displayName: String,  //名称
            avatar: String,       //头像
        }

    })

}