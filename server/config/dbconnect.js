const { default: mongoose } = require("mongoose");
const dbConnect = () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = mongoose.connect(process.env.REMOTE_MONGODB_URL,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    })
    .then(
      () => {
        console.log("Database connected");
      })
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
