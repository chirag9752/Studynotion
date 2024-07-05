const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
require("dotenv").config();

// send otp
exports.sendotp = async (req , res) =>{

  try{
      // fetch email from req.body
      const {email} = req.body;

      // check if user already exist
      const checkUserPresent = await User.findOne({email});
  
      if(checkUserPresent) {
          return res.status(401).json({
              success : false,
              message : 'User already register'             
          })
      }
    
    // check wheather u run npm i otp-generator
    //   generate OTP

    //   function used to generate otp 
    var otp = otpGenerator.generate(6 , {
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false
    });

    console.log("opt generate :->" , otp);

    // Now check our otp is unique or not
    // Note : generally in company we dont need to check in db one by one we got that services in which OTP generate unique by default
    // In company db calls ke uper kabhi bhi loop nhi chalta for otp check


    const result = await OTP.findOne({otp : otp});

    while(result) {
        otp = otpGenerator(6 , {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        });

        const result = await OTP.findOne({otp : otp});
    }

    const otpPayload = {email , otp};

    //  create an entry in db
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return response
    res.status(200).json({
        success : true,
        message : 'OTP Sent successfully',
        otp,
    })


  } catch(error){
      console.log("unable to send otp");
      console.log(error);
      return res.status(500).json({
        success : false,
        message : error.message,
      })
  }
}

// signup

exports.signup = async (req , res) => {

        // data fetch
        // validate
        // 2 password match karlo
        // check user already exist or not

        // find most recent otp for the user 
        // validate otp
        // hash password
        // entry created in db
        // return res
    try{
      const {
        firstName,
        lastName ,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
        } = req.body;

        // validate

        if(!firstName || !lastName || !email || !confirmPassword || !password || !otp){
            return res.status(403).json({
                success : false,
                message : "All fields are required",
            });
        }
        
        // match password
        if(password !== confirmPassword)
        {
           return res.status(400).json({
             success : false,
             message : 'Password and ConfirmPassword value does not match, please try again'
           })
        }
        
        // check user already exist or not

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : 'User is already registered'
            });
        }

        // find most recent otp stored for the user

        const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        console.log(recentOtp);

        // validate otp

        if(recentOtp.length === 0){
            // otp not found
            return res.status(400).json({
                success : false,
                message : 'The OTP is not valid',
            });
        } else if(otp !== recentOtp[0].otp){
            // Inavlid OTP
            return res.status(400).json({
                success : false,
                message : "Invalid OTP",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password , 10);

    //    Note :-> ek nakli profile banai hai hamne now ab jab bhi profile ka data lake aayenge to update karenge user me or agar fake profile banake null set nhi karte to create karte 

        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null,
        });

         // entry created in DB

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password : hashPassword,
            accountType : accountType,
            additionalDetails : profileDetails._id,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return response

        return res.status(200).json({
            success : true,
            message : 'User is registered Successfully',
            user,
        });

    }catch(error){
       console.log(error);
        return res.status(500).json({
            success : false,
            message : "User cannot be registered , Please try again",
        })
       
    }
}

// login
exports.login = async (req , res) => {
    try{
       
    // get data from req.body
    
    const {email , password} = req.body;

    // validate data
    if(!email || !password){
        return res.status(403).json({
            success : false,
            message : 'All fields are required, Please try again',
        });
    }
    // user check exist or not
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success : false,
            message : "User is not registered, Please signup first",
        });
    }

    // generate JWT,after password matching

      if(await bcrypt.compare(password , user.password)){
        const payload = {
            email : user.email,
            id : user._id,
            accountType : user.accountType,
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn : "2h",
        });
        user.token = token;
        user.password = undefined;
      
    // create cookie and send response
    const options = {
        expires : new Date(Date.now() + 3*24*60*60*1000),
        httpOnly : true,
    }
     res.cookie("token" , token , options).status(200).json({
        success : true,
        token,
        user,
        message : 'Logged in Successfully'
     })
     
    }
    else{
        return res.status(401).json({
            success : false,
            message : 'Password is incorrect',
        })
    }

    }catch(error){
       console.log(error);
       return res.status(500).json({
        success : false,
        message : 'Login Failure , please try again',
       });
    }
}

// change Password
// TODO Homework
exports.changePassword = async(req , res) => {
   try{

    // get data fro req.body
    const userId = req.user.id;

    const userDetails = await User.findById(userId);

    // get old password , new passsword , confirm password
    const {newPassword , confirmPassword , oldPassword} = req.body;

     
    // validation
    const isPasswordMatch = await bcrypt.compare(oldPassword , userDetails.password);
    
    if(!isPasswordMatch){
        return res.status(401).json({
            success : false,
            message : "The Password is incorrect",
        });
    }


    if(oldPassword === newPassword){
        return res.status(400).json({
            success : false,
            message : "New Password cannot be same as old password",
        });
    }



    // update pwd in DB
    const encryptedPassword = await bcrypt.hash(newPassword , 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
         userId , 
        {password : encryptedPassword},
        {new : true}
    );

    // send mail -> Password updated
    try{

        // w.k.t in mailsender we have to pass 3 things mail , title ,body
        const emailResponse = await mailSender(
            updatedUserDetails.email,
            "GrowMore-Hub - password Update",
            passwordUpdated(
                updatedUserDetails.email,
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
        );
        console.log("Email sent successfully :" , emailResponse.response);
    }catch(error){
        console.log("error occuring while sending email" , error);
        return res.status(500).json({
            success : false,
            message : "Error occuring while sending email",
            error : error.message,
        });
    }

    // return response
    return res.status(200).json({
         success: true,
          message: "Password updated successfully"
         });


   }catch(error){

    console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});

   }
}
