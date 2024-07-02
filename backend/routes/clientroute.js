const express=require('express');
const router = express.Router();
const {create,byid,list,deletclient,update} = require('../controllers/clientController')
const multer = require('multer');
let fileName='';
const myStorage=multer.diskStorage({
    destination:'./uploades',
    filename:(req,file,redirect)=>{
fileName=Date.now()+'.'+file.mimetype.split('/')[1];
redirect(null,fileName)
    }
})
const upload = multer({storage:myStorage})
router.post('/create',upload.single('image'),(req,res)=>{
    create(req,res,fileName);
    fileName='';
})
router.get('/byid/:id',byid);
router.get('/list',list);

router.delete('/delete/:id',deletclient);
router.put('/update/:id',upload.single('image'),(req,res)=>{
    update(req,res,fileName);
    fileName='';
})










module.exports=router