const express = require("express");
const router = express.Router();
const passport = require('passport');
const user = require('../models/user');
const dp = require('../models/dp');

// d = new dp();


const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();

    }
    res.redirect('/login');
}


router.get('/signup', (req, res) => {
    usererr_msg = req.flash('userExist');
    res.render('signup', { usererr_msg });
})

router.get('/login', (req, res) => {
    login_err = req.flash('loginError');
    password_err = req.flash('passwordError');

    res.render('login', { login_err, password_err });
})
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/show',
    failureRedirect: '/signup',
    failureFlash: true,
}))
router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/show',
    failureRedirect: '/login',
    failureFlash: true,
}))
router.get('/show', isLoggedIn, (req, res) => {
    u = req.user;

    res.render('show', { u });

})
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

router.get('/insertplan', (req, res) => {
    u = req.user;
    a=false;
    res.render('insert', { u, a});
})

router.post('/insertplan', (req, res) => {

    u=req.user;

    console.log("From POst", req.body.day);
    dp.findOne({ day: req.body.day ,userId:req.user.id}, (err, days) => {
        console.log("from dp.findOnde",days)
        if (days)
        {
            a=true;
            req.flash("dayError","Your plan is Already added for  ");
            day_err=req.flash("dayError")
            console.log("inside if day",day_err);
            res.render('insert',{u,day_err,days,a});
        }
        if(!days)
        {
            d= new dp();

            console.log("inside if not day",d)
            
        d.day = req.body.day
        d.bf.item1 = req.body.item1;
        d.bf.item2 = req.body.item2;
        d.bf.item3 = req.body.item3;
        d.ln.item1 = req.body.item4;
        d.ln.item2 = req.body.item5;
        d.ln.item3 = req.body.item6;
        d.dn.item1 = req.body.item7;
        d.dn.item2 = req.body.item8;
        d.dn.item3 = req.body.item9;
        d.userId = req.user.id;
        console.log("after storing d",d)
        d.save().then(items => {
            res.redirect('/show')
        }).catch(err => {
            console.log("from post",err)
            res.redirect('/')
            
        })
        }

    })


})

router.get('/editplans/',(req,res)=>
{
    u=req.user;
    console.log("edit plans",req.params.name);
   
    //  dp.findOne({day:req.body.day}).then(dps=>
    // {
        // console.log('from edit route',dps,req.body.day,dps.day);
        res.render('edit',{u})
    // })
})


router.get('/viewplans',(req,res)=>
{
     res.render('view');
})

router.get('/viewplans/:a',(req,res)=>
{
    dp.findOne({day:req.params.a,userId:req.user.id}).then(dps=>
    {
        console.log("Viewing a day's plan ",dps)
        bfs=Object.values(dps.bf).slice(1,4);
        console.log(bfs)
        lns=Object.values(dps.ln).slice(1,4);
        dns=Object.values(dps.dn).slice(1,4);
        res.render('plan',{dps,bfs,lns,dns});

    }).catch(err=>console.log(err))
   
})
module.exports = router;



