import { z } from "zod";

const IngredientSchema = z.object({
  ingredient_name: z
    .string()
    .trim()
    .min(3, { message: "Doit avoir au minimum 3 caractères" })
    .max(50, { message: "Doit avoir au maximum 50 caractères" })
    .nonempty(),
  ingredient_quantity: z
    .number()
    .int()
    .positive({ message: "Doit être un entier positif" }),
  ingredient_unit: z.enum([
    "grammes",
    "litres",
    "cuillères à soupe",
    "kilogrammes",
    "milligrammes",
    "millilitres",
    "centilitres",
    "cuillères à café",
    "tasse",
    "pincée",
    "pièce",
  ]),
});

export default IngredientSchema;
