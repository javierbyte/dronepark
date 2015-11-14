require('dotenv').load()

var keystone = require('keystone')

keystone.init({
  'name': 'dronodromo',
  'brand': 'dronodromo',

  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User'

})

keystone.import('models')

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
})

keystone.set('routes', require('./routes'))

keystone.set('nav', {
  'enquiries': 'enquiries',
  'users': 'users'
})

keystone.start()
