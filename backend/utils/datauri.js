import DataUriParser from "datauri/parser.js"
//  Library: datauri is a library that helps convert file buffers into Base64-encoded Data URIs.
//  Why? Cloudinary and some other services support uploading base64 directly. This helps you avoid saving files to disk.

import path from "path"

const getDataUri = (file) => {


    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file input to getDataUri");
    }
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;