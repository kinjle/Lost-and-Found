const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/login')  //for login
const router = express.Router();
const cors = require("cors")
const setUserMiddlware = require("./middleware/setuser");

const {User} = require("./models/users");
const userRouter = require("./routes/userRoute");  //for user details 

const {Item} = require("./models/users");
const itemRouter = require("./routes/itemRoute");

const {Response} = require("./models/users");
const responseRouter = require("./routes/responseRoute");

const app = express();
app.use(express.static('public'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(setUserMiddlware);
app.use("/auth", authRoutes);   //for login
app.use("/user", userRouter);    //for user details 
app.use("/lostitemform", itemRouter);
app.use("/response", responseRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/DWIT")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err.message));

app.listen(3000, () => console.log("Server is running"));