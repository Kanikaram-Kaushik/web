import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { emailOTP, phoneNumber } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
    },
  },
  rateLimit: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60, // Cache duration in seconds
    },
  },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        console.log("[auth] Phone OTP", { phoneNumber, code });
      },
      ...(process.env.DEMO_MODE === "true"
        ? {
            verifyOTP: async ({ code }) => code === "000000",
          }
        : {}),
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => `phone-${phoneNumber.replace(/\D/g, "")}@temp.local`,
        getTempName: (phoneNumber) => phoneNumber,
      },
    }),
    emailOTP({
      ...(process.env.DEMO_MODE === "true"
        ? {
            generateOTP: () => "000000",
          }
        : {}),
      async sendVerificationOTP({ email, otp, type }) {
        console.log("[auth] Email OTP", { email, otp, type });
      },
    }),
  ],
});
