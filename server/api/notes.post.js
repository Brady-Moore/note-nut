import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";

export default defineEventHandler(async (event) => {
  try {
    const token = parseCookies(event).NoteNutJWT;
    if (!token) throw createError({ statusCode: 401, statusMessage: "Not authorized to create note" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newNote = await prisma.note.create({
      data: { text: "", userId: decoded.id },
    });

    setResponseStatus(event, 201);
    return newNote;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Could not create note" });
  }
});
