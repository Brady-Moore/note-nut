// /api/user POST
import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      salt: salt,
    },
  });
  console.log(body);
  return { data: "Success" };
});
