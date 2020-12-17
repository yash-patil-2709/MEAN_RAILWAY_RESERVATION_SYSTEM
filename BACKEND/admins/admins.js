//load express
const express=require('express');
const app=express();

//communication with other services
const axios=require('axios');

//middleware
const bodyParser=require('body-parser');
app.use(bodyParser.json());

//load cookie parser
const cookieParser=require('cookie-parser');

//webtoken
const jwt=require('jsonwebtoken');

app.use(cookieParser());

//cors
const cors=require('cors');
app.use(cors());

//load mongoose
const mongoose=require('mongoose');

//connect
mongoose.connect("mongodb+srv://yash123:yash123@cluster0.an7nj.mongodb.net/serviceadmin",()=>{
  console.log("Admin Database Connected Successfully!");
});

//swagger
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');

const swaggerOptions={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'Admin Management API',
      version:'1.0.0',
      description:'Admin Api for train management',
      contact:{
        name:'Yash Patil',
        url:'http://jakeperalta.com',
        email:'jakeperalta@gmail.com'
      },
      servers:["http://localhost:7070"]
    }
  },
  apis:["admins.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

require("./Admin");
const Admin=mongoose.model("Admin");

app.get('/',(req,res)=>{
  res.send("This is our admins service");
});

//handling errors
const handleErrors=(err)=>{
  console.log(err.message,err.code);
  let errors={adminname:'',password:''};

  //incorrect email
  if(err.message==="incorrect adminname"){
    errors.adminname="ADMIN NAME DOES NOT EXIST";
  }

  //incorrect password
  if(err.message==="incorrect password"){
    errors.password="INCORRECT PASSWORD";
  }

  return errors;
}

//token generation
const maxAge=7*24*60*60; //7 days
const createToken=(id)=>{
  return jwt.sign({id},"friends secret",{
    expiresIn:maxAge
  });
}

//add new admin
app.post('/admin/login',async(req,res)=>{
  const {adminname,password}=req.body;

  //new login post for jwt
  try{
    const admin=await Admin.login(adminname,password);
    const token=createToken(admin._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*7000});
    res.status(200).send({token});
    console.log("Authorized admin");
  }
  catch(err){
    const errors=handleErrors(err);
    res.status(400).json({errors});
    console.log("Unauthorized admin");
  }
});

//find all admins
// app.get('/admins',(req,res)=>{
//
//   Admin.find().then((admins)=>{
//     res.json(admins);
//   }).catch(err => {
//     if(err){
//       throw err;
//     }
//   })
// });

//view by admin key
// app.get('/admin/:key',(req,res)=>{
//    Admin.find({key:req.params.key},(err,data)=>{
//      if (err) throw err;
//      res.json(data);
//    });
// });

//delete all admins
// app.delete('/admin',(req,res)=>{
//   Admin.deleteMany({}).then(()=>{
//     Admin.find().then((admins)=>{
//       res.json(admins);
//     })
//   })
// });

//delete admin by key
// app.delete('/admin/:key',(req,res)=>{
//   Admin.deleteOne({key:req.params.key}).then(()=>{
//     Admin.find({}).then((admins)=>{
//       res.send("Deleted Successfully");
//     })
//   })
// });
//
// //update admin details by entering key and see the updated value
// app.put('/admin/:key',(req,res)=>{
//   Admin.findOneAndUpdate({key:req.params.key},req.body).then(()=>{
//     Admin.findOne({key:req.params.key}).then((admins)=>{
//       res.json(admins); //returns updated admin
//     })
//   })
// });

//playing with trains Database
/**
 * @swagger
 * /admin/trains:
 *  get:
 *   summary: get all trains
 *   description: get all trains
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */

//view all trains
app.get('/admin/trains',(req,res)=>{
    axios.get("http://localhost:4545/trains").then((response)=>{
      res.send(response.data);
    }).catch(err => {
      if(err){
        throw err;
      }
    })

});

//view all registered users
// app.get('/admin/:key/users',(req,res)=>{
//   Admin.find({key:req.params.key}).then((admins)=>{
//     axios.get("http://localhost:5555/users").then((response)=>{
//       res.send(response.data);
//     }).catch(err => {
//       if(err){
//         throw err;
//       }
//     })
//   }).catch(err => {
//     if(err){
//       throw err;
//     }
//   })
// });

