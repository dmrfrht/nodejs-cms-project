/** importing modules */
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

/** configure mongoose to connect to mongodb */
mongoose.connect('mongodb+srv://rootUser:0246813579@cluster0.qfc0j.mongodb.net/cms?retryWrites=true&w=majority', {
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

/** routes */
app.get('/', (req, res) => {
  res.send('Hello world');
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
})
