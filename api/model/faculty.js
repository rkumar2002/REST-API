const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        default : "Male"
    },
    subj : String
});


module.exports = mongoose.model('Faculty', facultySchema);