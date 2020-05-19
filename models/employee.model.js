//to create a schema of the project

const mongoose = require('mongoose');
//weare creating a object,we are hving constructer mongoose.schema
var employeeSchema = new mongoose.Schema({
  //here we hv to specify employee document structure
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

//email format checking
employeeSchema.path('email').validate((val) => {//val is value inside a email
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//regular expression
    return emailRegex.test(val);
}, 'Invalid e-mail.');
//we hv to register the employee schema

mongoose.model('Employee', employeeSchema);//name of schema and shema object