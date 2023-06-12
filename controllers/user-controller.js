const User = require('../models/user-model.js');

const getUserDetail = async (req, res, next) => {
  try {
    const {userId} = req.body;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({message: "User Created", status: "success", user});
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getUserDetail,
    createUser
};
