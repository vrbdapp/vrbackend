const express = require("express");
const { updatemywallet } = require("../controllers/updatemywallet");

const postnewuser = express.Router();

console.log("came till here")

postnewuser.post("/updateMyWalls", updatemywallet);


console.log("hers aso")

module.exports = postnewuser;
