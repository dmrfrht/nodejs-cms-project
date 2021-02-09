/** importing modules */
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const {selectOption} = require('./config/customFunctions')
const fileUpload = require('express-fileupload')
const {mongoDbURL, PORT, globalVariables} = require('./config/config')

const app = express()

/** configure mongoose to connect to mongodb */
mongoose.connect(mongoDbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(res => console.log('mongodb connected successfully'))
  .catch(err => console.log('database connection failed'))

/** configure express */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

/** flash and session */
app.use(session({
  secret: 'anysecret',
  saveUninitialized: true,
  resave: true
}))
app.use(flash())

/** global variables */
app.use(globalVariables)

/** file upload middleware */
app.use(fileUpload())

/** setup view engine to use handlebars*/
app.engine('handlebars', hbs({
  defaultLayout: 'default',
  helpers: {select: selectOption}}
  )
)
app.set('view engine', 'handlebars')

/** method override middleware */
app.use(methodOverride('newMethod'))

/** routes */
const defaultRoutes = require('./routes/defaultRoutes')
const adminRoutes = require('./routes/adminRoutes')
app.use('/', defaultRoutes)
app.use('/admin', adminRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
