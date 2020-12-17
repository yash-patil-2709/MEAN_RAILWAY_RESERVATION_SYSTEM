  const mongoose=require('mongoose');

  mongoose.model("Train",{

    trainno:{
      type:Number,
      require:true
    },

    trainname:{
      type:String,
      require:true
    },

    source:{
      type:String,
      require:true
    },

    destination:{
      type:String,
      require:true
    },

    seatavail:{
      type:Number,
      require:true
    },

    depttime:{
      type:String,
      require:true
    },

    arrivename:{
      type:String,
      require:true
    },

    fare:{
      type:Number,
      require:true
    }

  });
