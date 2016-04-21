var mongoose = require('mongoose');
var crypto = require('crypto');
var utils = require('../config/utils');

var Schema = mongoose.Schema;
var oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
];

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '', unique: true, lowercase: true },
  username: { type: String, default: '', unique: true, lowercase: true },
  userThing: {type: String, ref: "UserThing"},
  provider: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {}
});

var validatePresenceOf = value => value && value.length;



/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */

// the below validations only apply if you are signing up traditionally

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'El. pašto adresas yra privalomas');


UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return utils.validateWhitespaces(email);
}, 'El. pašto adrese negali būti tarpų');


UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return utils.validateEmail(email);
}, 'Blogas el. pašto adresas');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) fn(true);
  
  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'El. pašto adresas jau yra užregistruotas');



UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  if (username.length < 6){
    return false;
  } else { return true}
}, 'Vartotojo vardas turi būti nors 6 raidžių');

UserSchema.path('username').validate(function (username, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) fn(true);
  
  // Check only when it is a new user or when username field is modified
  if (this.isNew || this.isModified('username')) {
    User.find({ username: username }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Vartotojo vardas yra naudojamas');

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  return utils.validateWhitespaces(username);
}, 'Vartotojo varde negali būti tarpų');


UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  if(this._password.length < 6){
    return false;
  } else {
    return true;
  }
}, 'Slaptažodis turi būti nors 6 raidžių/skaičių');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return utils.validateWhitespaces(this._password);
}, 'Slaptažodyje negali būti tarpų');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();
  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Neteisingas slaptažodis'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider);
  },
  
  
//check if passwords match 
  setPassword: function (var1, var2) {
  if (var1 === var2) {
    this.password = var1;
    return true;
  }
  this.invalidate('passwordConfirmation',{ path: "passwordConfirmation", message: "Slaptažodžiai turi būti vienodi"});
  return false;
}
  
  
};

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    console.dir(options.criteria);
    console.dir(options.select);
    return this.findOne(options.criteria)
      .lean(true)
      .select(options.select)
      .exec(cb);
  }
};

module.exports = mongoose.model('User', UserSchema);
