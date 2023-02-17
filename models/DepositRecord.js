const mongoose = require("mongoose");


const DepositRecordSchema = new mongoose.Schema({

    RecordOwner:{
        default: "null",
        type: "String",
    },
    OldWallet:{
        default: "null",
        type: "String",
    },
    DepositAmount:{
        default: "null",
        type: "String",
    },
    Commision:{
        default: "null",
        type: "String",
    },
    LykaToken:{
        default: "null",
        type: "String",
    },
    TransactionHash:{
        default: "null",
        type: "String",
    },
    Date:{
        default: "null",
        type: "String",
    }
},
{
  timestamps: true,
});

module.exports = mongoose.model("DepositFund", DepositRecordSchema);

