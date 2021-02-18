const mongoose = require("mongoose")
const user = new mongoose.Schema({
  username: String,
  email:String,
  validation:String,
  password: String,
  TokenReset:String,
  foodInfo: Array,
  Activity:Array
})

module.exports = mongoose.model("User",user)
