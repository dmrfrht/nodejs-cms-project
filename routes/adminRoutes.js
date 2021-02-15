const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const {isUserAuthenticated} = require('../config/customFunctions')

router.all('*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin'

  next()
})

router.route('/')
  .get(adminController.index)

/** Posts */

router.route('/posts')
  .get(adminController.getPosts)

router.route('/posts/create')
  .get(adminController.createPost)
  .post(adminController.submitPost)

router.route('/posts/edit/:id')
  .get(adminController.editPost)
  .put(adminController.editPostSubmit)

router.route('/posts/delete/:id')
  .delete(adminController.deletePost)

/** Categories */

router.route('/category')
  .get(adminController.getCategories)
  .post(adminController.createCategory)

router.route('/category/edit/:id')
  .get(adminController.editCategoryGetRoute)
  .post(adminController.editCategoryPostRoute)

/** Comments */
router.route('/comment')
  .get(adminController.getComments)
  .post(adminController.createComment)


module.exports = router
