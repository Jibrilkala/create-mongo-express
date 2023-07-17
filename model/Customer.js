const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Customer', customerSchema);
