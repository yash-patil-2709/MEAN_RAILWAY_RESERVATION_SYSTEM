const mongoose=require('mongoose');

//done using axios
// mongoose.model("Booking",{
//
//   pnr:{
//     type:Number,
//     require:true
//   },
//
//   tname:{
//     type:mongoose.SchemaTypes.ObjectId,
//     require:true
//   },
//
//   uname:{
//     type:mongoose.SchemaTypes.ObjectId,
//     require:true
//   }
//
//
// });

//done using creating different Schema
mongoose.model('Booking',{
  pnr:{
       type:Number,
       require:true
    },

  uid:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
  },

  train:{


    trainNo:{
      type:Number,
      require:true
    },

    trainName:{
      type:String,
      require:true
    },

    Source:{
      type:String,
      require:true
    },

    Destination:{
      type:String,
      require:true
    },

    deptTime:{
      type:String,
      require:true
    },

    arriveTime:{
      type:String,
      require:true
    },

    Fare:{
      type:Number,
      require:true
    }

  }

})
