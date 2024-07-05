const SubSection = require("../models/SubSection");
const Section =  require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// create SubSection

exports.createSubSection = async (req , res) =>{
    try{
        
    //    fetch data from req ki body
    const {sectionId , title , description , timeDuration} = req.body;  // section id because section id me subsection daalna padega na isliye
    
    // extract video
    const video = req.files.video;

    // console.log(sectionId , title , description , timeDuration);

    // validation
    if(!title || !description || !timeDuration || !video ||!sectionId){
        return res.status(400).json({
            success : false,
            message : "All filelds are required "
        });
    }

    // upload to cloudinary
    const uploadDetails = await uploadImageToCloudinary(video , process.env.FLODER_NAME);


    // create a subsection
    const subsectionDetails = await SubSection.create({
        title : title,
        timeDuration : timeDuration,
        description : description,
        videoUrl : uploadDetails.secure_url,
    }) // now ab is subsection ki id ko section me update kar denge neeche dekh

    
    // update section with this subsection ID
    const updatedSection = await Section.findByIdAndUpdate({_id:sectionId} ,
                                                   {$push : {
                                                    subSection : subsectionDetails._id
                                                   }} , {new : true}).populate("subSection");
    // HW : Update section here , after adding populate query
    
    // return response
    return res.status(200).json({
        success : true,
        message : "Subsection created successfully",
        updatedSection,
    })



    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal Server error",
            error : error.message,
        })

    }
}

// update subsection

exports.updateSubSection = async(req , res) => {

   try{
       
    // data fetch
    const {subsectionId , title , description , timeDuration} = req.body;

    const video = req.files.videoFile;

    // validation
    if( !subsectionId || !title || !description || !timeDuration || !video){
        return res.status(400).json({
            success : false,
            message : "All Details are mendatory",
        });
    }

    // upadted data in  subsection
    const updatedSubSectionDetails = await SubSection.findByIdAndUpdate(subsectionId , {title , description , timeDuration} , {new : true});

    // return response
    return res.status(200).json({
        success : true,
        messsage : 'Section updated successfully',
        subSection,
    })

   }catch(error){
    return res.status(400).json({
        success : false,
        message : "Unable to update subsection data",
    })
   }

}

// delete subsection

exports.deleteSubSection = async ( req , res) => {
    try{

        // fetch id
        const {subsectionId} = req.body;

        // deteteid
        await SubSection.findByIdAndDelete(subsectionId);

        // return response
        return res.status(200).json({
            success : true,
            message : "Deleted Data successfully",
        })

    }catch(error){
        return res.status(400).json({
            success : false,
            message : "Unable to delete data from subsection"
        })
    }
}
