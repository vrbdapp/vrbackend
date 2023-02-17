const mongoose = require("mongoose");

const ShortRecord = new mongoose.Schema({
    RecordOwner: {
        type:"String",
        default:"null"
    },
    AllTimeLevelBusiness: {
        type: Number,
        default:0
    },
    AllTimeDailyBusiness: {
        type: Number,
        default:0
    },
    AllTimeCareerReward: {
        type: Number,
        default:0,
    },
    AllMyDirectPeople: {
        type: Number,
        default:0,
    },
    AllMyDirectBusiness: {
        type: Number,
        default:0,
    }

}, {timestamps: true});

module.exports = mongoose.model("ShortRecordd", ShortRecord);
