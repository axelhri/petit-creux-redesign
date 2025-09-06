# Script SQL

## Table Utilisateur (Cook)

```SQL
CREATE TABLE Cook(
   cook_id UUID PRIMARY KEY,
   cook_name VARCHAR(15) NOT NULL,
   cook_email VARCHAR(250) NOT NULL UNIQUE,
   cook_password VARCHAR(128) NOT NULL,
   cook_profile_picture TEXT NOT NULL,
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
   recipe_image TEXT NOT NULL,
   recipe_eaters INT NOT NULL,
   recipe_category VARCHAR(30) CHECK(recipe_category IN ('entrée', 'plat', 'dessert', 'boisson', 'petit-déjeuner')),
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
   ingredient_unit VARCHAR(50) CHECK(ingredient_unit IN ('grammes', 'litres', 'cuillères à soupe', 'kilogrammes', 'milligrammes', 'millilitres', 'centilitres', 'cuillères à café', 'tasse', 'pincée', 'pièce')),
   ingredient_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   recipe_id UUID NOT NULL,
   FOREIGN KEY(recipe_id) REFERENCES Recipe(recipe_id)
);
```

## Table Archive pour Utilisateur (Cook)

```SQL
CREATE TABLE cook_archive(
   cook_archive_id UUID PRIMARY KEY,
   cook_archive_newvalue VARCHAR(250) NOT NULL,
   cook_archive_oldvalue VARCHAR(250) NOT NULL,
   cook_archive_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   cook_id UUID NOT NULL,
   FOREIGN KEY(cook_id) REFERENCES Cook(cook_id)
);
```

## Table des favoris (Bokkmarks)

```SQL
CREATE TABLE Bookmarks(
   cook_id UUID,
   recipe_id UUID,
   PRIMARY KEY(cook_id, recipe_id),
   FOREIGN KEY(cook_id) REFERENCES Cook(cook_id),
   FOREIGN KEY(recipe_id) REFERENCES Recipe(recipe_id)
);
```
