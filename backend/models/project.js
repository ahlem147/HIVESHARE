const mongoose = require('mongoose')
const Project=mongoose.model('Project',{
   name: {type:String},
    description:{
        type:String,

    },
    
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    files:{
        type:Array,
        default:[]
    },
    date:{
        type:Date
    },
   budget :{
    type:Number
},
client :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Client'
},
status :{
    type:String
},  
//team array fih les ids de users team(eli ykhdlmou fel proj hkaa)
team:{
    type:[{type:mongoose.Types.ObjectId, ref:'User'}]
},

})




module.exports=Project;