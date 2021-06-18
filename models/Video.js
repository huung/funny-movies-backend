const { model, Schema } = require("mongoose");

const videoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  url: String,
  email: String,
  createdAt: String,
  votes: {
    up: Number,
    down: Number,
  },
});

module.exports = model("Video", videoSchema);
