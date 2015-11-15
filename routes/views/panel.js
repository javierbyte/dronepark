var keystone = require('keystone')
const _ = require('lodash')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  var locals = res.locals

  locals._ = _
  locals.userdata = req.user || {}

  if (!_.get(req, ['user', '_id'])) {
    res.redirect(301, '/social/twitter/login')
    return
  }

  keystone.list('User').model.find().exec(function (err, userList) {
    if (err) return console.log(err)
    locals.socialUsers = _(userList).map('twitterLoginId').compact().value()

    view.render('panel')
  })
}
