var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017");
var userSchema = new mongoose.Schema({
  email: String,
  salt: String,
  hash: String
});
exports.User = mongoose.model("user", userSchema);