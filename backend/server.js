const express = require('express')
const app = express();
const cors = require('cors');

app.use(express.json());
require('./config/connect')
const boardRoute = require('./routes/boardroute')
const clientRoute = require('./routes/clientroute')
const projectRoute = require('./routes/projectroute')
const userRoute = require('./routes/userroute');
const { createAdminAccount } = require('./controllers/userController');
app.use(cors());

require('dotenv').config()

app.use('/board', boardRoute)
app.use('/user', userRoute)
app.use('/project', projectRoute)
app.use('/client', clientRoute)

app.use('/files', express.static('./uploades'));
 














app.listen(3000, () => {
    console.log('server woork');
    createAdminAccount();
})