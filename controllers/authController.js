const Customer = require('../model/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400) // Bad request
      .json({ message: 'Please provide an email and password' });
  }
  // Check if user already exists
  const foundCustomer = await Customer.findOne({ email: email }).exec();
  if (!foundCustomer) {
    return res.status(401).json({
      message: 'User not found, please check your email and try again',
    }); // Unauthorized
  }

  // Evaluate password
  const match = await bcrypt.compare(password, foundCustomer.password);

  if (match) {
    res.status(200).json({
      message: 'Login successful',
      first_name: foundCustomer.first_name,
      last_name: foundCustomer.last_name,
      email: foundCustomer.email,
      phone: foundCustomer.phone,
    });
  } else {
    return res.status(401).json({
      message: 'Incorrect password',
    }); // Unauthorized
  }
};

const handleRefresh = async (req, res) => {
  const { accessToken } = req.body;
  // Verify access token
  try {
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!verified) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    const email = verified.UserInfo.email;
    // Find user in DB
    const foundCustomer = await Customer.findOne({ email: email }).exec();
    res.status(200).json({ ...foundCustomer._doc, accessToken: accessToken });
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

module.exports = { handleLogin, handleRefresh };
