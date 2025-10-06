import { d as defineEventHandler, p as parseCookies, c as createError } from '../../nitro/nitro.mjs';
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

const notes = defineEventHandler(async (event) => {
  try {
    const token = parseCookies(event).NoteNutJWT;
    if (!token) throw createError({ statusCode: 401, statusMessage: "Not authorized to access notes" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const notes = await prisma.note.findMany({
      where: { userId: decoded.id },
      orderBy: { updatedAt: "desc" }
    });
    return notes;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch notes" });
  }
});

export { notes as default };
//# sourceMappingURL=notes.mjs.map
