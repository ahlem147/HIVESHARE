const User = require('../models/user');
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken')




//j'ai fais appel a partir de server.js lorsque on lance le proje
const createAdminAccount= async()=>{
try {
  let existAdmin = await User.find({role:'admin'});
  if(existAdmin.length==0){
let data ={
    fullname:'ADMIN',
    email : process.env.EMAIL,
    password : process.env.PASS,
    image:'user.png',
    tel:process.env.TEL ,
    role:'admin',
    date: new Date()
}
let admin = new User(data);
//cryptage password
admin.password =bcrypt.hashSync(data.password,10);
await admin.save();
console.log('admin created, u can use the app now :D !!!');

  }
  else{
    console.log('admin already exist')

  }

} catch (error) {
    console.log(error)
}
}
const createUserAccount=async (req,res,fileName)=>{
try {

let {fullname,email,password,tel,tags} = req.body;
tags =JSON.parse(tags);
let user = new User({fullname,email,password,tel,tags});    
user.password =bcrypt.hashSync(password,10);
user.image= fileName;
user.role='user';
user.date = new Date(); 
let result= await user.save();
res.status(200).send(result);
    
} catch (error) {
    console.log(error)
   res.status(500).send(error);
}
}
const signIn= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email:email});
        if(!user){
          return  res.status(401).send('email or password invalid')
        }
        const valid = bcrypt.compareSync(password,user.password)
        if(!valid){
            return  res.status(401).send('email or password invalid')
          }
          else {
            let payload ={
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
                tel:user.tel,
                image:user.image,
                role:user.role,
                tags:user.tags,
                date:user.date,
            }
            let token=jwt.sign(payload,process.env.SECRET_KEY);
            res.status(200).send({myToken:token})
          }
    } catch (error) {
        res.status(500).send(error)
    }
}
const list= async(req,res)=>{
  try {
   let users=await  User.find({role:'user'})
    res.status(200).send(users)
    
  } catch (error) {
    res.status(500).send(error)
  }  
}
const byId=async (req,res)=>{
try {
   let user= await User.findById({_id:req.params.id},{fullname:1,email:1,tel:1,tags:1,image:1});
   //mayjish nabath l pwd
   //ismha project lfaza
   //meth1:{fullname:1,email:1,tel:1,tags:1,image:1}
   //meth2: 
   //user.password=''
   res.status(200).send(user)
   



} catch (error) {
   res.status(500).send(error) 
}
}
const update= async (req,res,fileName)=>{
    try {
        
        let id = req.params.id;
        let data = req.body;
        if (data.tags) {
            try {
                data.tags = JSON.parse(data.tags);
            } catch (parseError) {
                return res.status(400).send({ error: "Invalid JSON format for tags" });
            }
        }
        if(fileName.length > 0){
            data.image = fileName;
        }

        if(data.password){
            data.password = bcrypt.hashSync(data.password, 10);
        }

        let updatedUser = await User.findByIdAndUpdate({_id: id}, data);
        
        res.status(200).send(updatedUser);


    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const deleteUser = async(req,res)=>{
   try {
    let deletedUser = await User.findByIdAndDelete({_id:req.params.id})
    res.status(200).send(deletedUser)
   } catch (error) {
    res.status(500).send(error) 

   } 
}





module.exports={createAdminAccount,createUserAccount,signIn,list,byId,update,deleteUser}