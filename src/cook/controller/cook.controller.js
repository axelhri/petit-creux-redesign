import * as db from "../../config/db.config.js";

const register = (name, email, password, profilePicture) => {
  return db.query("CALL create_cook($1, $2, $3, $4, $5)", [
    name,
    email,
    password,
    profilePicture,
    null,
  ]);
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

const deleteCook = (id) => {
  return db.query("CALL delete_cook($1)", [id]);
};

export { register, login, getCook, editCook, deleteCook };
