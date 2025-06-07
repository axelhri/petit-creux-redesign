import { z } from "zod";

const LoginSchema = z.object({
  cook_email: z.string().trim().email(),
  cook_password: z.string().trim(),
});

export default LoginSchema;
