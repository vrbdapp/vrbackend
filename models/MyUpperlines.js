const mongoose = require("mongoose");

const MyUpperline = mongoose.Schema({

    MyUserid:{
        default: "null",
        type: "String",
    },
    MyUpperLines:{
        default: "null",
        type: "String",
    }
},
{
  timestamps: true,
}
)
module.exports = mongoose.model("myupperli", MyUpperline);

