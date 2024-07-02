const express = require('express');
const router = express.Router(); 

const Student = require('../model/student');   // where the schema of the student collection is defined

const mongoose = require('mongoose');   // included here mainly so that it can be used to generate the automatic id 
const student = require('../model/student');



// Flow - We first go to postman and URL 'localhost:3000/student' and go to the POST option. Then in the body we write the data we want to save in the json format. Then we click the 'Send' button, it runs the below 'post' command. It then creates an object of Student type and store the data collected from the postman. Then by 'student.save()' it saves the data in the database 

router.post('/', (req, res, next) => {
    const student = new Student({
        _id : new mongoose.Types.ObjectId,  // to automatically assign a new id to the json the data
        name : req.body.name,    // 'req.body.name' so that the req containing body, which contains 'name' variable.. its data will be stored here in the name variable 
        gender : req.body.gender,
        age : req.body.age
    })
    
    // To save in database
    student.save()
    // if the save action is performed properly then it will be caught in the 'then' statement otherwise in 'catch' statement. 

    // we store the the outcome in the results attribute and then send it as a response (to Postman) to display the result
    .then(result => {
        console.log(result);
        res.status(200).json({
            newStudent : result
        })
    })

    // otherwise if a error is occured then we catch the error and display it (in console as well as postman) 
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})




// Flow - just do the 'GET' request in Postman and then the corresponding data collection will be displayed as a response 

router.get('/', (req, res, next) =>{
    Student.find()   // retrieves all documents from student collection
    
    .then(result =>{
        console.log(result);
        res.status(200).json({
            studentData : result
        });
    })

    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
})




// GET request for particular ID -

// Flow - To retrieve the document of a particular id then we first design a URL type like '/:id' and then we hit request like localhost:3000/student/6682b7a8dcf37a3a45e27b50 from postman and then using Student.findById() function we find the corresponding object and then display it


//  :id means whatever comes after 'localhost:3000/student/...' will be stored in the variable id.
router.get('/:id', (req, res, next) => {
    console.log(req.params.id);  // params include the variable parts of the URL, like here id

    const id = req.params.id;

    Student.findById(id)
    
    .then(result => {
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(404).json({message : "Student not found"});
        }
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });

});



// router.get('/:id/:x', (req, res, next) => {}

// In this case params will contain 2 objects id and x. Ex - a URL is hit like 'localhost:3000/student/6682b61/hdush' then id variable will contain - 6682b61 and x - hdush. So req.paramms will be - {id: '6682b618dcf37a3a45e2', x: 'hdush'}






// To check if the data is posted in postman is received here in backend or not

// router.post('/', (req, res, next) =>{
//     console.log(req.body);    // prints the json body like {name : 'Rahul', gender : 'Male'}
// })



// For practise purpose only -

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         msg : 'This is student GET request'
//     })
// })

// router.post('/', (req, res, next) =>{
//     res.status(200).json({
//         msg : 'This is student POST request'
//     })
// })


// If I want that even after '/student' there should be '/name' i.e. '/student/name' should be the endpoint where this GET (or any other request runs then I have to mention that after the '/')
// Ex -

// router.post('/name', (req, res, next) =>{
//     res.status(200).json({
//         msg : 'This is student POST request'
//     })
// })

module.exports = router;