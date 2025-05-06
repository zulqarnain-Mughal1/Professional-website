import multer from "multer";
import fs from 'fs';
import path from 'path';

// Define the upload path
const uploadPath = path.resolve("E:/Professional_website/src/public/temp");

// Check if the folder exists
if (!fs.existsSync(uploadPath)) {
  console.log("Folder doesn't exist. Creating folder:", uploadPath);
  fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
} else {
  console.log("Folder already exists:", uploadPath);
}

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Ensure file is stored in the correct folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

export const upload = multer({ storage });



//   req.file is the `file` object that contains information about the uploaded file
  /*{
  fieldname: 'file',               // Name of the form field (e.g. 'file')
  originalname: 'myphoto.jpg',     // Original file name on the user's computer
  encoding: '7bit',                // Encoding type
  mimetype: 'image/jpeg',          // MIME type of the uploaded file
  destination: 'src/public/temp',  // Folder where the file was saved
  filename: '1714825581234-myphoto.jpg', // File name in the destination folder
  path: 'src/public/temp/1714825581234-myphoto.jpg', // Full path to the saved file
  size: 28423                      // File size in bytes
} */