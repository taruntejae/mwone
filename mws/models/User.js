const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    skills: {
        type: [String]
    },
    address: {
        type: Object
    }
});

module.exports = model("User", UserSchema);