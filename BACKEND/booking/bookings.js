//load express
const express=require('express');
const app=express();

//mailOptions
const mail=require('./mail');

//communication with other services
const axios=require('axios');

//middleware
const bodyParser=require('body-parser');
app.use(bodyParser.json());

//load mongoose
const mongoose=require('mongoose');

//connect
mongoose.connect("mongodb+srv://yash123:yash123@cluster0.an7nj.mongodb.net/servicebooking",()=>{
  console.log("Booking Database Connected Successfully!");
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
      title:'Booking Management API',
      version:'1.0.0',
      description:'Booking Api for Railway reservation management',
      contact:{
        name:'Yash Patil',
        url:'http://jakeperalta.com',
        email:'jakeperalta@gmail.com'
      },
      servers:["http://localhost:2222"]
    }
  },
  apis:["bookings.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

require("./Booking");
const Booking=mongoose.model("Booking");



app.get('/',(req,res)=>{
  res.send("This is our booking service");
});

//starts from asks for soure and destination and returns that particular train
//book train by entering source and destination (using train microservice here)

/**
 * @swagger
 * /booking/{source}/{destination}:
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

app.get('/booking/:source/:destination',(req,res)=>{
  axios.get("http://localhost:4545/train/"+req.params.source+"/"+req.params.destination).then((response)=>{
    res.json(response.data);
  }).catch(err => {
    if(err){
      throw err;
    }
  })
});

/**
 * @swagger
 * /b/{trainname}:
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

//get train by trainName
app.get('/b/:trainname',(req,res)=>{
  axios.get("http://localhost:4545/train/"+req.params.trainname).then((response)=>{
    res.json(response.data);
  }).catch(err => {
    if(err){
      throw err;
    }
  })
});

//booking done from here--stored in bookings database
var pnr=900;
app.post('/booking/:uid/:trainname',(req,res)=>{
  let trainname=req.params.trainname;

  var newBooking={
    pnr:pnr,
    uid:mongoose.Types.ObjectId(req.params.uid),

    train:{
      trainNo:'',
      trainName:trainname,
      Source:'',
      Destination:'',
      deptTime:'',
      arriveTime:'',
      Fare:'',

  }
}
  axios.get("http://localhost:4545/train/"+trainname).then((response)=>{
    const tr=response.data[0];
    console.log(tr);
    newBooking={
      pnr:pnr,
      uid:req.params.uid,

      train:{

        trainNo:tr.trainno,
        trainName:tr.trainname,
        Source:tr.source,
        Destination:tr.destination,
        deptTime:tr.depttime,
        arriveTime:tr.arrivename,
        Fare:tr.fare


      },


    }
console.log(newBooking);
    //new booking
       var booking=new Booking(newBooking)

       booking.save().then(()=>{
         let emailMsg=mail.sendMail();
         console.log("New Booking Done")
       }).catch((err)=>{
         if (err){
           throw err;
         }
       })
       res.json("A new booking done with success!");
       pnr++;
   });

});


//get booking by objectid
//for ticket summary
app.get('/book/:id',(req,res)=>{
  Booking.findById(req.params.id).then((booking)=>{
    res.json(booking);
  })
});


/**
 * @swagger
 * /booking/{pnr}:
 *  get:
 *   summary: get booking by pnr
 *   description: get booking by pnr
 *   parameters:
 *    - in: path
 *      name: pnr
 *      schema:
 *       type: number
 *       required: true
 *       description: pnr of train
 *       example: 900
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */

//get booking by pnr
//check pnr status
app.get('/booking/:pnr',(req,res)=>{
  Booking.findOne({pnr:req.params.pnr}).then((booking)=>{
    res.json(booking);
  })
});


//get all bookings done by same user
//multiple bookings
app.get('/bookings/:uid',(req,res)=>{
  var obj=mongoose.Types.ObjectId(req.params.uid);

  var arr=[];

  Booking.find({uid:obj}).then((response)=>{
    for(let i of response){
      let bookObj={
        pnr:i.pnr,
        train:i.train
      }
      arr.push(bookObj);
    }
    res.send(arr);
  }).catch((err)=>{
    if(err){
      throw err;
    }
  })
});

/**
 * @swagger
 * /bookings:
 *  get:
 *   summary: get all bookings
 *   description: get all bookings
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */

//get all bookings --useful in admins// app.get('/bookings',(req,res)=>{
app.get('/bookings',(req,res)=>{
  Booking.find().then((bookings)=>{
    res.json(bookings);
  }).catch((err)=>{
    if(err){
      throw err;
    }
  })
});

/**
 * @swagger
 * /cancelling/{pnr}:
 *  delete:
 *   summary: delete booking
 *   description: delete booking
 *   parameters:
 *    - in: path
 *      name: pnr
 *      schema:
 *       type: number
 *       required: true
 *       description: pnr of booking
 *       example: 901
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */

//cancelling ticket
app.delete('/cancelling/:pnr',(req,res)=>{
  Booking.deleteOne({pnr:req.params.pnr}).then((response)=>{
    res.json("Booking cancelled successfully!")
  })
})



app.listen(2222,()=>{
  console.log("Up and running! -- This is our Bookings Service");
});

module.exports = app;

// //using axios
//
// //booking
// let id=900;
// app.post('/booking/:uname/:tname',(req,res)=>{
//   var newBooking={
//     pnr:id,
//     tname:mongoose.Types.ObjectId(req.body.tname),
//     uname:mongoose.Types.ObjectId(req.body.uname)
//   }
//   //new booking
//   var booking=new Booking(newBooking)
//
//   booking.save().then(()=>{
//     console.log("New Booking Done")
//   }).catch((err)=>{
//     if (err){
//       throw err;
//     }
//   })
//   res.send("A new booking done with success!");
//   console.log(req.body);
//   id++;
// });
// //booking done till now
//
//
// //get all bookings done till now but in form of objectid --workingg
// app.get('/bookings',(req,res)=>{
//   Booking.find().then((bookings)=>{
//     res.json(bookings);
//   }).catch((err)=>{
//     if(err){
//       throw err;
//     }
//   })
// });
//
// //check pnr status but output in form of objectid --workingg
// app.get('/bookings/:pnr',(req,res)=>{
//   Booking.find({pnr:req.params.pnr}).then((booking)=>{
//       res.json(booking);
//   }).catch((err)=>{
//     if(err){
//       throw err;
//     }
//   })
// });
//
// //get booking based on who booked the ticket and which train has been booked using object id       --workinggggggg
// app.get('/booking/:id',(req,res)=>{
//   Booking.findById(req.params.id).then((booking)=>{
//     if(booking){
//       axios.get("http://localhost:5555/user/"+booking.uname).then((response)=>{
//         var bookingObject={userName:response.data.username,trainName:'',trainno:'',source:'',destination:'',depttime:'',arrivetime:'',fare:''}
//
//         axios.get("http://localhost:4545/trains/"+booking.tname).then((response)=>{
//           bookingObject.trainName=response.data.trainname,
//           bookingObject.trainno=response.data.trainno,
//           bookingObject.source=response.data.source,
//           bookingObject.destination=response.data.destination,
//           bookingObject.depttime=response.data.depttime,
//           bookingObject.arrivetime=response.data.arrivename,
//           bookingObject.fare=response.data.fare
//
//           res.json(bookingObject)
//         })
//       })
//     }else{
//       res.send("Invalid Booking")
//     }
//   })
// });
//
// //check pnr status
// app.get('/book/:pnr',(req,res)=>{
//   Booking.findOne({pnr:req.params.pnr}).then((booking)=>{
//     // res.json(booking);
//     axios.get("http://localhost:5555/user/"+booking.uname).then((response)=>{
//       var bookingObject={userName:response.data.username,trainName:'',trainno:'',source:'',destination:'',depttime:'',arrivetime:'',fare:''}
//
//       axios.get("http://localhost:4545/trains/"+booking.tname).then((response)=>{
//         bookingObject.trainName=response.data.trainname,
//         bookingObject.trainno=response.data.trainno,
//         bookingObject.source=response.data.source,
//         bookingObject.destination=response.data.destination,
//         bookingObject.depttime=response.data.depttime,
//         bookingObject.arrivetime=response.data.arrivename,
//         bookingObject.fare=response.data.fare
//         console.log(bookingObject);
//         res.json(bookingObject)
//       })
//     })
//   })
// });
