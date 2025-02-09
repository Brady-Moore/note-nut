export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = await getRouterParam(event, "id");

    await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        text: body.updatedNote,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
