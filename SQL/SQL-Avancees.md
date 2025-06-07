# Commandes SQL avancées

## Créer un utilisateur (Cook)

```SQL
CREATE PROCEDURE create_cook(
    IN p_cook_id UUID,
    IN p_cook_name VARCHAR,
    IN p_cook_email VARCHAR,
    IN p_cook_password VARCHAR,
	IN p_cook_profile_picture VARCHAR
)
AS $$
BEGIN
    INSERT INTO Cook (cook_id, cook_name, cook_email, cook_password, cook_profile_picture)
    VALUES (p_cook_id, p_cook_name, p_cook_email, p_cook_password, p_cook_profile_picture);
END;
$$ LANGUAGE plpgsql;
```

```SQL
CALL create_cook(
gen_random_uuid(),
'Freya',
'freya@gmail.com',
'freyaPassword',
'https://res.cloudinary.com/dsoqmhreg/image/upload/v1729761039/recipes-images/bgln3tz9nd0esh4lrzyj.jpg'
);
```

## Modifier un utilisateur (Cook)

```SQL
CREATE PROCEDURE update_cook(
    IN p_cook_id UUID,
    IN p_cook_name VARCHAR DEFAULT NULL,
    IN p_cook_email VARCHAR DEFAULT NULL,
    IN p_cook_password VARCHAR DEFAULT NULL,
	IN p_cook_profile_picture VARCHAR DEFAULT NULL,
	IN p_cook_bio VARCHAR DEFAULT NULL
)
AS $$
BEGIN
    UPDATE Cook
    SET
        cook_name = COALESCE(p_cook_name, cook_name),
        cook_email = COALESCE(p_cook_email, cook_email),
        cook_password = COALESCE(p_cook_password, cook_password),
		cook_profile_picture = COALESCE(p_cook_profile_picture, cook_profile_picture),
		cook_bio = COALESCE(p_cook_bio, cook_bio)
    WHERE cook_id = p_cook_id;
END;
$$ LANGUAGE plpgsql;
```

```SQL
CALL update_cook(
    '5550cd55-b05a-4d4a-869d-4f8212c28760',
    'My new username'
);
```

## Supprimer un utilisateur (Cook)

```SQL
CREATE PROCEDURE delete_cook(
    IN p_cook_id UUID
)
AS $$
BEGIN
    DELETE FROM Cook
    WHERE cook_id = p_cook_id;
END;
$$ LANGUAGE plpgsql;
```

```SQL
CALL delete_cook('123baeba-f55b-497c-8986-068d1186d166');
```
