import { z } from "zod";

const CookSchema = z.object({
  cook_name: z
    .string()
    .trim()
    .min(3, { message: "Doit avoir au minimum 3 caractères" })
    .max(15, { message: "Doit avoir au maximum 15 caractères" }),
  cook_email: z.string().email({ message: "Email invalide" }),
  cook_password: z
    .string()
    .trim()
    .min(6, { message: "Doit avoir au minimum 6 caractères" })
    .max(128),
  cook_profile_picture: z
    .string()
    .url({ message: "Image invalide, doit être une URL valide" }),
  cook_bio: z
    .string()
    .trim()
    .max(250, { message: "Doit avoir au maximum 250 caractères" }),
});

export { CookSchema };
