const app=require('express')();
const bodyParser=require('body-parser');
const path= require('path');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const pug=require('pug')

// const indexRoute=require('./controllers/index')

app.set('view engine','pug');


app.use(require('./controllers/index'));
app.use(require('./controllers/users'))

app.listen(3000,()=>console.log("Server is Running at port 3000"));