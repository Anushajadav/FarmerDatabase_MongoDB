const mongoose = require('mongoose');//importing mongoose
//to coonect mongodb we are using connect fn and we hv passed url to connect ---employeeDb is a database name
mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false }, (err) => {//err is a call back function
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
//we hv to add request statement
require('./employee.model');
//in order to run this db.js we hv to add request statement of this file in root file server.js