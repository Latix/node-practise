const express = require('express');
const router  = express.Router();
const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');

router.get(`/add-blog`, (req, res) => {
    const blog = new Blog({
        title: "Arm's Dealers Part two",
        snippet: "This is wild",
        body: "more about my blog",
    });

    blog.save().then((result) => {
        res.send(result);
    }).catch((err) => console.log(err));
});

router.get(`/all-blogs`, blogController.blog_index);

router.get(`/single-blog/:id`, (req, res) => {
    Blog.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch((err) => console.log(err));
});

module.exports = router;
