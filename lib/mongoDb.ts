import mongoose from "mongoose";
const MongoDbUrl = process.env.MONGODB_URL!;

export const connectDb = async (): Promise<void> => {
  const isConnected = mongoose.connection.readyState;
  console.log("MongoDbUrl : ", MongoDbUrl);
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }
  console.log("Connecting to mongoDb.......");
  try {
    await mongoose.connect(MongoDbUrl, {
      dbName: "Brocelle_Admin",
      bufferCommands: false,
    });

    console.log("MongoDb is connected");
  } catch (error) {
    console.error("Error connecting to mongoDb", error);
    throw new Error("Error connecting to mongoDb");
  }
};
