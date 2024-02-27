const express = require('express'); 
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

 
const app = express(); 
//convert data to json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/login",(req,res)=> {
    res.render("login")
});

app.get("/signup",(req,res)=> {
   res.render("signup");
});

//register user
app.post("/signup", async(req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  }

  const existingUser = await collection.findOne({name: data.name});
  if(existingUser) {
    res.send("user already exist. pls find another name.");
  }else{
    const saltRounds= 10;
    const hashedPassword = await bcrypt.hash(data.password,saltRounds);
    data.password=hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata); 
  }
});

//login user
app.post("/login", async(req,res) => {
  try{
    const check = await collection.findOne({name: req.body.username});
    if(!check){
      res.send("user name not found");
    }
    //comp pass
    const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
    if(isPasswordMatch){
      res.render("home");
    }else{
      req.send("wrong password");
    }
     
  }catch
    {
      res.render("home");
  }
});
const port = 3000;
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

