import jwt from "jsonwebtoken";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      verifyJwtToken: (token, secret, options) => {
        try {
          return jwt.verify(token, secret, options);
        } catch (err) {
          console.error("JWT verification failed:", err.message);

          if (err.name === "TokenExpiredError") {
            console.warn("JWT expired at:", err.expiredAt);
          }
          throw err;
        }
      },
    },
  };
});
