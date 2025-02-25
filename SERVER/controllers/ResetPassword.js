// after press reset password -> mail comes with frontendlink -> it takes to us on UI -> Here newPassword and Confirm Password we type -> reset completed  
const User = require("../models/User");
const mailSender  =require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken

exports.resetPasswordToken = async (req , res) =>{
    try{
        
          // get email from req ki body  
    const email = req.body.email;

    // check user for this email , email  verification
    const user = await User.findOne({email : email});
    if(!user){
        return res.json({
            success : false,
            message : 'Your email is not registered with us'});
    }
    // generate token 
     const token = crypto.randomUUID();


    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
                                                      {email : email},
                                                      {
                                                        token : token,
                                                        resetPasswordExpires : Date.now() + 5*60*1000,
                                                      },
                                                      {new : true});
    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail containing the url
    await mailSender(email , "Password Reset Link" , 
                            `Password reset link : ${url}`);
    // return response
    return res.json({
        success : true,
        message : 'Email sent successfully , Please check email and change password'
    })
    

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Something went wrong while sending reset pwd mail"
        })
    }
}


// resetPassword

exports.resetPassword = async (req , res) =>{
    try{
         // data fetch  
    // note : token to uper dekho url me daala hai lekin hamne body me se kaise leke aagaye because body me token frontend ne daala hai
    const {password , confirmPassword , token} = req.body;
    // validation
    if(password !== confirmPassword)
    {
        return res.json({
            success : false,
            message : 'Password dosent match',
        })
    }
    // get userdetails form db using token 
    const userDetails = await User.findOne({token : token});

    // if no-entry means Invalid token
    if(!userDetails) {
        return res.json({
            success : false,
            message : 'Invalid token',
        })
    }
    // token time check
    if(userDetails.resetPasswordExpires < Date.now())
    {
        return res.json({
            success : false,
            message : 'Token expired please regenerate token',
        });

    }
    // hash password
       const hashedPassword = await bcrypt.hash(password , 10);

    // update password
    await User.findOneAndUpdate(
        {token : token},
        {password : hashedPassword},
        {new : true}
    )
    // return response
     return res.status(200).json({
        success : true,
        message : "password reset successfull"
     })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong while sending reset pwd mail",
        })
    }
}