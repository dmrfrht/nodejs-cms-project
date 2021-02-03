module.exports = {
  index: (req, res) => {
    res.render('default/index')
  },

  getLogin: (req, res) => {
    res.render('default/login')
  },

  postLogin: (req, res) => {
    res.send('tebrikler login oldunuz..')
  },

  getRegister: (req,res) => {
    res.render('default/register')
  },

  postRegister: (req, res) => {
    res.send('tebrikler kayit oldunuz..')
  },
}