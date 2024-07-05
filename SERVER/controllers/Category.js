const Category = require("../models/Category");

exports.createCategory = async (req , res) =>{
    try{
    //   fetch data
    const {name , description} = req.body;
    

    // validation
    if(!name || !description) {
        return res.status(400).json({
            success : false,
            message : 'All Fields are required',
        })
    }


    // create entry in db
    const categoryDetails = await Category.create({
        name : name,
        description : description,
    });

    console.log(categoryDetails);

    return res.status(200).json({
        success : true,
        message : "Categories created successfully"
    })
     

    }catch(error){
       return res.status(500).json({
        success : false,
        message : error.message,
       })
    }
}



// getAllCategorys handler function

exports.showAllCategories = async (req , res) =>{
    try{
        
        const allcategory = await Category.find(
                                           {} ,
                                           {name : true , description : true }
                                           );  // {} -> iska matlb ham kisi criteria ke base pe find nhi karna chahta bs name or description hona chahiye 
        res.status(200).json({
            success : true,
            message : "All category returned successfully",
            allcategory,
        });
   
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })

    }
}

exports.categoryPageDetails = async (req , res) => {
    try{

        // get category id
        const {categoryId} = req.body;

        // get courses for specified categoryId
        const selectCategory  = await Category.findById(categoryId)
        .populate("courses")
        .exec();

        // validation
        if(!selectCategory){

            console.log("Category not found");

            return res.status(404).json({
                success : false,
                message : "Data not found",
            });
        }

        // get courses for different categories
        const differentCategories = await Category.find({
                                         _id : {$ne : categoryId},
                                          }).populate("courses").exec();  // $ne means not equals 

        // get top selleing courses
        // HW -> write your own 


        // return response

        return res.status(200).json({
            success : true,
            data : {
                selectCategory,
                differentCategories,
            } ,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })

    }
}