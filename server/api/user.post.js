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
    if (!validator.isStrongPassword(body.password)) {
      throw createError({
        statusCode: 400,
        message: "Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, a number, and a symbol.",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
      select: { id: true, email: true },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    setCookie(event, "NoteNutJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7d
    });

    setResponseStatus(event, 201);
    return { ok: true, user };
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({ statusCode: 409, message: "A user account with this email address already exists." });
    }
    throw error;
  }
});
