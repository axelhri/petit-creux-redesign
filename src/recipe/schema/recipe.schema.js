import { z } from "zod";

const IngredientSchema = z.object({
  ingredient_name: z.string().trim().min(1),
  ingredient_unit: z.string().trim().min(1),
  ingredient_quantity: z.number().int().positive(),
});

const RecipeSchema = z.object({
  recipe_title: z
    .string()
    .trim()
    .min(3, { message: "Le titre doit avoir au minimum 3 caractères" })
    .max(50, { message: "Le titre doit avoir au maximum 50 caractères" })
    .nonempty(),
  recipe_description: z
    .string()
    .trim()
    .min(3, { message: "La description doit avoir au minimum 3 caractères" })
    .max(250, {
      message: "La description doit avoir au maximum 250 caractères",
    })
    .nonempty(),
  recipe_image: z
    .string()
    .url({ message: "Image invalide, doit être une URL valide" })
    .max(250)
    .nonempty(),
  recipe_eaters: z
    .number()
    .int()
    .positive({
      message: "Le nombre de personnes doit être un entier positif",
    }),
  recipe_category: z.enum([
    "entrée",
    "plat",
    "dessert",
    "boisson",
    "petit-déjeuner",
  ]),
  ingredients: z.array(IngredientSchema).min(1),
});

export default RecipeSchema;
