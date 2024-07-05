const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req , res) =>{
    try{
        // data  fetch
        const {sectionName , courseId} = req.body;   // course already create kar liya hai to course ki id hogi hamare pass

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : 'Missing properties',
            });
        }
        // create Section
        const newSection = await Section.create({sectionName});

        // update course with section ObjectId
        const updatedCourseDetails =  await Course.findByIdAndUpdate(
                                                          courseId ,
                                                          {
                                                            $push : {
                                                                courseContent : newSection._id,
                                                            }
                                                          },
                                                          {new : true})
        // HW :  use populate to replace sections/sub-sections both in the updatedCourseDetails
        // return response

        return res.status(200).json({
            success : true,
            message : 'Section created successfully',
            updatedCourseDetails,
        })

    }catch(error){
        return res.status(500).json({
            success : false,
            messsage : 'unable to create section please try again later',
            error : error.message,
        });

    }
}


exports.updateSection = async(req , res) =>{
    try{
       
        // data input
        const {sectionName , sectionId} = req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success : false,
                message : 'Missing properties',
            });
        }
        // update data
        const section  = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new : true});  // new true is for that we want updated data ,,, Node : Here section Id me sectionname update kiya hai 

        // return response
         
        return res.status(200).json({
            success : true,
            messsage : 'Section updated successfully',
        })


    }catch(error){

        return res.status(500).json({
            success : false,
            messsage : 'unable to update section please try again later',
            error : error.message,
        });

    }
}


exports.deleteSection = async (req , res) =>{
    try{
        // get id - assuming that we are sending ID in params
        const {sectionId} = req.body;

        // use findbyidandDelete
        await Section.findByIdAndDelete(sectionId);
        // TODO [testing]: Do we need to delete the entry from course schema
        
        await Course.findByIdAndDelete(sectionId);

        // return response
        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully",
        })

    }catch(error){

        return res.status(500).json({
            success : false,
            message : 'Unable to delete Section , Please try again later',
            error : error.message,
        })

    }
}