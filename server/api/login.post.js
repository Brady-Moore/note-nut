import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma.ts";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!validator.isEmail(body.email)) {
      throw createError({ statusCode: 400, message: "Invalid email address" });
    }
    if (typeof body.password !== "string" || body.password.length === 0) {
      throw createError({ statusCode: 400, message: "Password is required" });
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      throw createError({ statusCode: 401, message: "Email or password is not valid" });
    }

    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      throw createError({ statusCode: 401, message: "Email or password is not valid" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    setCookie(event, "NoteNutJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7d
    });

    return { ok: true };
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({ statusCode: 409, message: "A user account with this email address already exists." });
    }
    throw error;
  }
});
