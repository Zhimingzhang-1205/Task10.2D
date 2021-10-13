const mongoose = require("mongoose")
const imgsSchema = new mongoose.Schema(
    {
        src:{
            type:String
        },
        title:{
            type:String
        },
        subTitle:{
            type:String
        }
    }
)

module.exports = mongoose.model("imgs", imgsSchema);