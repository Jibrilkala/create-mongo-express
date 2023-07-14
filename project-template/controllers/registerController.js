const Customer = require('../model/Customer');
const bcrypt = require('bcrypt');
const axios = require('axios');

const handleNewUser = async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  if (!email || !password || !first_name || !last_name || !phone) {
    return res
      .status(400)
      .json({ message: 'Please fill out all the required fields' });
  }

  const duplicateCustomer = await Customer.findOne({ email: email }).exec();

  if (duplicateCustomer) {
    return res.status(409).json({
      message: `Another user with email ${email} already exists, login instead`,
    });
  }

  //  Try catch block
  try {
    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and Store new user
    const result = await Customer.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: 'User created successfully',
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      phone: result.phone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
