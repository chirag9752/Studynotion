const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(() => { console.log("db connected successfully")})
     .catch( (err) => {
     console.log("issue in db connection");
     console.error(err);
     process.exit(1);
    })
}