//to create a schema of the project

const mongoose = require('mongoose');
//weare creating a object,we are hving constructer mongoose.schema
var farmerSchema = new mongoose.Schema({
  //here we hv to specify farmer document structure
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    parentName: {
        type: String,
        required: 'This field is required.'
    },
    productName: {
        type: String,
        required: 'This field is required.'
    },
    amount: {
        type: String,
        required: 'This field is required.'
    },
    interest: {
        type: String,
        required: 'This field is required.'
    },
    remainingAmount: {
        type: String,
        required: 'This field is required.'
    },
    dop: {
        type: String,
        required: 'This field is required.'
    },
    dor: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String,
        required: 'This field is required.'
    },
     
    city: {
        type: String,
        required: 'This field is required.'
    },
     
    region: {
        type: String,
         
    }
});

//email format checking
farmerSchema.path('mobile').validate((val) => { 
    mobileRegex =   /^[789]\d{9}$/;
    return mobileRegex.test(val);
}, 'Invalid mobile number.');


//we hv to register the farmer schema

mongoose.model('Farmer',farmerSchema);//name of schema and shema object