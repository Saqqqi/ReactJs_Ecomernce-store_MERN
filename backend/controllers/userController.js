const User = require('../models/User');

exports.getActiveUsers = async (req, res, next) => {
    try {
        const activeUsers = await User.find({ isActive: true });

        if (activeUsers.length === 0) {
            console.log("No active users found. Please Login");
            return res.status(404).json({
                status: 'error',
                message: 'No active users found'
            });
        }

        console.log("Active Users:", activeUsers);

        res.status(200).json({
            status: 'success',
            data: {
                users: activeUsers
            }
        });
    } catch (err) {
        return next(err);
    }
};

exports.getActiveUserId = async () => {
    try {
        const activeUser = await User.findOne({ isActive: true });

        if (!activeUser) {
            console.log("No active user found. Please log in.");
            return null;
        }

        return activeUser._id;
    } catch (err) {
        throw err;
    }
};
exports.updateUser = async (req, res, next) => {
    console.log("hit");
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password && password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        
        // Update password if changed
        if (password) {
            user.password = password;
        }

        // Save the updated user
        await user.save();

        // Log the updated user data
        console.log('Updated user data:', user);

        // Return success response
        res.status(200).json({ message: 'User details updated successfully' });
    } catch (err) {
        // Handle errors
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
}
