import { z } from "zod";
import { StatusCodes } from "http-status-codes";

// Middleware de validation
// bodySchema: schéma de validation pour le corps de la requête
// paramsSchema: schéma de validation pour les paramètres de la requête
const validate =
  ({ bodySchema, paramsSchema }) =>
  (req, res, next) => {
    try {
      // Si un schéma de corps est fourni, valider le corps de la requête
      if (bodySchema) {
        const parsedBody = bodySchema.parse(req.body);
        req.body = parsedBody; // Remplacer le corps de la requête par le corps validé
      }

      // Si un schéma de paramètres est fourni, valider les paramètres de la requête
      if (paramsSchema) {
        const parsedParams = paramsSchema.parse(req.params);
        req.params = parsedParams; // Remplacer les paramètres de la requête par les paramètres validés
      }

      next(); // Passer au middleware suivant
    } catch (error) {
      // Si une erreur de validation Zod est levée
      if (error instanceof z.ZodError) {
        return res
          .status(StatusCodes.BAD_REQUEST) // Renvoyer un statut 400 (Bad Request)
          .json({ errors: error.errors }); // Renvoyer les erreurs de validation
      }

      next(error); // Passer l'erreur au middleware de gestion des erreurs
    }
  };

export default validate;
