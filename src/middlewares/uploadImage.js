import { dataUri } from "../middlewares/multer.js";
import cloudinary from "../config/cloudinary.config.js";

const UploadImage = async (
  file,
  folder = "uploads",
  maxSize = 5 * 1024 * 1024
) => {
  if (!file) {
    throw new Error("Aucun fichier fourni.");
  }

  if (file.size > maxSize) {
    throw new Error("L'image dépasse la taille maximale autorisée de 5 MB.");
  }

  const fileContent = dataUri(file).content;

  const result = await cloudinary.uploader.upload(fileContent, {
    folder,
  });

  return result.secure_url;
};

export default UploadImage;
