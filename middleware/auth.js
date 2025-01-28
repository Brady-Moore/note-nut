import jwt from "jsonwebtoken";

export default defineNuxtRouteMiddleware(async (event) => {
  if (process.client) return;

  const { $verifyJwtToken } = useNuxtApp();
  console.log("middleware fired");
  const token = useCookie("NoteNutJWT");
  console.log(token.value);

  if (!token.value) {
    return navigateTo("/register");
  }
  try {
    await $verifyJwtToken(token.value, process.env.JWT_SECRET);
  } catch (error) {
    return navigateTo("/register");
  }
});
