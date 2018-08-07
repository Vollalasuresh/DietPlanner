const express=require("express");
const router =express.Router();
const passport=require('passport');
const user=require('../models/user')

const isLoggedIn=(req,res,next)=>
{
    if(req.isAuthenticated())
    {
        return next();

    }
    res.redirect('/login');
}


router.get('/signup',(req,res)=>
{
    usererr_msg=req.flash('userExist');
    res.render('signup',{usererr_msg});
})

router.get('/login',(req,res)=>
{
    login_err= req.flash('loginError');
    password_err=req.flash('passwordError');

    res.render('login',{login_err,password_err});
})
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/show',
    failureRedirect:'/signup',
    failureFlash:true,
}))
router.post('/login',passport.authenticate('local.',{
    successRedirect:'/show',
    failureRedirect:'/login',
    failureFlash:true,
}))
router.get('/show',isLoggedIn,(req,res)=>
{
    res.render('show');

})

module.exports=router;



