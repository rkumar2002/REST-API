const express = require('express');
const router = express.Router(); 


router.get('/', (req, res, next) => {
    res.status(200).json({
        msg : 'This is faculty GET request'
    })
})


router.post('/', (req, res, next) =>{
    res.status(200).json({
        msg : 'This is faculty POST request'
    })
})

module.exports = router;