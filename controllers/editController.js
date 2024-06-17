const { User } = require('../models');
const path = require('path');
const fs = require('fs');

const editProfile = async (req, res) => {
  const { id } = req.params;
  console.log('User ID:', id);

  // Parse id to integer
  const userId = parseInt(id);

  // Ensure userId is a valid number
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const {
    YourName,
    email,
    userName,
    password,
    dateOfBirth,
    presentAddress,
    permanentAddress,
    postalCode,
    country,
  } = req.body;

  let profileImage;
  if (req.file) {
    profileImage = req.file.filename;
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (profileImage && user.profileImage) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', user.profileImage);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error('Failed to delete old profile image:', err);
      });
    }

    await user.update({
      YourName,
      email,
      userName,
      password,
      dateOfBirth,
      presentAddress,
      permanentAddress,
      postalCode,
      country,
      profileImage: profileImage || user.profileImage,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the profile' });
    console.error(error);
  }
};

module.exports = { editProfile };
