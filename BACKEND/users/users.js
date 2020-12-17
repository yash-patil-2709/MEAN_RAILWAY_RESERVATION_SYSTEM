//load express
const express=require('express');
const app=express();

//load cookie parser
const cookieParser=require('cookie-parser');

//sendSms
const sms = require('./sms');

//webtoken
const jwt=require('jsonwebtoken');

//middleware
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());


//load mongoose
const mongoose=require('mongoose');

//connect
mongoose.connect("mongodb+srv://yash123:yash123@cluster0.an7nj.mongodb.net/serviceuser",()=>{
  console.log("User Database Connected Successfully!");
});

//cors
const cors=require('cors');
app.use(cors());

//load model
require("./User");
const User=mongoose.model("User");


//handling errors
const handleErrors=(err)=>{
  console.log(err.message,err.code);
  let errors={username:'',password:''};

  //incorrect email
  if(err.message==="incorrect username"){
    errors.username="INCORRECT USERNAME";
  }

  //incorrect password
  if(err.message==="incorrect password"){
    errors.password="INCORRECT PASSWORD";
  }
  //duplicate errors
  if(err.code===11000){
    errors.username="USERNAME ALREADY REGISTERED";
    return errors;
  }


  return errors;
}





//token generation
const maxAge=7*24*60*60; //3 days
const createToken=(id)=>{
  return jwt.sign({id},"b99 secret",{
    expiresIn:maxAge
  });
}

// function verifyToken(req,res,next){
//   if(!req.headers.authorization){
//     return res.status(401).send('Unauthorized request')
//   }
//
//   let token=req.headers.authorization.split(' ')[1]
//   if(token==='null'){
//     return res.status(401).send('Unauthorized request')
//   }
//   let payload=jwt.verify(token,'b99 secret')
//   if(!payload){
//     return res.status(401).send('Unauthorized request')
//   }
//   req.userId=payload.subject
//   next()
// }

//cookie testing
// app.get('/set-cookies',(req,res)=>{
//     res.cookie('newUser',true);
//     res.cookie('isUser',true,{maxAge:3*60*60*24});   //3 days
//
//     res.send("You got the cookies");
// });
//
// app.get('/read-cookies',(req,res)=>{
//     const cookies=req.cookies;
//     console.log(cookies.newUser);
//
//     res.json(cookies);
// });
// //testing
app.get('/',(req,res)=>{
  res.send("This is our users service");
});

//post users Data--registration
app.post('/user',async(req,res)=>{
  var newUser={
    username:req.body.username,
    password:req.body.password,
    fname:req.body.fname,
    mname:req.body.mname,
    lname:req.body.lname,
    gender:req.body.gender,
    dob:req.body.dob,
    phone:req.body.phone,
    flatno:req.body.flatno,
    societyname:req.body.societyname,
    pincode:req.body.pincode,
    city:req.body.city,
    state:req.body.state,
    country:req.body.country
  }
  //create new user
  //var user=new User(newUser)

  // user.save().then(()=>{
  //   console.log("New User created")
  //   console.log(user);
  //
  //    //token and cookie generation
  //   // const token=createToken(user._id);
  //   // res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
  //   // res.json({user:user._id});
  //
  //
  // }).catch((err)=>{
  //   if (err){
  //     throw err;
  //   }
  // })

  //new post for jwt
  try{
      sms.sendSms();                                //sends sms
      const user=await User.create(newUser);
     const token=createToken(user._id);
     res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
     res.status(201).send({token});
     console.log("New user created with cookie");
  }
  catch(err){
    const errors=handleErrors(err);
    res.status(400).json({errors});
  }
  // res.send("A new user created with success!");
  // console.log(req.body);
});

//login
app.post('/user/login',async(req,res)=>{
  const {username,password}=req.body;

  //new login post for jwt
  try{
    const user=await User.login(username,password);
    const token=createToken(user._id);
    //res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*7000});
    var tokenObj={
      token:token,
      uid:user._id
    }
    res.status(200).send(tokenObj);
    console.log("Registered user");
  }
  catch(err){
    const errors=handleErrors(err);
    res.status(400).json({errors});
    console.log("Not Registered user");
  }
});



//view all Users
app.get('/users',(req,res)=>{

  User.find().then((users)=>{
    res.json(users);
  }).catch(err => {
    if(err){
      throw err;
    }
  })
});

//view by user username useful in booking
// app.get('/user/:name',(req,res)=>{
//    User.find({username:req.params.name},(err,data)=>{
//      if (err) throw err;
//      res.json(data);
//    });
// });

//view by user objectid useful in booking
app.get('/user/:id',(req,res)=>{
  User.findById(req.params.id).then((user)=>{
    if(user){
      res.json(user);
    }else{
      res.send("Invalid id");
    }
  }).catch(err => {
    if(err){
      throw err;
    }
  })
});

//listening to server
app.listen(5555,()=>{
  console.log("Up and running! -- This is our Users Service");
});
