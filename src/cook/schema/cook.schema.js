import { z } from "zod";

const CookSchema = z.object({
  cook_name: z
    .string()
    .trim()
    .min(3, { message: "Doit avoir au minimum 3 caractères" })
    .max(15, { message: "Doit avoir au maximum 15 caractères" })
    .nonempty(),
  cook_email: z.string().email({ message: "Email invalide" }).nonempty(),
  cook_password: z
    .string()
    .trim()
    .min(6, { message: "Doit avoir au minimum 6 caractères" })
    .max(128)
    .nonempty(),
  cook_profile_picture: z
    .string()
    .url({ message: "Image invalide, doit être une URL valide" })
    .optional(),
});

export default CookSchema;
