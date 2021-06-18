const { AuthenticationError } = require("apollo-server");

const Video = require("../../models/Video");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getVideos() {
      try {
        const videos = await Video.find().sort({ createdAt: -1 });
        return videos;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async shareVideo(parent, args, context) {
      const user = checkAuth(context);
      const { url } = args;
      const newVideo = new Video({
        url,
        user: user.id,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      const video = await newVideo.save();
      return video;
    },

    async deleteVideo(parent, args, context) {
      const user = checkAuth(context);
      const { videoId } = args;

      try {
        const video = await Video.findById(videoId);
        if (user.email === video.email) {
          await video.delete();
          return "Video removed from list successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
