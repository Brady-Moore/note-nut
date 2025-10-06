import { d as defineEventHandler, r as readBody, c as createError, s as setCookie, a as setResponseStatus } from '../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { p as prisma } from '../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const user_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!validator.isEmail(body.email)) {
      throw createError({ statusCode: 400, message: "Invalid email address" });
    }
    if (!validator.isStrongPassword(body.password)) {
      throw createError({
        statusCode: 400,
        message: "Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, a number, and a symbol."
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword
      },
      select: { id: true, email: true }
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    setCookie(event, "NoteNutJWT", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
      // 7d
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

export { user_post as default };
//# sourceMappingURL=user.post.mjs.map
