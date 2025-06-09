# Commandes SQL avancées

## Créer un utilisateur (Cook)

```SQL
CREATE PROCEDURE create_cook(
    IN p_cook_name VARCHAR,
    IN p_cook_email VARCHAR,
    IN p_cook_password VARCHAR,
    IN p_cook_profile_picture TEXT,
    OUT o_cook_id UUID
)
AS $$
BEGIN
    INSERT INTO Cook (cook_id, cook_name, cook_email, cook_password, cook_profile_picture)
    VALUES (gen_random_uuid(), p_cook_name, p_cook_email, p_cook_password, p_cook_profile_picture)
    RETURNING cook_id
    INTO o_cook_id;
END;
$$ LANGUAGE plpgsql;
```

```SQL
CALL create_cook(
'dfgdfg',
'fdgd@gmail.com',
'freyaPassword',
'https://res.cloudinary.com/dsoqmhreg/image/upload/v1729761039/recipes-images/bgln3tz9nd0esh4lrzyj.jpg',
NULL
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

## Trigger pour les modifications de compte utilisateur (Cook)

```SQL
CREATE FUNCTION cook_logs()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW.cook_name IS DISTINCT FROM OLD.cook_name THEN
        INSERT INTO cook_archive (cook_archive_id, cook_archive_newvalue, cook_archive_oldvalue, cook_id)
        VALUES (
            gen_random_uuid(),
            NEW.cook_name,
            OLD.cook_name,
            NEW.cook_id
        );

    ELSIF NEW.cook_email IS DISTINCT FROM OLD.cook_email THEN
        INSERT INTO cook_archive (cook_archive_id, cook_archive_newvalue, cook_archive_oldvalue, cook_id)
        VALUES (
            gen_random_uuid(),
            NEW.cook_email,
            OLD.cook_email,
            NEW.cook_id
        );

    ELSIF NEW.cook_password IS DISTINCT FROM OLD.cook_password THEN
        INSERT INTO cook_archive (cook_archive_id, cook_archive_newvalue, cook_archive_oldvalue, cook_id)
        VALUES (
            gen_random_uuid(),
            NEW.cook_password,
            OLD.cook_password,
            NEW.cook_id
        );

	ELSIF NEW.cook_profile_picture IS DISTINCT FROM OLD.cook_profile_picture THEN
        INSERT INTO cook_archive (cook_archive_id, cook_archive_newvalue, cook_archive_oldvalue, cook_id)
        VALUES (
            gen_random_uuid(),
            NEW.cook_profile_picture,
            OLD.cook_profile_picture,
            NEW.cook_id
        );

	ELSIF NEW.cook_bio IS DISTINCT FROM OLD.cook_bio THEN
        INSERT INTO cook_archive (cook_archive_id, cook_archive_newvalue, cook_archive_oldvalue, cook_id)
        VALUES (
            gen_random_uuid(),
            NEW.cook_bio,
            OLD.cook_bio,
            NEW.cook_id
        );

    END IF;
    RETURN NEW;
END;
$$ language plpgsql;
```

```SQL
CREATE TRIGGER cook_trigger
AFTER UPDATE ON Cook
FOR EACH ROW
EXECUTE FUNCTION cook_logs();
```

## Trigger pour la colonne cook_updated_at

```SQL
CREATE OR REPLACE FUNCTION cook_update_logs()
RETURNS TRIGGER AS $$
BEGIN
   NEW.cook_updated_at  = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```SQL
CREATE TRIGGER cook_update_logs
BEFORE UPDATE ON Cook
FOR EACH ROW
EXECUTE FUNCTION cook_update_logs();
```
