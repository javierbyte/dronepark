var keystone = require('keystone')
const _ = require('lodash')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  var locals = res.locals

  locals.section = 'home'
  locals._ = _

  keystone.list('User').model.find().exec(function (err, userList) {
    if (err) return console.log(err)
    locals.socialUsers = _(userList).map('twitterLoginId').compact().value()

    view.render('index')
  })
}
