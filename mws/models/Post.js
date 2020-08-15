const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
});

module.exports = model("Post", PostSchema);