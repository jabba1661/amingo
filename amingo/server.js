//1. imports via require
// line 1: means: const express = () => {}
const express       = require('express');
//no get an object with all the express functions
//// line 2: invoke the function -- instantiates the express function/objects
const app = express();
const cors = require('cors');

const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

//import User Model for DB operations
// const UserModel     = require( './models/User.js');


//2. import User routes
const UserRoutes = require( './routes/User.js');
const FeedRoutes = require('./routes/Feed.js')

//3
//instruct app to use body parser-- object
app.use( bodyParser.urlencoded({extended: false}));
app.use( bodyParser.json());
app.use( cors());

//4. connect to db
const dbURL ='mongodb+srv://jabbaDB:jabbaMONGO123!@cluster0-y6dl9.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(
    dbURL,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
).then(
    (response) =>{
        // console.log( 'response from mongoose', response );
        console.log( 'db is connected' );
        
    }
).catch(
    (e) =>{
        console.log( 'no responnse from mongodb - server', e );
    }
)


//all these are instantiated
/*
app = {
    get:
    post:
    put:
}
*/
//Handle pages


app.get( '/blog/:section/:date', 
    (req, res) => {
        // res.send('Hello');
        let htmlString = `<h3>param1:${req.params.section}</h3>`;
        htmlString += `<h3>param2:${req.params.date}</h3>`;
        htmlString += `<h1 style="color:blue;">Welcome blog</h1>`;
        // res.send('<h1 style="color:blue;">Welcome blog</h1>');
        res.send( htmlString);
        
        console.log(`--------------------`);
        console.log( `blog:section:[${req.params.section}]date:[${req.params.date}]`);
        console.log(`--------------------`);
    });

//[Moved app.post to ./routes/User.js]
// app.post(
//     '/user',
//     (req,res) => { 
        
//         // console.log( req.header.firstname);
//         const formData = {
//              'firstname' :  req.body.firstname,
//              'lastname':    req.body.lastname,
//              'email':       req.body.email,
//              'password':    req.body.password,
//              'occupation':  req.body.occupation

//             //-----printing out earlier lines-----
//             // console.log( '------------------------------------' );
//             // console.log( `firstname: ${req.body.firstname}` );
//             // console.log( `lastname: ${req.body.lastname}` );
//             // console.log( `email: ${req.body.email}` );
//             // console.log( `pasword: ${req.body.password}` );
//             // console.log( `occupation: ${req.body.occupation}` );
//         };

//         const theUser = new UserModel( formData);
//         theUser.save();
//         res.send( 'user saved!' );
//         // console.log( '------------------------------------' );
//     }
// );

//5. routes for our web app server
app.use(
    '/user',  /* http://www.myapp.com/user/     */
    UserRoutes /* from User.js */
    );

app.use(
    '/feed',  /* http://www.myapp.com/user/     */
    FeedRoutes /* from User.js */
    );

//Get takes in 2 arguments
//1st is a  string
//2nd is it takes in a function
app.get( '/home', 
    (req, res) => {
        // res.send('Hello');
        res.send('<h1 style="color:blue;">Welcome Home</h1>');

        // res.send('<html><title>Hello page</title><head></head><body><h1>welcome page!</h1></body></html>');
    });

app.get( '/about', 
(req, res) => {
    // res.send('Hello');
    res.send('<h1 style="color:blue;">Welcome to the about page</h1>');
});

app.get( '/contact', 
(req, res) => {
    // res.send('Hello');
    res.send('<h1 style="color:blue;">Welcome to the contact  page</h1>');
});

app.get( '/faqs', 
(req, res) => {
    // res.send('Hello');
    res.send('<h1 style="color:blue;">Welcome to the FAQs page</h1>');
});

app.get(
    '*',  /*catch eyerything else*/
(req, res) => {
    res.send('<h1 style="color:red;">Error: 404!<br>Oops! Page doesnt exist</h1>');
});



PORT = process.env.port || 3010;

//run server
app.listen(PORT,
() => {
    console.log( `server is connected on [${PORT}]`);
});

  

/*
GET - only receives data. you can filter what kind of data using queries. Queries go in the URL

PUT - for storing/sending upload profile picture to the backend (eg: string, numbers, BLOB)

*/