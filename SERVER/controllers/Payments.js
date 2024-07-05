const {instance}  = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {CourseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");


// capture the payment and initiate the razorpay
exports.capturePayment = async ( req , res) => {

    // get courseId and UserId
    const {course_id} = req.body;
    const userId = req.user.id;

    // validation
    // valid courseId
    if(!course_id){
        return res.json({
            success : false,
            message : 'Please Provide valid course ID',
        })
    }
 
    // valid courseDetail
    let course;
    try{
       
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success : false,
                message : 'Could not find the course',
            });
        }
        // user already pay for the same courses

        const uid = new mongoose.Types.ObjectId(userId);  // we have userId in string form and in course our userId stored in a object form thats why we convert 
        
        if(course.studensEnrolled.includes(uid))
        {
            return res.status(200).json({
                success : false,
                message : 'Student is already Enrolled',
            })
        }
    }catch(error){

        console.error(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })

    }
    
    // order create
    const amount = course.price;
    const currency = "INR";
    
    const options = {
        amount : amount * 100,   // because razorpay ka rule hai thats why
        receipt : Math.random(Date.now()).toString(),
        notes : {
            courseId : course_id,
            userId,
        }
    };

    try{
        
        // initiate the payment using razorpay

        const paymentResponse = await instance.orders.create(options);  // razorpay me order create karne ke liye use hota hai
        console.log(paymentResponse);
        

         // return response
        return res.status(200).json({
            success : true,
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail : course.thumbnail,
            orderId : paymentResponse.id,
            currency : paymentResponse.currency,
            amount : paymentResponse.amount,
        });


    }catch(error){
        console.log(error);
        return res.json({
            success : false,
            message : 'Could not initiate order',
        });

    }
};

// hamne abhi sirf payment create kiya hai abhi authorization baaaki hai see below for authorization

// verify signature of Razorpay and Server for authorization

exports.verifySignature = async (req , res) => {
     const webhookSecret = "12345678";             

     const signature = req.headers("x-razorpay-signature");  // thats razorpay behviour in which signature pass inside this key "x-razorpay-signature"

     const shasum = crypto.createHmac("sha256" , webhookSecret); //[A : -> we got Hmac object]  // sha means -> secured hashing algorithum             // Hmac -> Hash based message authentication code

     shasum.update(JSON.stringify(req.body));    // [B]

    //  when we run hashing algorithum to any pariticualr input to jo output aata hai us case me usko ham ek specific term se darshaate hai called : digest 
    
    const digest = shasum.digest("hex"); // [C] // hex belongs to hexadecimal formate

     if(signature === digest) {
        console.log("Payment is authorize");

        //  now we fetch userId and courseId but remember ye req frontend nhi bhejraha hai razorpay bhej raha hai thats why hum req.user.id se ya req.body se nhi niakaal sakte 

        const {courseId , userId} = req.body.payload.payment.entity.notes; // console karkae path dekh sakte hai but rehnedo because testing nhi kar sakte hai uske liye hame proxy lagega 

        try{
            // phele hi id verify karke push ki hai no need to validate 
            //  fullfill the actions

            // find the course and enrolled in it
            const enrolledCourse = await Course.findOneAndUpdate({_id : courseId},
                                                                 {$push : {studensEnrolled : userId}},
                                                                 {new : true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success : false,
                    message : 'Course not found',
                });
            }

            console.log(enrolledCourse);

            // find the student and addedd the course to their list enrolled courses me
            const enrolledStudent = await User.findOneAndUpdate(
                                                   {_id : userId},
                                                   {$push : {courses : courseId}},
                                                   {new : true},
            );

            console.log(enrolledStudent);

            // after everything we send a mail where template is alreeady there now we can use it and send mail

            const emailResponse = await mailSender(
                                     enrolledStudent.email,
                                     "Congratulations from GrowMore-Hub",
                                     "Congrulations you are onboarded into new GrowMore-Hub"
            );


            conole.log(emailResponse);
            return res.status(200).json({
                success : true,
                message : "Signature verified and Course Addedd",
            });
       
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success : false,
                message : error.message,
            })
        }

     }
     else{
        return res.status(400).json({
            success : false,
            message : "Invalid request",
        })
     }

    }


// HW -> Checksum , webhooks , proxy server , 