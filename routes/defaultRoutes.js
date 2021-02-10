const express = require('express')
const router = express.Router()
const defaultController = require('../controllers/defaultController')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../Models/UserModel').User

router.all('*', (req, res, next) => {
  req.app.locals.layout = 'default'

  next()
})

router.route('/')
  .get(defaultController.index)

/** defining local strategy */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, done) => {

  User.findOne({email: email})
    .then(user => {
      if (!user) {
        return done(null, false, req.flash('error-message', 'User not found with this email'))
      }

      bcrypt.compare(password, user.password, (err, passwordMatched) => {
        if (err)
          return err

        if (!passwordMatched)
          return done(null, false, req.flash('error-message', 'Invalid username or password'))

        return done(null, user, req.flash('success-message', 'Login successful'))
      })
    })
}))

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.route('/login')
  .get(defaultController.getLogin)
  .post(passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
    session: true
  }), defaultController.postLogin)

router.route('/register')
  .get(defaultController.getRegister)
  .post(defaultController.postRegister)

router.route('/post/:id')
  .get(defaultController.singlePost)


module.exports = router
