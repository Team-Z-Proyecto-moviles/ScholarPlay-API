const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug");

const crypto = require("crypto");

const StudentSchema = new Schema({ 
 name: {
    type: String,
    trim: true,
    required: true,
    unique: true
 },
 hashedPassword: {
    type: String,
    required: true
 },
 email: {
    type: String,
    required: true,
    trim: true,
    unique: true
 },
 salt: {
   type: String
 },
 tokens: {
   type: [String],
   default: []
 }
}, { timestamps: true });

StudentSchema.methods = {
   encryptPassword: function (password) {
      if(!password) return "";

      try{
         const encryptedPassword = crypto.pbkdf2Sync(
            password,
            this.salt,
            1000, 64,
            `sha512`
         ).toString("hex")

         return encryptedPassword;
      }catch(error){
         debug({error});
         return "";
      }
   },
   makeSalt: function () {
      return crypto.randomBytes(16).toString("hex")
   },
   comparePassword: function (password) {
      return this.hashedPassword === this.encryptPassword(password);
   }
}

StudentSchema.virtual("password")
.set(function(password = crypto.randomBytes(16).toString()){
  if(!password) return;

  this.salt = this.makeSalt()
  this.hashedPassword = this.encryptPassword(password)
})

module.exports = Mongoose.model("Student", StudentSchema);