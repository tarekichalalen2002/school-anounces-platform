const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbconnect");
const Authrouter = require("./routes/authRoute");
const roomrouter = require('./routes/roomRoute');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", Authrouter);
app.use("/api/room", roomrouter);


app.listen(PORT, () => {
    console.log(`Server is running  at PORT ${PORT}`);
  });
