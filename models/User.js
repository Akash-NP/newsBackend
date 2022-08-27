const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    },
    name : String,
    headline : String,
    content : String,
    category : String,
    youtubeVideoId : String,
    post_date: {
        type : Date,
        default : new Date()
    }
}, {
    collection: 'users'
})
module.exports = mongoose.model('User', userSchema)