const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');   // included here mainly so that it can be used to generate the automatic id 

const Student = require('../model/student');   // where the schema of the student collection is defined

const student = require('../model/student');

const checkAuth = require('../middleware/check-auth');

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

// For JWT protection code of get req, check after line 170

// router.get('/', (req, res, next) =>{
//     Student.find()   // retrieves all documents from student collection
    
//     .then(result =>{
//         console.log(result);
//         res.status(200).json({
//             studentData : result
//         });
//     })

//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error : err
//         });
//     })
// })




// GET request for particular ID -

// Flow - To retrieve the document of a particular id then we first design a URL type like '/:id' and then we hit request like localhost:3000/student/6682b7a8dcf37a3a45e27b50 from postman and then using Student.findById() function we find the corresponding object and then display it


//  :id means whatever comes after 'localhost:3000/student/...' will be stored in the variable id.
router.get('/:id', (req, res, next) => {
    // console.log(req.params.id);  // params include the variable parts of the URL, like here id

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



// DELETE -


router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Student.findByIdAndDelete(id)

    .then(deletedStudent => {
        if(deletedStudent){
            res.status(200).json({
                deleted : deletedStudent
            })
        }
        else{
            res.status(404).json({
                message : "Student not found for deletion"
            })
        }
    })

    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

})




// Diff b/w PUT and PATCH - Both of them update the document present in the collection. But in case of PUT, one has to send all other data items which are not changing as well to save the new data object. But in case of PATCH, we only need to give the changed data and the rest data will stay as it is in the database


// PUT -

router.put('/:id', (req, res, next) => {
    const id = req.params.id;

    // first parameter takes the filter acc to which we find our unique data. In this case it is id.
    Student.findOneAndUpdate({_id : id},{
        $set : {
            name : req.body.name,     
            gender : req.body.gender,
            age : req.body.age
        }
    }, {new : true})  // so that it returns the updated result
    
    .then(result => {
        res.status(200).json({
            updated : result
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
})


// checkAuth acts as middleware which checks if the user is authenticated to make certain action. Like here, the get request will be performed only if the the user is making this action with the right token.
router.get('/', checkAuth, (req, res, next) =>{
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






// router.put('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const updateOps = {};     // another way to collect all the key and value

//     for (const [key, value] of Object.entries(req.body)) {
//         updateOps[key] = value;
//     }

//     Student.findOneAndUpdate(
//         { _id: id },
//         { $set: updateOps },
//         { new: true, overwrite: true } // Overwrite the document
//     )
//     .then(result => {
//         res.status(200).json({
//             updated: result
//         });
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         });
//     });
// });







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