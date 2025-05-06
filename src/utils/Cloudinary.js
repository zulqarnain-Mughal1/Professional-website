import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localPath)=>{
    try {
        if (!localPath) {
            return null;
        }
   const response =     await cloudinary.uploader.upload(localPath,{
            resource_type: "auto",
       })

       fs.unlinkSync(localPath)
       return response
    } catch (error) {
        fs.unlinkSync(localPath)
        return null
    }
  
}

export {uploadOnCloudinary}


// when we upload an image to Cloudinary, we get a response like this:

/*
{
  asset_id: 'abc123xyz...',
  public_id: 'folder_name/generated_file_name',
  version: 1714827081,
  version_id: 'some_version_id',
  signature: 'signature_hash',
  width: 1200,
  height: 800,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2025-05-04T10:12:34Z',
  tags: [],
  bytes: 234234,
  type: 'upload',
  etag: 'etag_hash',
  placeholder: false,
  url: 'http://res.cloudinary.com/your_cloud_name/image/upload/v1714827081/folder_name/generated_file_name.jpg',
  secure_url: 'https://res.cloudinary.com/your_cloud_name/image/upload/v1714827081/folder_name/generated_file_name.jpg',
  original_filename: 'your_original_file_name'
}

*/

// upload option 

/*
const response = await cloudinary.uploader.upload(localPath, {
  resource_type: "auto", // auto detect image/video/raw
  folder: "myimages",    // Save in 'myimages' folder
  public_id: "myimage123", // Custom public ID
  tags: ["nature", "vacation"], // Assign tags
  transformation: [{ width: 500, height: 500, crop: "fill" }], // Resize
  quality: "auto",       // Automatically optimize image quality
  fetch_format: "auto",  // Automatically choose the best format
  async: true,           // Use asynchronous upload
});

*/