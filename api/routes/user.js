const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

const User = require('../model/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
    // General Syntax -

    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //     // Store hash in your password DB    
    // });

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            return res.status(500).json({
                error : err
            });
        }
        else{

            const user = new User({
                _id : new mongoose.Types.ObjectId,
                username : req.body.username,
                password : hash,
                phone : req.body.phone,
                email : req.body.email,
                userType : req.body.userType
            })
            
            user.save()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err
                })
            })

        }
    });


})


router.post('/login', (req, res, next) => {
    User.find({username : req.body.username})
    .exec()
    .then(user => {
        if(user.length < 1){ // that means no such user found
            return res.status(401).json({
                msg : "User not found"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(!result){
                res.status(401).json({
                    msg : "Wrong Password"
                })
            }
            else{ // token generation for successful login
                const token = jwt.sign({      // tokens are generally made with the info of the user itself
                    username : user[0].username,
                    userType : user[0].userType,
                    email : user[0].email,
                    phone : user[0].phone
                },
                'this is secret key',
                {
                    expiresIn : "24h"
                }
            );
            res.status(200).json({
                msg : "Login successful",
                token : token    // whatever token is generated, it can be decoded to see the payload token info at https://jwt.io 
            })
            }
        })
    })

    .catch(err => {
        res.status(400).json(err);
    })
})













module.exports = router;