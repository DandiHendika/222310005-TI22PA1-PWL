require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DBConnect = require("./config/MongoDBConnection");

const app = express();
const PORT = process.env.APP_PORT || 3030;

const userRoute = require("./routes/UserRoute");
const messengersRoute = require("./routes/MessengerRoute");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/messages", messengersRoute);

app.listen(PORT, (req, res) => {
  DBConnect();
  console.log(`Server is listening on http://localhost:${PORT}`);
});
