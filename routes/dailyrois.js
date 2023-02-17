const express = require("express");
const { checkTeamRecord } = require("../controllers/mydaily-roi");

const teamRouter = express.Router();

teamRouter.post("/mydailyroi", checkTeamRecord);

module.exports = teamRouter;


