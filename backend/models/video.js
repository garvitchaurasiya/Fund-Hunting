const mongoose = require('mongoose');
const {Schema} = mongoose;
const VideoSchema = new Schema({
    
    filename: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    equity: {
        type: String,
        required: true
    },
    bids: {
        type: Array
    }
    
})

const Video = mongoose.model('video', VideoSchema);
// User.createIndexes();
module.exports = Video;