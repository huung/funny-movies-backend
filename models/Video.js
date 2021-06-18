const { model, Schema } = require("mongoose");

const videoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  url: String,
  email: String,
  createdAt: String,
  votes: [
    {
      email: String,
      status: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Video", videoSchema);
