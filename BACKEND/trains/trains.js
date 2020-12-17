//load express
const express=require('express');
const app=express();

//middleware
const bodyParser=require('body-parser');
app.use(bodyParser.json());

//load mongoose
const mongoose=require('mongoose');

//connect
mongoose.connect("mongodb+srv://yash123:yash123@cluster0.an7nj.mongodb.net/servicetrain",()=>{
  console.log("Train Database Connected Successfully!");
});

//cors
const cors=require('cors');
app.use(cors());

//swagger
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');

const swaggerOptions={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'Train Management API',
      version:'1.0.0',
      description:'Train Api for train management',
      contact:{
        name:'Yash Patil',
        url:'http://jakeperalta.com',
        email:'jakeperalta@gmail.com'
      },
      servers:["http://localhost:4545"]
    }
  },
  apis:["trains.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));


require("./Train");
const Train=mongoose.model("Train");


// app.get('/',(req,res)=>{
//   res.send("This is our trains service");
// });


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
 * /train:
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
app.post('/train',(req,res)=>{
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
  //create new train
  var train=new Train(newTrain)

  train.save().then(()=>{
    console.log("New Train created")
  }).catch((err)=>{
    if (err){
      throw err;
    }
  })
  res.send("A new train created with success!");
//  console.log(req.body);
});


/**
 * @swagger
 * /trains:
 *  get:
 *   summary: get all trains
 *   description: get all trains
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */
//view all Trains
app.get('/trains',(req,res)=>{

  Train.find().then((trains)=>{
    res.json(trains);
  }).catch(err => {
    if(err){
      throw err;
    }
  })
});

/**
 * @swagger
 * /train/{trainname}:
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

//view by train trainname
app.get('/train/:name',(req,res)=>{
   Train.find({trainname:req.params.name},(err,data)=>{
     if (err) throw err;
     res.json(data);
   });
});

//view by train objectid
// app.get('/trains/:id',(req,res)=>{
//   Train.findById(req.params.id).then((train)=>{
//     if(train){
//       res.json(train);
//     }else{
//       res.send("Invalid id");
//     }
//   }).catch(err => {
//     if(err){
//       throw err;
//     }
//   })
// });

/**
 * @swagger
 * /train/{source}/{destination}:
 *  get:
 *   summary: get train by train name
 *   description: get  train by train name
 *   parameters:
 *    - in: path
 *      name: source
 *      schema:
 *       type: string
 *       required: true
 *       description: source of train
 *       example: 'Mumbai'
 *    - in: path
 *      name: destination
 *      schema:
 *       type: string
 *       required: true
 *       description: destination of train
 *       example: 'Pune'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */
//train searching using source and destination
app.get('/train/:source/:destination',(req,res)=>{
   Train.find({source:req.params.source , destination:req.params.destination},(err,data)=>{
     if (err) throw err;
     res.json(data);
   });
});

//train searching using all parameters useful in booking
// app.get('/train/:trainno/:trainname/:source/:destination/:depttime/:arrivename/:fare',(req,res)=>{
//    Train.find({trainno:req.params.trainno,trainname:req.params.trainname,source:req.params.source , destination:req.params.destination,depttime:req.params.depttime,arrivename:req.params.arrivename,fare:req.params.fare},(err,data)=>{
//      if (err) throw err;
//      res.json(data);
//    });
// });

//delete all trains
// app.delete('/train',(req,res)=>{
//   Train.deleteMany({}).then(()=>{
//     Train.find().then((trains)=>{
//       res.json(trains);
//     })
//   })
// });

/**
 * @swagger
 * /train/{trainname}:
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
app.delete('/train/:name',(req,res)=>{
  Train.deleteOne({trainname:req.params.name}).then(()=>{
    Train.find({}).then((trains)=>{
      res.json("Deleted Successfully");
    })
  })
});

/**
 * @swagger
 * /train/{trainname}:
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
//update train details by entering trainname and see the updated value
app.put('/train/:name',(req,res)=>{
  Train.findOneAndUpdate({_id:req.params.name},req.body).then(()=>{
    Train.findOne({trainname:req.params.name}).then((trains)=>{
      res.json(trains); //returns updated train
    })
  })
});

// app.put('/train/:name',(req,res)=>{
//   const isExist=Train.findOne({trainname:req.params.name});
//   if(isExist){
//     Train.findOneAndUpdate({trainname:req.params.name},req.body).then(()=>{
//       Train.findOne({trainname:req.params.name}).then((trains)=>{
//         res.json(trains); //returns updated train
//       })
//     })
//   }
//     else{
//       var newTrain={
//         trainno:req.body.trainno,
//         trainname:req.body.trainname,
//         source:req.body.source,
//         destination:req.body.destination,
//         seatavail:req.body.seatavail,
//         depttime:req.body.depttime,
//         arrivename:req.body.arrivename,
//         fare:req.body.fare
//       }
//       //create new train
//       var train=new Train(newTrain)
//
//       train.save().then(()=>{
//         console.log("New Train created")
//       }).catch((err)=>{
//         if (err){
//           throw err;
//         }
//       })
//       res.send("A new train created with success!");
//       console.log(req.body);
//     }
//
//
// });


app.listen(4545,()=>{
  console.log("Up and running! -- This is our Trains Service");
});

module.exports = app;
