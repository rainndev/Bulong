/**
 * Email templates rendered as table-based HTML (email-client safe:
 * inline styles only, no flexbox/external CSS/SVG).
 *
 * Fredoka: loaded from Google Fonts in <head>. Apple Mail, iOS Mail,
 * Samsung Mail and Thunderbird render it; Gmail/Outlook strip webfonts
 * and fall back to the system sans stack (same metrics family).
 *
 * Mobile: viewport meta + a <style> media query that tightens card
 * padding on small screens. Outlook ignores it and keeps desktop
 * padding — graceful degradation.
 */

const INK = "#111111";
const ACCENT = "#a3e635";
const PAPER = "#ffffff";
const MUTED = "#6b6b6b";
const BORDER = "#111111";

const GRID_BG =
  "linear-gradient(rgba(31,28,20,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31,28,20,0.06) 1px, transparent 1px)";
const GRID_SIZE = "32px 32px";

// Tailwind's rounded-xl (0.75rem). Outlook desktop ignores border-radius
// (sharp corners there); applying it to the <table> element itself gives
// the broadest support elsewhere.
const RADIUS = "12px";

const FONT =
  "'Fredoka', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const renderVerificationEmail = (url: string): string => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>Verify your Bulong email</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');

      h1, .body-copy, .cta a, .footnote, .eyebrow {
        /* fluid type — scales with viewport width between px bounds.
           Clients that don't support clamp() ignore the whole
           declaration and fall back to the inline px size. */
        font-size: clamp(18px, 4.8vw, 22px);
      }
      .body-copy { font-size: clamp(13px, 3.4vw, 14px); }
      .cta a { font-size: clamp(13px, 3.4vw, 14px); }
      .footnote { font-size: clamp(11px, 3vw, 12px); }
      .eyebrow { font-size: clamp(9px, 2.5vw, 11px); }

      /* Mobile: tighten the card and footer padding */
      @media only screen and (max-width: 600px) {
        .card-pad { padding: 28px 22px !important; }
        .outer-pad { padding: 36px 12px !important; }
        .cta a { padding: 12px 22px !important; }
      }

      /* slight hand-placed tilt on the card — matches the app's
         rotated sketch cards. Ignored by Outlook (flat card there). */
      .tilt {
        -ms-transform: rotate(-1.2deg);
        -webkit-transform: rotate(-1.2deg);
        transform: rotate(-1.2deg);
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${PAPER};background-image:${GRID_BG};background-size:${GRID_SIZE};-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAPER};background-image:${GRID_BG};background-size:${GRID_SIZE};">
      <tr>
        <td align="center" class="outer-pad" style="padding:64px 16px;">

          <!-- card with single flat offset shadow (nested-table technique) -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="tilt" style="max-width:440px;">
            <tr>
              <td style="background-color:${INK};border-radius:${RADIUS};padding:0 6px 6px 0;">

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                       style="background-color:${PAPER};border:1.5px solid ${BORDER};border-radius:${RADIUS};overflow:hidden;">
                  <tr>
                    <td class="card-pad" style="padding:44px 40px;">

                      <!-- eyebrow as a lime pill badge with offset shadow -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 17px 0;">
                        <tr>
                          <td style="background-color:${INK};border-radius:999px;padding:0 3px 3px 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-radius:999px;overflow:hidden;">
                              <tr>
                                <td class="eyebrow" style="background-color:${ACCENT};border:1.5px solid ${BORDER};border-radius:999px;padding:5px 14px;font-family:${FONT};font-size:9px;font-weight:700;color:${INK};letter-spacing:0.08em;text-transform:uppercase;">
                                  Email verification
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <h1 style="margin:0 0 16px 0;font-family:${FONT};font-size:22px;line-height:1.3;color:${INK};font-weight:700;letter-spacing:-0.01em;">
                        Kumpirmahin ang email mo
                      </h1>

                      <p class="body-copy" style="margin:0 0 32px 0;font-family:${FONT};font-size:14px;line-height:1.65;color:${MUTED};">
                        Welcome sa Bulong. I-click ang button sa ibaba para
                        i-verify ang email address mo.
                      </p>

                      <!-- CTA button with offset drop shadow -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px 0;" class="cta">
                        <tr>
                          <td style="background-color:${INK};border-radius:${RADIUS};padding:0 4px 4px 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-radius:${RADIUS};overflow:hidden;">
                              <tr>
                                <td style="background-color:${ACCENT};border:1.5px solid ${BORDER};border-radius:${RADIUS};">
                                  <a href="${url}"
                                     style="display:inline-block;padding:12px 28px;font-family:${FONT};font-size:14px;font-weight:700;color:${INK};text-decoration:none;">
                                    Verify email
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                        <tr>
                          <td style="border-top:1px solid ${BORDER};opacity:0.12;font-size:0;line-height:0;">&nbsp;</td>
                        </tr>
                      </table>

                      <p class="footnote" style="margin:0 0 6px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED};">
                        Link expires in 24 hours. Hindi gumagana ang button?
                      </p>
                      <p class="footnote" style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;">
                        <a href="${url}" style="color:${INK};word-break:break-all;">${url}</a>
                      </p>

                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>

          <!-- footer -->
          <p style="margin:32px 0 0 0;font-family:${FONT};font-size:12px;color:${MUTED};">
            &copy; ${new Date().getFullYear()} Bulong
          </p>

        </td>
      </tr>
    </table>
  </body>
</html>
`;
