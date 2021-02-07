const Post = require('../Models/PostModel').Post
const Category = require('../Models/CategoryModel').Category

module.exports = {
  index: (req, res) => {
    res.render('admin/index')
  },

  getPosts: (req, res) => {
    Post.find()
      .lean()
      .populate('category')
      .then(posts => {
        res.render('admin/posts/index', {posts: posts})
      })
  },

  submitPost: (req, res) => {
    const commentAllowed = req.body.allowComments ? true : false

    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      allowComments: commentAllowed,
      category: req.body.category
    })

    newPost.save()
      .then(post => {
        req.flash('success-message', 'Post created successfully')
        res.redirect('/admin/posts')
      })
  },

  createPost: (req, res) => {
    Category.find()
      .lean()
      .then(cats => {
        res.render('admin/posts/create', {cats: cats})
      })
  },

  editPost: (req, res) => {
    const id = req.params.id

    Post.findById(id)
      .lean()
      .then(post => {

        Category.find()
          .lean()
          .find()
          .then(cats => {
            res.render('admin/posts/edit', {post: post, cats: cats})
          })
      })
  },

  editPostSubmit: (req, res) => {
    const commentAllowed = req.body.allowComments ? true : false

    const id = req.params.id

    Post.findById(id)
      .then(post => {
        post.title = req.body.title
        post.status = req.body.status
        post.allowComments = commentAllowed
        post.description = req.body.description
        post.category = req.body.category

        post.save()
          .then(updatedPost => {
            req.flash('success-message', `The post ${updatedPost.title} has been updated`)
            res.redirect('/admin/posts')
          })
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
