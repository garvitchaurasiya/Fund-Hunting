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
    }
    
})

const Video = mongoose.model('video', VideoSchema);
// User.createIndexes();
module.exports = Video;