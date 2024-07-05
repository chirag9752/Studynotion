const mongoose  = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60,
    },
});

// function -> to send emails

async function sendVerificationEmail(email , otp){  
    try{
          const mailResponse = await mailSender(email , "Verification Email from GrowMoreHub" , emailTemplate(otp));
          console.log("Email sent Successfully mails :" , mailResponse);
    }catch(error){
        console.log("error occured while sending email" , error);
        throw error;
    }
}

// Note : -> user -> signup -> got mail for otp -> enter otp -> submit -> db entry 
// Here we send email before db entry thats why we used here pre middleware



//pre middleware 

OTPSchema.pre("save" , async function(next) {
    
    // Only send an email when a new document is created

    if(this.isNew){
        await sendVerificationEmail(this.email , this.otp);
    }
    next();
});


const OTP = mongoose.model("OTP" , OTPSchema);

module.exports = OTP;