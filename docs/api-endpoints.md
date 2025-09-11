# Routes de l'API Petit Creux

## Authentification

| Route                 | Méthode | Description                         |
| --------------------- | ------- | ----------------------------------- |
| /api/v1/auth/register | POST    | Inscription d'un nouvel utilisateur |
| /api/v1/auth/login    | POST    | Connexion avec un compte enregistré |

## Utilisateur (Cook)

| Route            | Méthode | Connexion requis | Description                                |
| ---------------- | ------- | ---------------- | ------------------------------------------ |
| /api/v1/cook     | GET     | ❌               | Consulter les utilisateurs inscrit         |
| /api/v1/cook/:id | GET     | ❌               | Consulter un utilisateur                   |
| /api/v1/cook/:id | PUT     | ✅               | Modifier des élements de son propre compte |
| /api/v1/cook/:id | DELETE  | ✅               | Supprimer son propre compte                |

## Recette (Recipe)

| Route                        | Méthode | Connexion requis | Description                                                 |
| ---------------------------- | ------- | ---------------- | ----------------------------------------------------------- |
| /api/v1/recipe               | POST    | ✅               | Créer une recette                                           |
| /api/v1/recipe/:id           | POST    | ✅               | Mettre une recette dans ses favoris                         |
| /api/v1/recipe               | GET     | ❌               | Consulter les recettes                                      |
| /api/v1/recipe/:id           | GET     | ❌               | Consulter une recette                                       |
| /api/v1/recipe/:id           | DELETE  | ✅               | Supprimer une de ses recettes                               |
| /api/v1/recipe/:id/calculate | GET     | ❌               | Calculer le nombre d'ingrédient selon le nombre de mangeurs |

## Email (Contact)

| Route         | Méthode | Connexion requis | Description                                                        |
| ------------- | ------- | ---------------- | ------------------------------------------------------------------ |
| /api/v1/email | POST    | ❌               | Envoyer les données envoyés du formulaire de contact vers un email |
