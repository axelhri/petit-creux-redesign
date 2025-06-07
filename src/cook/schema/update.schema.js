import { z } from "zod";

const UpdateSchema = z.object({
  cook_name: z
    .string()
    .trim()
    .max(15, { message: "Doit avoir au maximum 15 caractères" })
    .optional(),
  cook_email: z.string().email({ message: "Email invalide" }).optional(),
  cook_password: z.string().trim().max(128).optional(),
  cook_profile_picture: z
    .string()
    .url({ message: "Image invalide, doit être une URL valide" })
    .optional(),
  cook_bio: z
    .string()
    .trim()
    .max(250, { message: "Doit avoir au maximum 250 caractères" })
    .optional(),
});

export default UpdateSchema;
