const express = require('express');
const app = express();
const studentRoute = require('./api/routes/student')
const facultyRoute = require('./api/routes/faculty');
const userRoute = require('./api/routes/user');

const mongoose = require('mongoose');  // npm install mongoose


// npm install body-parser
const bodyParser = require('body-parser');  // for making the server understand the data. But we can directly use 'express' for the same purpose as it has built-in tools for the job.

// for storing of images // npm install express-fileupload
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb+srv://rahulkumar:rahul123@rahul.ttczyvf.mongodb.net/?retryWrites=true&w=majority&appName=rahul')


// To check if the mongodb is successfully connected or not -

mongoose.connection.on('error', err =>{
    console.log("Connection failed");
});

mongoose.connection.on('connected', connected =>{
    console.log("Connection successful");
});
// Now if I try to write the wrong password then the server will not start, else it will start and corresponding message will be displayed


app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(fileUpload({
    useTempFiles : true
}))


// whenever someone hits the '/student' endpoint, studentRoute will be activated where the logic for GET, POST etc is written
app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/user', userRoute);


// If I try to hit a URL like '/staff' which is not even declared here then an error HTML will be shown (in Postman) if the below code (where it responses with app is running) is not present.

// app.use((req, res, next) => {
//     res.status(200).json({
//         message : "app is running"
//     })
// })



// The only problem here is that this error will be displayed even at base URL also
app.use((req, res, next) => {
    res.status(404).json({
        error : "Bad URL"
    })
})


module.exports = app;