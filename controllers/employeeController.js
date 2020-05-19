//this is for to do routing,Inside this we are doing crud application of emoploy



const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');//requesting for employee schema from model
//https://expressjs.com/en/starter/basic-routing.html
//router is an instance of express
//router.HTTP(Path-is On the server,hANDLER-HANDLER is the function executed when the route is matched.)
router.get('/', (req, res) => {//The GET method is used to retrieve information from the given server using a given URI.
    res.render("employee/addOrEdit", {//reponse shd be render insert employee page(INsert or update)
        viewTitle: "Insert Employee"//first parameter we hv to pass path,second property value for the fn
    });
});

router.post('/', (req, res) => {//A POST request is used to send data to the server, for example, customer information, file upload, etc. using HTML forms.
    if (req.body._id == '') //if id is null we are inserting
        insertRecord(req, res);//calling fn to insert in mongodb
        else //else updating
        updateRecord(req, res);
});

function insertRecord(req, res) {//to insert the record in mongodb
    var employee = new Employee();//in order insert ,we create obj of employee schema
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {//to save the data
        if (!err) { res.redirect('employee/list'); }//if no error ,it wl redirect to emp list
        else {
            if (err.name == 'ValidationError') {//checking is the error is validation
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
         
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {//iorder to update in mangoose we hv to give find and update
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    }).lean();
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {//we are using find function to retriew the employee from schema
        if (!err) {//docs we hv all the list of employe
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    }).lean();
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/:id', (req, res) => {//to return specific employ with respect to id
    Employee.findById(req.params.id, (err, doc) => {//doc will be having employee retrieved from id
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    }).lean();;
});
 
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
//we hv to export this router object from this controller
module.exports = router;