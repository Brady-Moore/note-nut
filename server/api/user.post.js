// /api/user POST
import bcrypt from "bcryptjs";
import validator from "validator";
import { prisma } from "../utils/prisma.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email address",
      });
    }
    if (!validator.isStrongPassword(body.password)) {
      throw createError({
        statusCode: 400,
        message: "Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, a number, and a symbol.",
      });
    }

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
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "A user account with this email address already exists.",
      });
    }

    throw error;
  }
});
