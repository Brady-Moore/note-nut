// /api/user POST

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("HELLO");
  return { data: "HELLO" };
});
