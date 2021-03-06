const express=require('express');
const bodyParser=require('body-parser');
const path= require('path');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const pug=require('pug')
const mongoose=require('mongoose');
const passport=require('passport');
const ms=require('connect-mongo')(session);
const flash=require('express-flash');


mongoose.connect('mongodb://localhost:27017/DietPlanner');

require('./config/passport');

const app=express();
// const indexRoute=require('./controllers/index')

app.set('view engine','pug');



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname+'/public/')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret:'Diet',
    resave:true,
    saveUninitialized:true,
    store: new ms({mongooseConnection:mongoose.connection})
    
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(require('./controllers/index'));
app.use(require('./controllers/user'));

app.listen(5000,()=>console.log("Server is Running at port 5000"));