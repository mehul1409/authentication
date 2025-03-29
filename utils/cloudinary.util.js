const cloudinary = require("cloudinary").v2
const fs = require("fs")

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload image to Cloudinary
exports.uploadImage = async (filePath, folder) => {
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    })

    // Remove the file from local storage
    fs.unlinkSync(filePath)

    return result
  } catch (error) {
    // Remove the file from local storage in case of error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    console.error("Cloudinary upload error:", error)
    throw new Error("Error uploading image to Cloudinary")
  }
}

