const express = require("express");
const { careerRewardController } = require("../controllers/updatethisuserdata");

const postnewuser = express.Router();

console.log("came till here")

postnewuser.post("/postN", careerRewardController);


console.log("hers aso")

module.exports = postnewuser;
