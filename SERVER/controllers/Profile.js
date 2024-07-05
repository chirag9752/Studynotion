const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.updateProfile = async (req , res) =>{
    try{
        // get data
        const {dateOfBirth = "" , about = "" , contactNumber , gender = ""} = req.body;

        // get userId
        const id = req.user.id;

        // findProfile
        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;   // because inside user have additional details and inside it we have profile data
      
        const profileDetails = await Profile.findById(profileId);
      
      
        // update profile

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();   // because yaha object bana hua hai isliye save otherwise create use karna padta

        // return response 

        return res.status(200).json({
            success : true,
            message : 'Profile Updated Successfully',
            profileDetails,
        })

    }catch(error){

        return res.status(400).json({
            success : false,
            error : error.message,
        })

    }
}

// delete Account

exports.deleteAccount = async(req , res) =>{
    try{
        // get id
        const id = req.user.id;

        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User not found",
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});

        // TODO : HW unenroll user from all enrolled courses
        // user delete kardo 
        await User.findByIdAndDelete({_id : id});

        // return response
        return res.status(400).json({
            success : true,
            message : "User Deleted Successfully",
        })

        // How we can scheduled this deletion process so that our account will deleted after some time
        // what is cron job


    }catch(error){

        return res.status(500).json({
            success : false,
            message : "User cannot be deleted successfully"
        })

    }
}


// get all details of user

exports.getAllUserDetails = async (req , res) => {
    try{
        
       // get id
       const id  = req.user.id;

       const userDetails = await User.findById(id).populate("additionalDetails").exec();

       // return response
       return res.status(200).json({
        success : true,
        message : "User data fetched succesfully",
        userDetails,
       });

    }catch(error){
         return res.status(500).json({
            success : false,
            message : error.message,
         })
    }
}


// update display picture
exports.updateDisplayPicture = async (req, res) => {
	try {

		const id = req.user.id;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.displayPicture;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}