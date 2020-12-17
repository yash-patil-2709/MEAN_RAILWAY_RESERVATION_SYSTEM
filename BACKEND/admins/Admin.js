// const mongoose=require('mongoose');
//
// mongoose.model("Admin",{
//
//   adminname:{
//     type:String,
//     require:true
//   },
//
//   key:{
//     type:Number,
//     require:true
//   },
//
//   password:{
//     type:String,
//     require:true
//   }
//
// });

 const mongoose=require('mongoose');
 const bcrypt=require('bcrypt');
 const adminSchema=new mongoose.Schema({
   adminname:{
       type:String,
       require:true,
       unique:true
      },

      key:{
        type:Number,
       require:true
      },

     password:{
     type:String,
       require:true
     },
 });


 //fire a function after doc saved to db
 // adminSchema.post('save',function(doc,next){
 //   console.log("NEW ADMIN WAS CREATED & SAVED",doc);
 //   next();
 // });

//fire a function before doc saved to db
adminSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
  next();
});

//static method to login admin
adminSchema.statics.login=async function(adminname,password){
  const admin=await this.findOne({adminname});
  if(admin){
    const auth=await bcrypt.compare(password,admin.password);
    if(auth){
      return admin;
    }
    throw Error('incorrect password');

  }
  throw Error('incorrect adminname');
}

 const Admin=mongoose.model('Admin',adminSchema);
 module.exports=Admin;
