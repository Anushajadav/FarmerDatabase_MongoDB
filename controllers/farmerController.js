//this is for to do routing,Inside this we are doing crud application of emoploy



const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Farmer = mongoose.model('Farmer');//requesting for farmer schema from model
//https://expressjs.com/en/starter/basic-routing.html
//router is an instance of express
//router.HTTP(Path-is On the server,hANDLER-HANDLER is the function executed when the route is matched.)
router.get('/', (req, res) => {//The GET method is used to retrieve information from the given server using a given URI.
    res.render("farmer/addOrEdit", {//reponse shd be render insert farmer page(INsert or update)
        viewTitle: "Insert Farmer Details"//first parameter we hv to pass path,second property value for the fn
    });
});

router.post('/', (req, res) => {//A POST request is used to send data to the server, for example, customer information, file upload, etc. using HTML forms.
    if (req.body._id == '') //if id is null we are inserting
        insertRecord(req, res);//calling fn to insert in mongodb
        else //else updating
        updateRecord(req, res);
});

function insertRecord(req, res) {//to insert the record in mongodb
    var farmer = new Farmer();//in order insert ,we create obj of farmer schema
    farmer.fullName = req.body.fullName;
    farmer.parentName = req.body.parentName;
    farmer.productName = req.body.productName;
    farmer.amount = req.body.amount;
    farmer.interest = req.body.interest;
    farmer.remainingAmount = req.body.remainingAmount;
    farmer.dop = req.body.dop;
    farmer.dor = req.body.dor;
    farmer.mobile = req.body.mobile;
    farmer.city = req.body.city;
    farmer.region = req.body.region;
    farmer.save((err, doc) => {//to save the data
        if (!err) { res.redirect('farmer/list'); }//if no error ,it wl redirect to emp list
        else {
            if (err.name == 'ValidationError') {//checking is the error is validation
                handleValidationError(err, req.body);
                res.render("farmer/addOrEdit", {
                    viewTitle: 'Update Farmer Details',
                    farmer: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
         
    });
}

function updateRecord(req, res) {
    Farmer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {//iorder to update in mangoose we hv to give find and update
        if (!err) { res.redirect('farmer/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("farmer/addOrEdit", {
                    viewTitle: 'Update Farmer Details',
                    farmer: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    }).lean();
}

router.get('/list', (req, res) => {
    Farmer.find((err, docs) => {//we are using find function to retriew the farmer from schema
        if (!err) {//docs we hv all the list of employe
            res.render("farmer/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving farmer list :' + err);
        }
    }).lean();
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'parentName':
                body['parentNameError'] = err.errors[field].message;
                break;
            case 'amount':
                body['amountError'] = err.errors[field].message;
                break;
            case 'productName':
                body['productNameError'] = err.errors[field].message;
                break;
            
            case 'interest':
                body['interestError'] = err.errors[field].message;
                break;
            case 'remainingAmount':
                body['remainingAmountError'] = err.errors[field].message;
                break;
            case 'dop':
                body['dopError'] = err.errors[field].message;
                break;
            case 'dor':
                body['dorError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['phError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            

            default:
                break;
        }
    }
}
router.get('/:id', (req, res) => {//to return specific employ with respect to id
    Farmer.findById(req.params.id, (err, doc) => {//doc will be having farmer retrieved from id
        if (!err) {
            res.render("farmer/addOrEdit", {
                viewTitle: "Update Farmer Details",
                farmer: doc
            });
        }
    }).lean();;
});
 
router.get('/delete/:id', (req, res) => {
    Farmer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/farmer/list');
        }
        else { console.log('Error in farmer delete :' + err); }
    });
});
//we hv to export this router object from this controller
module.exports = router;