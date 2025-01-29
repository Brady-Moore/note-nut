export default defineEventHandler(async (event) => {
  try {
    const user = await prisma.note.findMany();
    return notes;
  } catch (error) {}
});
