var keystone = require('keystone')
var Types = keystone.Field.Types

var User = new keystone.List('User')

var social = require('keystone-social-login')

User.add({
  name: { type: Types.Name, index: true },
  email: { type: Types.Email, index: true },
  password: {type: Types.Password}
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
})

User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin
})

User.defaultColumns = 'name, email, isAdmin'

social.plugin(User)

User.register()
