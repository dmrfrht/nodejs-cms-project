const Post = require('../Models/PostModel').Post
const Category = require('../Models/CategoryModel').Category

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

  deletePost: (req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(deletedPost => {
        req.flash('success-message', `The post ${deletedPost.title} has been deleted`)
        res.redirect('/admin/posts')
      })
  },

  getCategories: (req, res) => {
    Category.find()
      .lean()
      .then(cats => {
        res.render('admin/category/index', {cats: cats})
      })
  },

  createCategory: (req, res) => {
    let categoryName = req.body.name

    if (categoryName) {
      const newCategory = new Category({
        title: categoryName
      })

      newCategory.save()
        .then(category => {
          res.status(200).json(category)
        })
    }
  }
}