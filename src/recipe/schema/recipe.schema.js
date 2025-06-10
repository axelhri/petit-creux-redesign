import { z } from "zod";

const RecipeSchema = z.object({
  recipe_title: z
    .string()
    .trim()
    .min(3, { message: "Doit avoir au minimum 3 caractères" })
    .max(50, { message: "Doit avoir au maximum 50 caractères" })
    .nonempty(),
  recipe_description: z
    .string()
    .trim()
    .min(3, { message: "Doit avoir au minimum 3 caractères" })
    .max(250, { message: "Doit avoir au maximum 250 caractères" })
    .nonempty(),
  recipe_image: z
    .string()
    .url({ message: "Image invalide, doit être une URL valide" })
    .max(250)
    .nonempty(),
  recipe_eaters: z
    .number()
    .int()
    .positive({ message: "Doit être un entier positif" }),
  recipe_category: z.enum([
    "entrée",
    "plat",
    "dessert",
    "boisson",
    "petit-déjeuner",
  ]),
});

export default RecipeSchema;
