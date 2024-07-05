const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create course handler function

exports.createCourse = async (req , res) =>{
    try{

        // fetch data
        const {courseName , courseDescription , whatYouWillLearn , price , category} = req.body;      // here Category is nothing but id because course.js ke schema me Category ka reference send hua hai means id send hui hai

        // get thumbnail
        const thumbnail = req.files.thumbnailImage; 

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success : false,
                message : 'All fields are required',
            });
        }

        // check for instructor because newcourse creation me instructor bhi store karna padega thabi to instructor ki objedct id laane ke liye db call kar rahe hai  
        
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Detais :" , instructorDetails);
        // TODO : verify that userId and instructordetails._id are same or different
        
        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor details not found",
            });
        }

        // check given Category is valid or not nodoubt dropdown se aaya hoga to valid hi hoga lakin postman se karenge to isliye check kar rahe hai 
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : "Category details not found",
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);

        //  entry create for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWillLearn,
            price,
            category : categoryDetails._id,
            thumbnail : thumbnailImage.secure_url,
        })
        

        // update user note : instructor ko buy course karne ki koi jarurat nhi hai uski list me apne aap aajaayega 
        // yaha hum user ke andar  course ke array ke andar new course jo banaya hai uski id store karna chahta hai
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            }

        )

        // update the Category ka schema
        await User.findByIdAndUpdate(
            {_id : categoryDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            }

        )

        // return response
        return res.status(200).json({
            success : true,
            message : "Course createed successfully",
            data : newCourse,
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Failed to create Course',
            error : error.message,
        })
    }
}


// getAllCourses handler function

exports.getAllCourses = async (req , res) =>{
    try{ 
        // TODO : change below statement incrementally

        const allCourses = await Course.find({} , {courseName : true,
                                                   price : true,
                                                thumbnail : true,
                                            instructor : true,
                                        ratingAndReviews : true,
                                    studentEnrolled : true,})
                                    .populate("instructor")
                                    .exec();

       return res.status(200).json({
            success : true,
            message : "Data for all course fetched successfully",
            data : allCourses,
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Failed to fetch Course data',
            error : error.message,
        })
    }
}

// get course details

exports.getCourseDetails = async(req , res) =>{
     try{

        // fetch courseId
        const {courseId} = req.body;

        // find course details
        const courseDetails = await Course.find(
                                               {_id : courseId} )
                                               .populate(
                                                 {
                                                    path : "instructor",
                                                    populate : {
                                                        path : "additionalDetails",
                                                    },
                                                 }
                                               )
                                               .populate("category")
                                            //    .populate("ratingAndreviews")
                                               .populate({
                                                path : "courseContent",
                                                populate : {
                                                    path : "subSection",
                                                },
                                               })
                                               .exec();


            // validation

            if(!courseDetails){
                return res.status(400).json({
                    success : false,
                    message : `Could not find the course with ${courseId}`,
                });
            }

            // return response
            return res.status(200).json({
                success : true,
                message : "Course Details fetched successfully",
                data : courseDetails,
            })
                                              
        


     }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
           
        });
     }
}