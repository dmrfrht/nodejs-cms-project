const Post = require('../Models/PostModel').Post;
const Category = require('../Models/CategoryModel').Category;

module.exports = {
  index: async (req, res) => {
    const posts = await Post.find().lean()
    const cats = await Category.find().lean()

    res.render('default/index', { posts: posts, cats: cats })
  },

  getLogin: (req, res) => {
    res.render('default/login')
  },

  postLogin: (req, res) => {
    res.send('tebrikler login oldunuz..')
  },

  getRegister: (req, res) => {
    res.render('default/register')
  },

  postRegister: (req, res) => {
    res.send('tebrikler kayit oldunuz..')
  },
}