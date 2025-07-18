const mongoose = require("mongoose");

const MessengersSchema = new mongoose.Schema(
  {
    from_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to_user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: String,
  },
  { timestamps: true }
);

const Messengers = mongoose.model("Messengers", MessengersSchema);

module.exports = Messengers;
