const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/backendproj3')
.then(()=>{
    console.log('connect to db')
})
.catch(()=>{
    console.log('error in db connexion')

})




/**
 * users : name,lastname,email,posts:[{title:'abc' , desc:'azerti'}]
 */