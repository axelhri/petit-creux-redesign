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
