const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    gender : String,
    subj : String
});


module.exports = mongoose.model('Faculty', facultySchema);