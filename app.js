require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db.js");
const teamRouter = require("./routes/team-router.js");
const dailyroi = require("./routes/dailyrois.js");
const careerRewardRouter = require("./routes/career-reward-router");
const PostNewUsers = require("./routes/PostNewUsers");
const updatemywallet = require("./routes/updatemywallet");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

connectToDB();
app.use("/api/team", teamRouter);
app.use("/api/dailyroi", dailyroi);
app.use("/api/career-reward", careerRewardRouter);
app.use("/api/postUsersData", PostNewUsers);
app.use("/api/updateWallet", updatemywallet);



module.exports = app;
