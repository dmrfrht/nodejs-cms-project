const Post = require('../Models/PostModel').Post

module.exports = {
  index: (req, res) => {
    res.render('admin/index')
  },

  getPosts: (req, res) => {
    Post.find()
      .lean()
      .then(posts => {
        console.log(posts)
        res.render('admin/posts/index', {posts: posts})
      })
  },

  submitPost: (req, res) => {
    const commentAllowed = req.body.allowComments ? true : false

    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      allowComments: commentAllowed
    })

    newPost.save()
      .then(post => {
        req.flash('success-message', 'Post created successfully')
        res.redirect('/admin/posts')
      })
  },

  createPost: (req, res) => {
    res.render('admin/posts/create')
  },

  editPost: (req, res) => {
    const id = req.params.id

    Post.findById(id)
      .lean()
      .then(post => {
        console.log(post)
        res.render('admin/posts/edit', {post: post})
      })
  },
}