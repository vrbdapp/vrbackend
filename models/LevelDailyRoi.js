const mongoose = require("mongoose");``

const LevelDailyRoi = mongoose.Schema({
    ROIOwner:{
        default: "null",
        type: "String",
    },
    
    LevelEarned:{
        default: "null",
        type: "String",
    },
    coinEarned:{
        default: "null",
        type: "String",
    },
    EarnedPercantage:{
        default: "null",
        type: "String",
    },
    rewardGetFrom:{
        default: "null",
        type: "String",
    },
    rewardGetFromName:{
        default: "null",
        type: "String",
    }
   
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("leveldailyroi", LevelDailyRoi);


// export default mongoose.models.leveldailyroi || mongoose.model("leveldailyroi", LevelDailyRoi);