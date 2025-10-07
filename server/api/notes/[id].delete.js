import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma.ts";

export default defineEventHandler(async (event) => {
  try {
    const id = Number(getRouterParam(event, "id"));
    if (Number.isNaN(id)) throw createError({ statusCode: 400, statusMessage: "Invalid note id" });

    const token = parseCookies(event).NoteNutJWT;
    if (!token) throw createError({ statusCode: 401, statusMessage: "Not authorized to delete note" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) throw createError({ statusCode: 404, statusMessage: "Note does not exist" });

    if (note.userId !== decoded.id) {
      throw createError({ statusCode: 403, statusMessage: "No permission to delete note" });
    }

    await prisma.note.delete({ where: { id } });
    setResponseStatus(event, 204);
    return null;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to delete note" });
  }
});
