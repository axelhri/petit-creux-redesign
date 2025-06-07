import * as db from "../../config/db.config.js";

const register = (name, email, password, profilePicture) => {
  return db.query(
    "INSERT INTO Cook(cook_id, cook_name, cook_email, cook_password, cook_profile_picture) VALUES(gen_random_uuid(), $1, $2, $3, $4) RETURNING *",
    [name, email, password, profilePicture]
  );
};

const login = (email) => {
  return db.query("SELECT * FROM Cook WHERE cook_email=$1", [email]);
};

const getCook = (id) => {
  return db.query("SELECT * FROM Cook WHERE cook_id=$1", [id]);
};

const editCook = (id, data) => {
  const { name, email, password, profilePicture, bio } = data;

  return db.query("CALL update_cook($1, $2, $3, $4, $5, $6)", [
    id,
    name,
    email,
    password,
    profilePicture,
    bio,
  ]);
};

export { register, login, getCook, editCook };
