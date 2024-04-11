const User = require('../models/User');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    user.isActive = true;
    await user.save();

    req.userId = user._id;

    res.status(200).json({ message: 'Login successful', user: user.firstName });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { firstName } = req.body;

    console.log('Incoming logout request:', req.body);

    await User.findOneAndUpdate({ firstName }, { $set: { isActive: false } });
    console.log('User status updated to inactive');

    res.sendStatus(200);
    console.log('Logout successful');
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Failed to log out', error: error.message });
  }
};
