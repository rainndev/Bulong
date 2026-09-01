import { betterAuth } from "better-auth";
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

const renderVerificationEmail = (url: string) => `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#fdfaf2;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:480px;margin:0 auto;padding:40px 24px;">
      <div style="text-align:center;margin-bottom:32px;">
        <span style="display:inline-block;background-color:#a3e635;color:#1f1c14;border:2px solid #1f1c14;border-radius:12px;padding:10px 18px;font-size:20px;font-weight:bold;">
          Bulong.
        </span>
      </div>

      <div style="background-color:#ffffff;border:2px solid #1f1c14;border-radius:12px;padding:32px;box-shadow:6px 6px 0 #1f1c14;">
        <h1 style="margin:0 0 12px;font-size:22px;color:#1f1c14;">
          Kumpirmahin ang email mo
        </h1>
        <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#1f1c14;">
          Welcome sa Bulong! I-click ang button below para i-verify ang email
          address mo at makapagsimula ng pagtanggap ng anonymous messages.
        </p>
        <p style="margin:0 0 24px;font-size:13px;color:#1f1c14;opacity:0.6;">
          This link expires in 24 hours.
        </p>

        <a href="${url}"
           style="display:inline-block;background-color:#a3e635;color:#1f1c14;border:2px solid #1f1c14;border-radius:999px;padding:12px 28px;font-size:15px;font-weight:bold;text-decoration:none;box-shadow:4px 4px 0 #1f1c14;">
          Verify Email
        </a>

        <p style="margin:24px 0 0;font-size:12px;color:#1f1c14;opacity:0.6;line-height:1.6;">
          Kung hindi mo na-click ang button, pwede mo ring buksan ang link na
          ito:<br>
          <a href="${url}" style="color:#65a30d;word-break:break-all;">${url}</a>
        </p>
      </div>

      <p style="text-align:center;font-size:12px;color:#1f1c14;opacity:0.4;margin-top:24px;">
        © ${new Date().getFullYear()} Bulong · anonymous na mensahe, totoong opinyon
      </p>
    </div>
  </body>
</html>
`;

const sendVerificationEmailFn = async ({
  user,
  url,
}: {
  user: { email: string };
  url: string;
}) => {
  const result = await sendViaBrevo(
    user.email,
    `Verify your ${APP_NAME} email`,
    renderVerificationEmail(url),
  );

  if (result === null) {
    // Dev without key: log the link so verification is still testable
    console.log(`[dev] Verification email for ${user.email}: ${url}`);
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
