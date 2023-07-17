const express = require('express');
const router = express.Router();
const Customer = require('../model/Customer');

// GET /api/customers
router.get('/', (req, res) => {
  res.send('This is the /customers route');
});

// GET /api/customers/:id
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`This is the /customers/${req.params.id} route`);
});

// POST /api/customers
router.post('/', async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;

  if (!email || !first_name || !last_name || !phone) {
    return res
      .status(400)
      .json({ message: 'Please fill out all the required fields' });
  }

  try {
    const duplicateCustomer = await Customer.findOne({ email }).exec();

    if (duplicateCustomer) {
      return res.status(409).json({
        message: `Another user with email ${email} already exists, login instead`,
      });
    }

    // Create and store new user
    const result = await Customer.create({
      first_name,
      last_name,
      email,
      phone,
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
});

module.exports = router;
