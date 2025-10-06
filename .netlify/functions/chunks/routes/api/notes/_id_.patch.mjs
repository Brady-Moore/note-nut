import { d as defineEventHandler, r as readBody, g as getRouterParam, p as parseCookies, c as createError } from '../../../nitro/nitro.mjs';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const _id__patch = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = getRouterParam(event, "id");
    const token = parseCookies(event).NoteNutJWT;
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorized to update"
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const noteTryingToUpdate = await prisma.note.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (!noteTryingToUpdate) {
      throw createError({
        statusCode: 404,
        statusMessage: "Note does not exist"
      });
    }
    if (note.userId !== decoded.id) {
      throw createError({ statusCode: 403, statusMessage: "No permission to update note" });
    }
    const { updatedNote, text } = body;
    const content = typeof updatedNote === "string" ? updatedNote : text;
    if (!content || typeof content !== "string") {
      throw createError({ statusCode: 400, statusMessage: "Invalid note content" });
    }
    await prisma.note.update({
      where: {
        id: Number(id)
      },
      data: {
        text: body.updatedNote
      }
    });
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to update note" });
  }
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
