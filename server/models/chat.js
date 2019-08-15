const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

module.exports = mongoose.model('Chat', schema);
