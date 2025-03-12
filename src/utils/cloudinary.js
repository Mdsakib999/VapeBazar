import axios from "axios";

const cloudinaryUpload = async (imageFile) => {
  //   const imageFile = image[0];
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", `${import.meta.env.VITE_PERSENTS}`); // Replace with your Cloudinary upload preset

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUD_NAME
    }/image/upload`,
    formData
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );

  return response.data;
};

const cloudinaryUploadMultiple = async (files) => {
  const uploadPromises = files.map((file) => cloudinaryUpload(file));
  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults;
};
const deleteImage = async (url) => {
  let public_id = url.split("/")[7].split(".")[0];
  cloudinary.v2.uploader
    .destroy(imageData.public_id, function (error, result) {
      return result;
    })
    .then((resp) => console.log(resp))
    .catch((_err) =>
      console.log("Something went wrong, please try again later.")
    );
};
export { cloudinaryUpload, cloudinaryUploadMultiple, deleteImage };
