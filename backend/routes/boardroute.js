const express=require('express');
const router = express.Router();
const {byid,deleteboard,update} = require('../controllers/boardController');
const { route } = require('./projectroute');

router.get('/byid/:id',byid);
router.delete('/delete/:id',deleteboard);
router.put('/update/:id',update)










module.exports=router