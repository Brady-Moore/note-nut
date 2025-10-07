import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma.ts";

export default defineEventHandler(async (event) => {
  try {
    const token = parseCookies(event).NoteNutJWT;
    if (!token) throw createError({ statusCode: 401, statusMessage: "Not authorized to access notes" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const notes = await prisma.note.findMany({
      where: { userId: decoded.id },
      orderBy: { updatedAt: "desc" },
    });

    return notes;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch notes" });
  }
});
