const mongoose=require("mongoose");
// const multer=require("multer")
const path = require("path");
if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
  }

const cloudinary = require('cloudinary').v2;
// const mongoose = require('mongoose');
// const { required, array } = require("joi");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Image upload function


// async function main() {
//     try {
//       await mongoose.connect("mongodb+srv://keshavkr9934:WYHVqnKEcJ8nq4VS@keshavportfoliyo.mktxg.mongodb.net/?retryWrites=true&w=majority&appName=keshavportFoliyo");
//       console.log("Mongoose is connected");
//     } catch (error) {
//       console.log("Connection error:", error);
//     }
//   }
  
//   main();
async function main() {
    try {
      await mongoose.connect("mongodb+srv://keshavkr9934:WYHVqnKEcJ8nq4VS@keshavportfoliyo.mktxg.mongodb.net/?retryWrites=true&w=majority&appName=keshavportFoliyo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 45000   // 45 seconds
      });
      console.log("Mongoose is connected");
    } catch (error) {
      console.log("Connection error:", error);
    }
  }
  
  main();
const projectSchema=mongoose.Schema({
     image:{
        type:String,
        required:true,
     }   ,
     description:{
        type:String,
        required: true,
     },
})

const project=mongoose.model("project", projectSchema);
async function uploadImage() {
    try {
      //image upload
      const filePth=[
        path.join(__dirname, "public", "image", "Screenshot 2024-10-20 230900.png"),
        path.join(__dirname, "public" , "image", "Screenshot 2024-10-20 225427.png"),
        path.join(__dirname,"public" , "image","Screenshot 2024-10-20 165831.png")
      ]

      for(const file of filePth){
        const result = await cloudinary.uploader.upload(file);
        const imageDocument = new project({ image: result.secure_url, description: "Image description" });
        await imageDocument.save();
        console.log('Image URL saved to MongoDB:', result.secure_url);
      }
    } catch (error) {
      console.error('Upload Error:', error);
    }
  }

  uploadImage();