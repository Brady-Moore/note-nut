export default defineNuxtRouteMiddleware(async (event) => {
  if (process.client) return;

  const { $verifyJwtToken } = useNuxtApp();
  const token = useCookie("NoteNutJWT");

  if (!token.value) {
    return navigateTo("/register");
  }
  try {
    await $verifyJwtToken(token.value, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return navigateTo("/register");
  }
});
