const { default: mongoose } = require("mongoose");



const dbConnect = () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = mongoose.connect(process.env.MONGODB_URL,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        console.log("Database connected");
      })
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;
