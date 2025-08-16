import multer from "multer";


//we are using it for handling file uploads in Node.js especially with Express.js

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");