import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields, phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    phoneNumberClient(),
    emailOTPClient(),
    inferAdditionalFields({
      user: {
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
      },
    }),
  ],
});
