import { d as defineEventHandler, p as parseCookies, c as createError, a as setResponseStatus } from '../../nitro/nitro.mjs';
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

const notes_post = defineEventHandler(async (event) => {
  try {
    const token = parseCookies(event).NoteNutJWT;
    if (!token) throw createError({ statusCode: 401, statusMessage: "Not authorized to create note" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newNote = await prisma.note.create({
      data: { text: "", userId: decoded.id }
    });
    setResponseStatus(event, 201);
    return newNote;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Could not create note" });
  }
});

export { notes_post as default };
//# sourceMappingURL=notes.post.mjs.map
