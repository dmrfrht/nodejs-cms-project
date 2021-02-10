module.exports = {
  mongoDbURL: 'mongodb+srv://rootUser:0246813579@cluster0.qfc0j.mongodb.net/cms?retryWrites=true&w=majority',
  PORT: process.env.port || 3000,
  globalVariables: (req, res, next) => {
    res.locals.success_message = req.flash('success-message')
    res.locals.error_message = req.flash('error-message')

    res.locals.user = req.user || null

    next()
  }
}