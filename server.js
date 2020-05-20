//request for db.js file ,inorder to run the db.js file
require('./models/db');

const express = require('express');
//request statement for farmer controller
const employeeController = require('./controllers/farmerController');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

var app = express();//we hv to call express fn
 //here app is  an express instance
app.use(bodyparser.urlencoded({
    extended: true
}));//instead of pasing form data as url ,we hv to pass using bodyparser in req
app.use(bodyparser.json());//toconvert to json
app.set('views', path.join(__dirname, '/views/'));//we are setting view .__dirname-is the base file for the project.
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));//configured express engine for handlebars view
app.set('view engine', 'hbs');
//to start server ,we shd use listen fn using app variable
app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});
//here we are config routing for this farmer controller and url is /farmer
app.use('/farmer', employeeController);//use midddleware