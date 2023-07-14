const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  first_name: String,
  last_name: String,
  other_names: String,
  gender: String,
  email: String,
  phone: String,
  password: String,
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
    Editor: Number,
    SuperAdmin: Number,
  },
  refreshToken: String,
});

module.exports = mongoose.model('Customer', customerSchema);
