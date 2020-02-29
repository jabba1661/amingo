const express = require('express');
const router = express.Router();
const bcyrpt = require('bcrypt');

const UserModel = require('../models/User.js');


router.post(
    '/register',  /* http://www.myapp.com/user/register     */
    (req,res) => { 
        console.log( req.body);        
        console.log( `Routed [/register]: firstname: ${req.body.firstname} lastname: ${req.body.lastname} email: ${req.body.email} password: ${req.body.password} occupation: ${req.body.occupation}`);
        
        // console.log( req.header.firstname);
        const formData = {
             'firstname' :  req.body.firstname,
             'lastname':    req.body.lastname,
             'email':       req.body.email,
             'password':    req.body.password, //myPass123
             'occupation':  req.body.occupation
        };

        const theUserModel = new UserModel( formData );

        //step 1. Generate a salt
        bcyrpt.genSalt( (err, salt) => { 
            //Step 2. Generate the hashed password
            bcyrpt.hash(
                formData.password,//password
                salt,//generated salt
                (err, hashedPassword) => {
                    //step.3 Override user password value in the model (formdata)
                    theUserModel.password = hashedPassword;
                    /*myPass123 is now $b$10$hasdadsasd*/

                    theUserModel.save();
                    res.send( 'user registration complete!' );
                }//how we jandle the new hashed password
            )          
        });
    }
);

//tmpPassword212
router.post(
    '/login',  /* http://www.myapp.com/user/login     */
    (req, res) => {
        console.log( '1.--------------------------------------------------');
        console.log( `firstname: ${req.body.firstname} |email: ${req.body.email} | password: ${req.body.password}`);
        const formData = {
            email :     req.body.email,
            password:   req.body.password
        };

        /* Step 1. Check to see if email exists (if email doesnt exist, no point checking the password)*/
        UserModel
        .find({ email: formData.email })
        .then( (isMatch) => {
            
            console.log( '--------------------------------------------------');
            console.log( isMatch);
            console.log( '--------------------------------------------------');
            
            /*Step 2: if exists, Check password */
                if(isMatch.length > 0 ) {
                    console.log( 'isMatch.length > 0 ');
                    console.log( `isMatch type of : ${typeof( isMatch)}`);
                    let i=0;
                    console.log( `checking for password: ${req.body.password}`);

                    Object.values(isMatch).forEach( (value) => {
                        // console.log(`${i++} ${value}`);
                        console.log(`${i++} firstname: ${value.firstname} password: ${value.password}`);

                     });

                     

                   //fixme

                    
                    /** Step 3.a ) compare their passwords with database */
                    /** Step 4. Generate a web token -- JSON web token (JWT) */
                    /** Step 5. Send JWT to the client */
                    /** Step 3b. */
                        /** Step 6. Exit */
                } else{
                    console.log( 'isMatch.length <=  0 ');
                    
                    /*Step 2.b) 3 If user doesnt exist, exit*/
                    console.log( '--------------------------------------------------');
                    res.send( 'Please check email and/or password');
                    console.log( '--------------------------------------------------');
                }
        })





        res.send( 'login end!' );
    }
)

module.exports = router;