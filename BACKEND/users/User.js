// const mongoose=require('mongoose');
//
// mongoose.model("User",{
//
//   //credentials
//   username:{
//     type:String,
//     require:true
//   },
//
//   password:{
//     type:String,
//     require:true
//   },
//
//   //personal details
//   fname:{
//     type:String,
//     require:true
//   },
//
//   mname:{
//     type:String,
//     require:true
//   },
//
//   lname:{
//     type:String,
//     require:true
//   },
//
//   gender:{
//     type:String,
//     require:true
//   },
//
//   // (dd/mm/yyyy)
//   dob:{
//     type:String,
//     require:true
//   },
//
//   phone:{
//     type:Number,
//     require:true
//   },
//
//   //address
//   flatno:{
//     type:Number,
//     require:true
//   },
//
//   societyname:{
//     type:String,
//     require:true
//   },
//
//   pincode:{
//     type:Number,
//     require:true
//   },
//
//   city:{
//     type:String,
//     require:true
//   },
//
//   state:{
//     type:String,
//     require:true
//   },
//
//   country:{
//     type:String,
//     require:true
//   }
//
// });

const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
  //credentials
  username:{
    type:String,
    require:true,
    unique:true
  },

  password:{
    type:String,
    require:true
  },

  //personal details
  fname:{
    type:String,
    require:true
  },

  mname:{
    type:String,
    require:true
  },

  lname:{
    type:String,
    require:true
  },

  gender:{
    type:String,
    require:true
  },

  // (dd/mm/yyyy)
  dob:{
    type:String,
    require:true
  },

  phone:{
    type:Number,
    require:true
  },

  //address
  flatno:{
    type:Number,
    require:true
  },

  societyname:{
    type:String,
    require:true
  },

  pincode:{
    type:Number,
    require:true
  },

  city:{
    type:String,
    require:true
  },

  state:{
    type:String,
    require:true
  },

  country:{
    type:String,
    require:true
  },
});

userSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
  next();
});

//static method to login user
userSchema.statics.login=async function(username,password){
  const user=await this.findOne({username});
  if(user){
    const auth=await bcrypt.compare(password,user.password);
    if(auth){
      return user;
    }
    throw Error('incorrect password');

  }
  throw Error('incorrect username');
}

const User=mongoose.model('User',userSchema);
module.exports=User;
