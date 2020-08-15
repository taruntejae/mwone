const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Todo = require('../models/Todo');

/* Get all todos */
router.get("/", /* validateToken,  */async (req, res) => {
    try {
        // const allTodos = await (await Todo.find()).filter(todo => todo.createdBy === res.username);
        const allTodos = await (await Todo.find());
        res.status(200).json(allTodos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* GET specific todo */
router.get("/:id", /* validateToken,  */getTodo, async (req, res) => {
    if (res.todo.createdBy/*  === res.username */) {
        res.status(200).json(res.todo);
    } else {
        res.status(200).json([]);
    }
});

/* DELETE specific todo */
router.delete("/:id", /* validateToken,  */getTodo, async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndRemove(res.todo._id);
        res.status(200).json({ message: "Successfully deleted.", deletedTodo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* POST create todo */
router.post("/", /* validateToken,  */async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        createdBy: req.body.createdBy
    });
    try {
        if (await Todo.findOne({ title: req.body.title }) != null) res.status(400).json({ message: "Todo already exists." });
        const newTodo = await todo.save();
        res.status(201).json({ message: "TODO successfully created." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* POST update todo */
router.put("/update", /* validateToken,  */async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.todo._id)) res.status(400).json({ message: "Invalid todo ID" });
    try {
        if (await Todo.findOne({ title: req.body.todo.title }) != null) return res.status(400).json({ message: "Todo title already taken" });
        const todo = await Todo.findOneAndUpdate({ _id: req.body.todo._id }, req.body.todo);
        if (todo == null) return res.status(400).json({ message: "Unable to update todo." });
        res.status(200).json({ message: "Todo updated successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* Middleware */
async function getTodo(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo == null) return res.status(404).json({ message: "Cannot find TODO" });
        res.todo = todo;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function validateToken(req, res, next) {
    const authHeaders = req.headers['authorization'];
    const accessToken = authHeaders && authHeaders.split(" ")[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ message: err.message });
        res.username = payload.user.username;
        next();
    });

}

module.exports = router;