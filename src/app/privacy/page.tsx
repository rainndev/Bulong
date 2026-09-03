import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bulong",
  description:
    "How Bulong collects, uses, and protects your data — in plain language.",
};

const sections = [
  {
    title: "What we collect",
    body: [
      "Account data: your email, username, and password (hashed). Your email is only used for login and verification — never shown to anyone.",
      "Message metadata: when someone sends you an anonymous message, we store their country and region (from IP geolocation), device type, OS, and browser. We never see or store their identity.",
      "Message content: the messages themselves, stored exactly as sent. Profanity-filtered — abusive messages are rejected before storage.",
      "Technical logs: standard server logs (IP address, timestamps) used for rate limiting and abuse prevention.",
    ],
  },
  {
    title: "What we never collect",
    body: [
      "Real names or identities of anonymous senders — we can't tie a message to a person even if we wanted to.",
      "No trackers, no ad pixels, no fingerprinting, no third-party analytics.",
      "No access to your contacts, social accounts, or anything outside Bulong.",
    ],
  },
  {
    title: "Services we use",
    body: [
      "Neon (neon.tech) — hosts our PostgreSQL database. Your account and messages live here.",
      "Brevo (brevo.com) — sends verification emails. They receive your email address solely for that send. Nothing else.",
      "GeoJS (geojs.io) — converts a sender's IP into a country at submission time. We send them an IP address, not any message content.",
      "Vercel (vercel.com) — hosts the app itself. Their standard request logs process IPs for routing and DDoS protection.",
    ],
  },
  {
    title: "How we use your data",
    body: [
      "To show you your inbox: messages, and where they roughly came from.",
      "To keep spam out: IP-based rate limiting and profanity filtering.",
      "To verify accounts: one verification email at sign-up, and only when you ask for a resend.",
      "That's it. No marketing emails. No selling data. No 'improving our partners' experiences'.",
    ],
  },
  {
    title: "Anonymity, honestly",
    body: [
      "Messages are not tied to any sender account — there is no sender account. The metadata we store (country, device) is approximate and cannot identify a person.",
      "The message content itself is stored as-is in our database. Server administrators can technically access stored data — if you need messages to be secret from everyone including us, don't put secrets in an anonymous message box.",
      "You can delete any message from your inbox at any time. Deleting is permanent.",
    ],
  },
  {
    title: "Your controls",
    body: [
      "Delete individual messages anytime — permanent and immediate.",
      "Pause receiving messages entirely (Settings → Accept Messages).",
      "Limit how many messages you receive per day (Settings → Limit Message).",
      "Hide previews of unread messages (Settings → Spoil Unread Messages).",
      "Want your account and all its data gone? Email us and we'll wipe it.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "One session cookie so you stay logged in. No consent banner needed because there's nothing to consent to — no tracking, no advertising, no analytics cookies.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If this policy changes materially, we'll say so here in plain language. Continued use after changes means you're okay with them.",
    ],
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="sketch-grid font-fredoka flex min-h-dvh w-full flex-col items-center bg-[#fdfaf2] text-[#1f1c14]">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 md:px-8 md:py-16">
        <h1 className="relative mt-2 text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] font-bold tracking-tight">
          Privacy Policy
          <svg
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className="mt-2 h-4 w-56 md:w-72"
          >
            <path
              d="M 4 12 Q 50 4, 100 10 T 200 10 T 296 12"
              fill="none"
              stroke="#65a30d"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:gap-10">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={`rounded-xl border-2 border-[#1f1c14] bg-white p-6 shadow-[6px_6px_0_#1f1c14] md:p-8 ${
                index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"
              }`}
            >
              <h2 className="font-kalam text-xl font-bold md:text-2xl">
                {section.title}
              </h2>

              <ul className="mt-4 flex flex-col gap-3">
                {section.body.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed font-medium text-[#1f1c14]/80 md:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-2 shrink-0 rounded-full border-2 border-[#1f1c14] bg-[#a3e635]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="font-kalam mt-10 text-center text-sm font-bold text-[#1f1c14]/50">
          Last updated: September 2026 · Questions? Reach out anytime.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
