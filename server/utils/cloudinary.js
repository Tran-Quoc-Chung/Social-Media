import cloudinary from "cloudinary"

cloudinary.config({ 
    cloud_name: "chungdev", 
    api_key: "351381963649424", 
    api_secret: "6BYwZT4FeaDvOH_ebnbV-CfmsT4"
});
  
export const cloudinaryUploadImg = async (fileToUploads) => {
  console.log("test",process.env.API_KEY,process.env.API_SECRET)
    return new Promise((resolve,reject ) => {
      cloudinary.uploader.upload(fileToUploads, ( result) => {
        
        if (result.error) {
          console.log("error:",result.error)
          reject(result.error);
        }
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };
  export const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
      cloudinary.uploader.destroy(fileToDelete, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };
  