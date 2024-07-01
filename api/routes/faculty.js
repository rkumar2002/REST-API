const express = require('express');
const router = express.Router(); 

const Faculty = require('../model/faculty');
const mongoose = require('mongoose');


// POST 

router.post('/', (req, res, next) => {
    const faculty = new Faculty({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        gender : req.body.gender,
        subj : req.body.subj
    });

    faculty.save()
    
    .then(result => {
        console.log(result);
        res.status(200).json({
            facultyData : result
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
})


// GET

router.get('/', (req, res, next) => {
    Faculty.find()
    
    .then(result => {
        console.log(result);
        res.status(200).json({
            facultyData : result
        })
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})



module.exports = router;