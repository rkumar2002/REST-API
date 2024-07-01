const mongoose = require('mongoose');

// We need to create a collection named student in the mongodb so we have to create a schema(structure) for that like this -

const studentSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,  // it is an id given to each data which acts as the primary key and it is generated on its own by this code
    name:String,
    gender:String,
    age:Number
})

// To use it, we need to export it
module.exports = mongoose.model('Student', studentSchema);
                    // First one is the name we want to use for the collection. Second was is the name of the schema that we have defined here in the js file