require('dotenv').load()

var keystone = require('keystone')
var social = require('keystone-social-login')

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

social.config({
  keystone: keystone,
  'auto create user': true,
  onAuthenticate: function (req, accessToken, refreshToken, profile, done) {
    console.log('\nLOGIN SUCCESS', arguments)
    done(null)
  },
  providers: {
    twitter: {
      clientID: process.env.TWITTER_CLIENT,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }
  }
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

social.start()
keystone.start()
