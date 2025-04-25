export default defineNuxtRouteMiddleware(async (event) => {
  if (process.client) return;

  const { $verifyJwtToken } = useNuxtApp();
  const token = useCookie("NoteNutJWT");

  if (!token.value) {
    return navigateTo("/login");
  }

  try {
    await $verifyJwtToken(token.value, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      console.warn("Token expired — redirecting to login");
    }

    return navigateTo("/login");
  }
});
