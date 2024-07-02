const express=require('express');
const router = express.Router();
const {create,byid,list,deleteproject,update,preview} = require('../controllers/projectController')
const multer = require('multer');
const {verifyWebtoken} = require ('../config/auth/middlware')
fileNames = [];
const myStorage=multer.diskStorage({
    destination:'./uploades',
    filename:(req,file,redirect)=>{
        fl= Date.now()+'.'+file.mimetype.split('/')[1]
        fileNames.push(fl);
        redirect(null,fl);
    }

})
const upload = multer({storage:myStorage})
router.post('/create',verifyWebtoken,upload.any('files'),(req,res)=>{
    create(req,res,fileNames);
    fileNames=[]
});
router.get('/byid/:id',byid);
router.get('/list',list);
router.get('/preview/:id',preview);
router.delete('/delete/:id',verifyWebtoken,deleteproject);
router.put('/update/:id',verifyWebtoken,upload.any('files'),(req,res)=>{
    update(req,res,fileNames);
    fileNames=[]
});










module.exports=router 