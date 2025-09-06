import { z } from "zod";

const LoginSchema = z.object({
  cook_email: z.string().trim().email().nonempty(),
  cook_password: z.string().trim().nonempty(),
});

export default LoginSchema;
