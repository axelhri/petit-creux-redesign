# Script SQL

## Table Utilisateur (Cook)

```SQL
CREATE TABLE Cook(
   cook_id UUID PRIMARY KEY,
   cook_name VARCHAR(15) NOT NULL,
   cook_email VARCHAR(250) NOT NULL,
   cook_password VARCHAR(128) NOT NULL,
   cook_profile_picture VARCHAR(250) NOT NULL,
   cook_bio VARCHAR(250),
   cook_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   cook_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Table Recette (Recipe)

```SQL
CREATE TABLE Recipe(
   recipe_id UUID PRIMARY KEY,
   recipe_title VARCHAR(50) NOT NULL,
   recipe_description VARCHAR(200) NOT NULL,
   recipe_image VARCHAR(250) NOT NULL,
   recipe_eaters INT NOT NULL,
   recipe_category VARCHAR(30) NOT NULL,
   recipe_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   cook_id UUID NOT NULL,
   FOREIGN KEY(cook_id) REFERENCES Cook(cook_id)
);
```

## Table Ingredient (Ingredient)

```SQL
CREATE TABLE Ingredient(
   ingredient_id UUID PRIMARY KEY,
   ingredient_name VARCHAR(50) NOT NULL,
   ingredient_quantity INT NOT NULL,
   ingredient_unit VARCHAR(50) NOT NULL,
   ingredient_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   recipe_id UUID NOT NULL,
   FOREIGN KEY(recipe_id) REFERENCES Recipe(recipe_id)
);
```
