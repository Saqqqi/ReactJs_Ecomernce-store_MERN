const User = require('../models/User');

const isActiveUser = async (req, res, next) => {
  try {
    const activeUsers = await User.find({ isActive: true });

    if (!activeUsers.length) {
      return res.status(403).json({ 
        message: 'No active users found. Please log in to access this resource' 
      });
    }

    // Assuming there is only one active user for simplicity
    const activeUser = activeUsers[0];

    // Attach the active user's _id to the request object
    req.activeUserId = activeUser._id;

    next(); 
  } catch (error) {
    console.error("Error in isActiveUser middleware:", error);
    res.status(500).json({ 
      message: 'Something went wrong. Please try again later.' 
    });
  }
};

module.exports = isActiveUser;
