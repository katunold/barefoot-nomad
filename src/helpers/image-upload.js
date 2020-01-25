import cloudImages from '../config/cloudinary-config';

export default class ImageUpload {
  static uploadImages = async (filePaths) => {
    const results = [];
    if (Array.isArray(filePaths)) {
      for (let i = 0; i < filePaths.length; i++) {
        await cloudImages.uploader.upload(filePaths[i], (error, result) => {
          if (result) {
            results.push(result);
          }
          results.push(error);
        });
      }
      return results;
    }

    return cloudImages.uploader.upload(filePaths, (error, result) =>
      !!result ? result : error,
    );
  };
}
