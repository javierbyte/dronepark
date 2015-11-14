var keystone = require('keystone')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  const locals = res.locals

  var User = keystone.list('User')

  locals.section = 'home'

  locals.formData = {
    email: '',
    pass: ''
  }

  view.on('post', {
    action: 'user.create'
  }, function (next) {
    const newUser = new User.model({
      name: {
        first: locals.formData.first,
        last: locals.formData.last
      }
    })

    console.log('\nnew user register', req.body)

    var updater = newUser.getUpdateHandler(req)

    updater.process(req.body, {
      fields: 'email, password',
      flashErrors: true,
      logErrors: true
    }, function (err, result) {
      if (err) {
        console.log('ERROR:', err)
      } else {
        req.flash('success', 'Account created. Please sign in.')
        return res.redirect('/panel')
      }
      next()
    })
  })

  view.render('index')
}
