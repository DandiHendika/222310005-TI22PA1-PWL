const User = require("../model/User");

const getAllData = async (req, res) => {
  try {
    const data = await User.find();

    res.status(200).json({
      status: 200,
      message: "Success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const submitData = async (req, res) => {
  try {
    const { username, password, nip, fullname } = req.body;

    await User.create({
      username,
      password,
      nip,
      fullname,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      status: 201,
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      status: 200,
      message: `ID ${userId} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.findById(userId);

    res.status(200).json({
      status: 200,
      message: "Success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: "Username and Password is required!",
      });
    }

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Username and Password is not registered!",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Success!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      messages: error.message,
    });
  }
};

const checkConnection = (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "API Connected!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getAllData,
  checkConnection,
  submitData,
  deleteData,
  getById,
  signIn,
};
