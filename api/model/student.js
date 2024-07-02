const mongoose = require('mongoose');

// We need to create a collection named student in the mongodb so we have to create a schema(structure) for that like this -

const studentSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,  // it is an id given to each data which acts as the primary key and it is generated on its own by this code
    name:String,
    gender:String,       
    age:Number

    // if we do not provide a key-value pair acc to the schema (like I dont include 'age' -> {"name" : "rahul", "gender" : "Male"}) then it will not throw any error, rather it will create an obj in the document without the 'age'. To ensure that it is mandatory to include certain fields then we have to use 'required' keyword, and if I want a default value which will be inserted in the document in case no such 'key' is given then a default value will be inserted. 
    // Check faculty model for 'required' and 'default' keyword
})

// To use it, we need to export it
module.exports = mongoose.model('Student', studentSchema);
                    // First one is the name we want to use for the collection. Second was is the name of the schema that we have defined here in the js file