import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = Number(getRouterParam(event, "id"));
    if (Number.isNaN(id)) throw createError({ statusCode: 400, statusMessage: "Invalid note id" });

    const token = parseCookies(event).NoteNutJWT;
    if (!token) throw createError({ statusCode: 401, statusMessage: "Not authorized to update" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) throw createError({ statusCode: 404, statusMessage: "Note does not exist" });

    if (note.userId !== decoded.id) {
      throw createError({ statusCode: 403, statusMessage: "No permission to update note" });
    }

    const text = typeof body.updatedNote === "string" ? body.updatedNote : body.text;
    if (typeof text !== "string") {
      throw createError({ statusCode: 400, statusMessage: "Invalid payload" });
    }

    const updated = await prisma.note.update({
      where: { id },
      data: { text },
      select: { id: true, text: true, updatedAt: true },
    });

    return updated;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to update note" });
  }
});
