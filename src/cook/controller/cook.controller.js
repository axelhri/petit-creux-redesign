import * as db from "../../config/db.config.js";

const register = (name, email, password, profilePicture) => {
  return db.query(
    "INSERT INTO Cook(cook_id, cook_name, cook_email, cook_password, cook_profile_picture) VALUES(gen_random_uuid(), $1, $2, $3, $4) RETURNING *",
    [name, email, password, profilePicture]
  );
};

export { register };
