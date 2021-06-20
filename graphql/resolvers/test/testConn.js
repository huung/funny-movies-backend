import mongoose from "mongoose";

export const createTestConn = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:admin123@cluster0.u93ff.mongodb.net/funnymovies?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return mongoose.connection;
};
