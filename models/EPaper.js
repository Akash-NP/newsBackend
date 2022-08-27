const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ePpaerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    },
    
    headline : String,
    content : String,

}, {
    collection: 'ePaper'
})
module.exports = mongoose.model('EPaper', ePpaerSchema)