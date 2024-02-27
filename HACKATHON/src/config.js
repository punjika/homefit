const mongoose = require('mongoose'); 
const connect = mongoose.connect("mongodb://localhost:27017/login");

connect.then(() => {
    console.log("database connected successfully");
})
.catch(()=> {
    console.log("database can not be connected successfully");
});
// creating a schema
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//create mod and collction
const collection = new mongoose.model("users",loginSchema);
module.exports=collection;