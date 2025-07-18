const Message = require("../model/Messenger");

// GET ALL MESSAGES
const getMessageData = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate({ path: "from_id", select: "fullname" })
      .populate({ path: "to_user_id", select: "fullname" });

    // Kode formatting Anda tetap sama
    const formattedData = messages.map((msg) => ({
      id: msg._id,
      from_id: msg.from_id._id,
      messages: msg.messages,
      to_user_id: msg.to_user_id._id,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
      Sender: {
        fullname: msg.from_id.fullname,
      },
      Receiver: {
        fullname: msg.to_user_id.fullname,
      },
    }));

    res.status(200).json({
      status: 200,
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      messages: error.message,
    });
  }
};

// SEND A NEW MESSAGE
const sendMessageData = async (req, res) => {
  try {
    const { from_id, to_user_id, messages } = req.body;

    const userMessage = await Message.create({
      from_id,
      to_user_id,
      messages,
    });

    res.status(201).json({
      status: 201,
      message: "Message sent successfully!",
      data: userMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      messages: error.message,
    });
  }
};

// UPDATE A MESSAGE BY ID
const updateMessageData = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({
        status: 400,
        message: "Message content is required for update",
      });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { messages },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        status: 404,
        message: "Message not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Message updated successfully!",
      data: updatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// DELETE A MESSAGE BY ID
const deleteMessageData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        status: 404,
        message: "Message not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Message deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


// Jangan lupa ekspor fungsi baru
module.exports = {
  getMessageData,
  sendMessageData,
  updateMessageData,
  deleteMessageData,
};