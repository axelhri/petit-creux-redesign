# Dictionnaire de données

Dictionaire de données pour la base de données **Petit Creux** :

| Table            | Colonne               | Description                              | Type                      | Contrainte      | Exemple                                                      |
| ---------------- | --------------------- | ---------------------------------------- | ------------------------- | --------------- | ------------------------------------------------------------ |
| **Cook**         | cook_id               | Numéro d'identification de l'utilisateur | UUID                      | NOT NULL UNIQUE | b6276aa3-02f1-4cb0-a33c-9e61f14a369d                         |
|                  | cook_name             | Nom de l'utilisateur                     | VARCHAR                   | NOT NULL        | Axel-hr                                                      |
|                  | cook_email            | Email de l'utilisateur                   | VARCHAR                   | NOT NULL UNIQUE | axel@gmail.com                                               |
|                  | cook_password         | Mot de passe de l'utilisateur            | VARCHAR                   | NOT NULL        | $2a$10$S4rlLey3Vc2XsUoXtO6Pleg.pk7y6XZ9Ij...                 |
|                  | cook_profile_picture  | Image de profil de l'utilisateur         | TEXT                      | NULL            | https://res.cloudinary.com...                                |
|                  | cook_bio              | Bio de l'utilisateur                     | VARCHAR                   | NULL            | C'est bien ce site                                           |
|                  | cook_created_at       | Date de création de l'utilisateur        | DEFAULT CURRENT_TIMESTAMP | NOT NULL        | 2025-04-28 16:18:43.643163                                   |
|                  | cook_updated_at       | Date de modification de l'utilisateur    | DEFAULT CURRENT_TIMESTAMP | NULL            | 2025-04-28 16:18:43.643163                                   |

| Table            | Colonne               | Description                              | Type                      | Contrainte      | Exemple                                                      |
| ---------------- | --------------------- | ---------------------------------------- | ------------------------- | --------------- | ------------------------------------------------------------ |
| **Recipe**       | recipe_id             | Numéro d'identification de la recette    | UUID                      | NOT NULL UNIQUE | b6276aa3-02f1-4cb0-a33c-9e61f14a369d                         |
|                  | recipe_title          | Titre de la recette                      | VARCHAR                   | NOT NULL        | Lasagne maison                                               |
|                  | recipe_description    | Description de la recette                | VARCHAR                   | NOT NULL        | Lasagne maison faites avec passion                           |
|                  | recipe_image          | Image de la recette                      | TEXT                      | NOT NULL        | https://res.cloudinary.com...                                |
|                  | recipe_eaters         | Nombre de personnes                      | INT                       | NOT NULL        | 5                                                            |
|                  | recipe_category       | Catégorie de la recette                  | ENUM                      | NOT NULL        | Plat                                                         |
|                  | recipe_created_at     | Date de création de la recette           | DEFAULT CURRENT_TIMESTAMP | NOT NULL        | 2025-04-28 16:18:43.643163                                   |

| Table            | Colonne               | Description                              | Type                      | Contrainte      | Exemple                                                      |
| ---------------- | --------------------- | ---------------------------------------- | ------------------------- | --------------- | ------------------------------------------------------------ |
| **Ingredient**   | ingredient_id         | Numéro d'identification de l'ingredient  | UUID                      | NOT NULL UNIQUE | b6276aa3-02f1-4cb0-a33c-9e61f14a369d                         |
|                  | ingredient_name       | Nom de l'ingredient                      | VARCHAR                   | NOT NULL        | Huile d'olive                                                |
|                  | ingredient_quantity   | Quantité de l'ingredient                 | INT                       | NOT NULL        | 50                                                           |
|                  | ingredient_unit       | Unité de l'ingredient                    | ENUM                      | NOT NULL        | Centillitre                                                  |
|                  | ingredient_created_at | Date de création de l'ingredient         | DEFAULT CURRENT_TIMESTAMP | NOT NULL        | 2025-04-28 16:18:43.643163                                   |

| Table            | Colonne               | Description                              | Type                      | Contrainte      | Exemple                                                      |
| ---------------- | --------------------- | ---------------------------------------- | ------------------------- | --------------- | ------------------------------------------------------------ |
| **cook_archive** | cook_archive_id       | Numéro d'identification de l'archive     | UUID                      | NOT NULL UNIQUE | b6276aa3-02f1-4cb0-a33c-9e61f14a369d                         |
|                  | cook_archive_newvalue | Nouvelle valeur                          | VARCHAR                   | NOT NULL        | Axel                                                         |
|                  | cook_archive_oldvalue | Ancienne valeur                          | VARCHAR                   | NOT NULL        | Axel hr                                                      |
|                  | cook_archive_date     | Date de modification                     | DEFAULT CURRENT_TIMESTAMP | NOT NULL        | 2025-04-28 16:18:43.643163                                   |
|                  | cook_id               | Numéro d'identification de l'utilisateur | UUID                      | NOT NULL        | b6276aa3-02f1-4cb0-a33c-9e61f14a369d                         |
