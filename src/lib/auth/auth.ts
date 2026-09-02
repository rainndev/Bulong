import { betterAuth } from "better-auth";
import { renderVerificationEmail } from "@/lib/auth/emails";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma";

const APP_NAME = "Bulong";

const FROM_EMAIL = process.env.EMAIL_FROM ?? "Bulong <rainiersison1@gmail.com>";

const parseSender = (from: string): { name: string; email: string } => {
  const match = from.match(/^(.*?)\s*<(.+)>$/);

  if (match) {
    return { name: match[1].trim() || APP_NAME, email: match[2].trim() };
  }

  return { name: APP_NAME, email: from.trim() };
};

const sendViaBrevo = async (
  to: string,
  subject: string,
  html: string,
): Promise<{ ok: boolean; error?: string } | null> => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: parseSender(FROM_EMAIL),
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();

      if (body.includes("sender") || res.status === 401 || res.status === 403) {
        console.error(
          `[brevo] Sender "${FROM_EMAIL}" was rejected. Validate it at https://app.brevo.com/senders — response: ${body}`,
        );
      } else {
        console.error(`Brevo ${res.status}: ${body}`);
      }

      return { ok: false, error: `Brevo ${res.status}: ${body}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: `Brevo request failed: ${err}` };
  }
};


const sendVerificationEmailFn = async ({
  user,
  url,
}: {
  user: { email: string };
  url: string;
}) => {
  // Point the post-verification redirect at our success page
  const verifyUrl = new URL(url);
  verifyUrl.searchParams.set("callbackURL", "/email-verified");

  const result = await sendViaBrevo(
    user.email,
    `Verify your ${APP_NAME} email`,
    renderVerificationEmail(verifyUrl.toString()),
  );

  if (result === null) {
    // Dev without key: log the link so verification is still testable
    console.log(
      `[dev] Verification email for ${user.email}: ${verifyUrl.toString()}`,
    );
    return;
  }

  if (!result.ok) {
    console.error(result.error);
  }
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailVerification: {
    sendVerificationEmail: sendVerificationEmailFn,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Automatic send right after sign-up
    sendVerificationEmail: sendVerificationEmailFn,
  },
});
