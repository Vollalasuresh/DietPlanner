const express = require("express");
const router = express.Router();
const passport = require('passport');
const user = require('../models/user');
const dp = require('../models/dp');

d = new dp();


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
    res.render('insert', { u });
})

router.post('/insertplan', (req, res) => {

    console.log("From POst", req.body.day);
    dp.findOne({ day: req.body.day }, (err, day) => {
        console.log("from dp.findOnde",day)
        if (day)
        {
            res.redirect('/editplans');
        }
        else
        {

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
        d.save().then(items => {
            res.redirect('/show')
        }).catch(err => {
            res.redirect('/')
            
        })
        }

    })


})

router.get('/editplans',(req,res)=>
{
    u=req.user
    console.log("edit plans")
    res.render('insert', {u})
     dp.find().then(dps=>
    {
        console.log(dps)
    })
})

router.get('/viewplans',(req,res)=>
{
    res.render('view');
    
})

module.exports = router;



