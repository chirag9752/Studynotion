const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");                              // npm i cors ,,,,, used taaaki frontend ki request ko entertain kar sake
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");              // npm i express-fileupload

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

// database connect
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin : "http://localhost:3000",          // jo bhi request aapki is url se aarahi hai means front-end se aarahi hai usko aapko entertain karna hai ,,,,,  Frontend runs on 3000 and backend runs on 4000
        credentials : true,
    })
)

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp"

    }) // we can upload files on temporary files
)

// cloudinary connection
cloudinaryConnect();


// routes
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile" , profileRoutes);
app.use("/api/v1/payment" , paymentRoutes);
app.use("/api/v1/course" , courseRoutes);



// def route

app.get("/" , (req , res) => {
    return res.json({
        success : true,
        message : 'Your server is up and running.......',
    })
})


app.listen(PORT , () =>{
    console.log(`App is running at ${PORT}`);
})