//view all Bookings
app.get('/admin/bookings',(req,res)=>{
    axios.get("http://localhost:2222/bookings").then((response)=>{
      res.send(response.data);
    }).catch(err => {
      if(err){
        throw err;
      }
    })

});

/**
 * @swagger
 * /admin/{trainname}:
 *  get:
 *   summary: get train by train name
 *   description: get  train by train name
 *   parameters:
 *    - in: path
 *      name: trainname
 *      schema:
 *       type: string
 *       required: true
 *       description: name of train
 *       example: 'Mumbai Express'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */
//get train by trainname
app.get('/admin/:train',(req,res)=>{
    axios.get("http://localhost:4545/train/"+req.params.train).then((response)=>{
      res.send(response.data);
    }).catch(err => {
      if(err){
        throw err;
      }
    })

});

/**
 * @swagger
 * definitions:
 *  Train:
 *   properties:
 *    trainno:
 *     type: number
 *     description: number of the train
 *     example: 987
 *    trainname:
 *     type: string
 *     description: name of the train
 *     example: 'Geetanjali Express'
 *    source:
 *     type: string
 *     description: source of the train
 *     example: 'Mumbai'
 *    destination:
 *     type: string
 *     description: destination of the train
 *     example: 'Pune'
 *    seatavail:
 *     type: number
 *     description: seat availability of the train
 *     example: 109
 *    depttime:
 *     type: string
 *     description: departure time of the train
 *     example: '17:08'
 *    arrivename:
 *     type: string
 *     description: arrival time of the train
 *     example: '18:00'
 *    fare:
 *     type: number
 *     description: Fare of the train
 *     example: 1010
 */


/**
 * @swagger
 * /admin/trains:
 *  post:
 *   summary: create train
 *   description: create train for the people
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/definitions/Train"
 *   responses:
 *    200:
 *     description: train created successully
 *    500:
 *     description: failure in creating train
 */

// //add train by trainname
app.post('/admin/trains',(req,res)=>{
    var newTrain={
      trainno:req.body.trainno,
      trainname:req.body.trainname,
      source:req.body.source,
      destination:req.body.destination,
      seatavail:req.body.seatavail,
      depttime:req.body.depttime,
      arrivename:req.body.arrivename,
      fare:req.body.fare
    }
    axios.post("http://localhost:4545/train",newTrain).then((response)=>{
      res.json(response.data);
    }).catch(err=>{
      if(err){
        throw err;
      }
    })
});


/**
 * @swagger
 * /admin/{trainname}:
 *  put:
 *   summary: update train
 *   description: update train
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: trainname
 *      schema:
 *       type: string
 *      required: true
 *      description: name of train
 *      example: 'Geetanjali Express'
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: "#/definitions/Train"
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/definitions/Train"
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/definitions/Train"
 */
 //edit train
app.put('/admin/:train',(req,res)=>{
    axios.put("http://localhost:4545/train/"+req.params.train,req.body).then((response)=>{
      res.json(response.data);
    }).catch(err=>{
      if(err){
        throw err;
      }
    })
});

/**
 * @swagger
 * /admin/{trainname}:
 *  delete:
 *   summary: delete train
 *   description: delete train
 *   parameters:
 *    - in: path
 *      name: trainname
 *      schema:
 *       type: string
 *       required: true
 *       description: name of train
 *       example: 'Mumbai Express'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */
//delete train by trainname
app.delete('/admin/:train',(req,res)=>{
    axios.delete("http://localhost:4545/train/" +req.params.train).then((response)=>{
      res.json("Deleted Successfully");
    }).catch(err=>{
      if(err){
        throw err;
      }
    })
});

//delete all Trains
// app.delete('/admin/trains',(req,res)=>{
//     axios.delete("http://localhost:4545/train").then((response)=>{
//       res.send("Deleted all trains successfully");
//     }).catch(err => {
//       if(err){
//         throw err;
//       }
//     })
// });


app.listen(7070,()=>{
  console.log("Up and running! -- This is our Admins Service");
});

module.exports = app;
