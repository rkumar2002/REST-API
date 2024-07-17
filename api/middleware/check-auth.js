const jwt = require('jsonwebtoken');

// Here basically we are coding so that when a person tries to do 'get' request on '/student' endpoint then this middleware will first be checked that is if the user is authenticated (using token) then only he/she will be allowed to perform the get request
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];  // split and [1] so that we can get the actual token after the keyword "bearer"
        // console.log(token);

        const verify = jwt.verify(token, 'this is secret key'); // token is verified against the secret key. If it is verified then it goes ahead to the 'next()' fn which runs the remaining part of the get req in the '/student' endpoint
        console.log(verify);
        if(verify.userType == 'admin'){   // if I had to allow only admin users to be able to make this request
            next();
        }
        else{
            res.status(401).json({
                msg : 'You are not an admin'
            })
        }
    }
    catch(err){
        return res.status(401).json({
            msg : "invalid token"
        });
    }
}