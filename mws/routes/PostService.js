const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post");

router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", duplicatePost, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        createdBy: req.body.username,
    });
    try {
        const newPost = await post.save();
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:postId", findPost, (req, res) => {
    res.send(res.post);
});


async function duplicatePost(req, res, next) {
    try {
        const post = await Post.findOne({ title: req.body.title });
        if (post != null) return res.status(400).json({ message: "Post already exists." });
        res.post = post;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function findPost(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.postId)) return res.status(400).json({ message: "Invalid Post ID" });
    try {
        const post = await Post.findById(req.params.postId);

        if (post == null) return res.status(404).json({ message: "Post not found." });
        res.post = post;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;