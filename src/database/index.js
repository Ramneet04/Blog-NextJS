import mongoose from "mongoose";
require("dotenv").config();
const connectToDB= async ()=>{
    const URL = process.env.mongoDB_URL;
    mongoose.connect(URL).then(()=>{
        console.log("connected to db");
    }).catch(()=>{
        console.log("error in connecting to db");
    })
}
export default connectToDB;