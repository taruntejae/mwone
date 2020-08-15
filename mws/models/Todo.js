const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
    title: { type: String, required: true,},
    completed: { type: Boolean, default: false, },
    createdBy: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model("Todo", TodoSchema);