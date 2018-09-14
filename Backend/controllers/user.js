const express = require("express");
const router = express.Router();
const passport = require('passport');
const dp = require('../models/dp');

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
    // console.log(req.params)
    res.render('show', { u:req.user });

})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

router.get('/insertplan', (req, res) => 
{
    a = false;
    
    res.render('insert', { u:req.user, z:req.url,x:'Add your Diet Plans' });
})

router.post('/insertplan', (req, res) =>
{
        dp.findOne({ day: req.body.day, userName: req.user.name }, (err, days) => {
        if (days) {
            a = true;
            req.flash("dayError", "Your plan is Already added for  ");
            day_err = req.flash("dayError")
            res.render('insert', { u:req.user, day_err, days, a });
        }
        if (!days) {
            d = new dp();
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
            d.userName = req.user.name;
            d.save().then(items => {
                res.redirect('/show')
            }).catch(err => {
               res.redirect('/')

            })
        }

    })
})

router.get('/editplans', (req, res) => {
    res.render('days', { u :req.user.name,y:req.url,type:'Edit Plans'})
})

router.get('/editplans/:a', (req, res) => {
    dp.findOne({ day: req.params.a, userName: req.user.name }).then(data => {
        if (data == null) {
            a = true;
            res.render('editor', { data ,day:req.params.a});
        }
        if (data != null) {
            a = false;
            res.render('editor', { data });
        }
    }).catch(err => console.log(err))
})

router.post('/update', (req, res) => {
    dp.findOne({ day: req.body.day, userName: req.user.name }).then(data => 
        {
            data.bf.item1 = req.body.item1;
            data.bf.item2 = req.body.item2;
            data.bf.item3 = req.body.item3;

            data.ln.item1 = req.body.item4;
            data.ln.item2 = req.body.item5;
            data.ln.item3 = req.body.item6;

            data.dn.item1 = req.body.item7;
            data.dn.item2 = req.body.item8;
            data.dn.item3 = req.body.item9;
            
            data.save().then(p => 
                {
                    res.redirect('/show');
                }).catch(err => {console.log(err)});
    })

})

router.get('/viewplans', (req, res) => 
{

    res.render('days',{y:req.url,type:"View Plans",u:req.user.name});
})

router.get('/viewplans/:a', (req, res) => 
{
    dp.findOne({ day: req.params.a, userName: req.user.name }).then(dps => {
        if (dps == null) 
        {
            a = true;
            res.render('plan', { u: req.user.name, day: req.params.a })
        }
        if (dps != null) 
        {

            bfs = Object.values(dps.bf).slice(1, 4);
            lns = Object.values(dps.ln).slice(1, 4);
            dns = Object.values(dps.dn).slice(1, 4);
            res.render('plan', { u: req.user.name, day: req.params.a, dps, bfs, lns, dns });
        }

    }).catch(err => console.log(err))

})

router.get('/deleteplans',(req,res)=>
{
    res.render('days',{y:req.url,type:"Delete Plans",u:req.user.name})
})

router.get('/deleteplans/:a',(req,res)=>
{
    dp.remove({day:req.params.a,userName:req.user.name}).then(()=>
    {
        console.log("removed")
        res.redirect('/show')
    }).catch(err=>console.log(err))
})
module.exports = router;



