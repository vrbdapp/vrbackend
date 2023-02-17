const mongoose = require("mongoose");

const DailyRoi = mongoose.Schema({
    RoiOwner:{
        default: "null",
        type: "String",
    },
    StepsWalked:{
        default: "null",
        type: "String",
    },
    GiveRoiCoin:{
        default: "null",
        type: "String",
    },
    GiveRoiPercantage:{
        default: "null",
        type: "String",
    },
    PurchasedPackageName:{
        default: "null",
        type: "String",
    },
    PurchasedPackageId:{
        default: "null",
        type: "String",
    },   
    Date:{
        default: "null",
        type: "String",
    },   
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("DailyRo", DailyRoi);
