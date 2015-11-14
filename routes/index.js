var keystone = require('keystone')
var middleware = require('./middleware')
var importRoutes = keystone.importer(__dirname)

keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

var routes = {
  views: importRoutes('./views')
}

exports = module.exports = function (app) {
  app.get('/', routes.views.index)
  app.post('/', routes.views.index)
  app.all('/contact', routes.views.contact)

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
}
