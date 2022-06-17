const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    
    companyName: {
        type: String,
        required: true
    },
    post:{
        type: Array
    }
    
})

const User = mongoose.model('user', UserSchema);
// User.createIndexes();
module.exports = User;