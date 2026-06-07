import { Resend } from "resend";
import { NextResponse } from "next/server";

/* ── In-memory rate limiter: 3 submissions per IP per minute ─────────────── */
const rateMap = new Map<string, { count: number; reset: number }>();
function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) { rateMap.set(ip, { count: 1, reset: now + 60_000 }); return true; }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM    = process.env.CONTACT_FROM_EMAIL ?? "SerenEdge <onboarding@resend.dev>";
const TO_SELF = process.env.CONTACT_TO_EMAIL   ?? "dahamdissanayake05@gmail.com";
const IS_SANDBOX = FROM.includes("onboarding@resend.dev");

const LOGO_DARK  = "https://serenedge.com/Base%20Logo%20-%20Dark.png";
const LOGO_LIGHT = "https://serenedge.com/Base%20Logo%20-%20Light.png";

/* ── Colors ── */
const C = {
  navy:        "#1C2B47",
  navyDeep:    "#121826",
  steel:       "#5B8AC5",
  steelDeep:   "#2B5FA0",
  offWhite:    "#E8EAED",
  white:       "#FFFFFF",
  nearBlack:   "#1B1B1E",
  slate:       "#4E5E7A",
  muted:       "#8090A8",
  darkBg:      "#0B0D12",
  darkCard:    "#0E1118",
  darkCardAlt: "#131926",
  darkText:    "#E4E9F2",
  darkMuted:   "#7A8BA8",
  green:       "#22C55E",
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* ────────────────────────────────────────────────────────────────────────────
   Shared head — dark mode media queries + resets
   ──────────────────────────────────────────────────────────────────────────── */
function emailHead(title: string) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${title}</title>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { margin:0 !important; padding:0 !important; width:100% !important; }

    @media (prefers-color-scheme: dark) {
      body, .em-outer { background-color:${C.darkBg} !important; }
      .em-card { background-color:${C.darkCard} !important; }
      .em-logo-cell { background-color:${C.darkCardAlt} !important; }
      .em-body-cell { background-color:${C.darkCard} !important; }
      .em-text { color:${C.darkText} !important; }
      .em-muted { color:${C.darkMuted} !important; }
      .em-label { color:${C.darkMuted} !important; }
      .em-quote-bg { background-color:${C.darkCardAlt} !important; }
      .em-divider { border-top-color:rgba(195,210,230,0.10) !important; }
      .em-meta-row td { background-color:${C.darkCardAlt} !important; }
      .em-meta-border { border-bottom-color:rgba(195,210,230,0.08) !important; }
      .em-footer-text { color:#3A4A60 !important; }
      /* Logo swap */
      .logo-dark  { display:none !important; max-height:0 !important; overflow:hidden !important; }
      .logo-light { display:block !important; max-height:none !important; overflow:visible !important; }
    }
    @media (prefers-color-scheme: light) {
      .logo-dark  { display:block !important; }
      .logo-light { display:none !important; max-height:0 !important; overflow:hidden !important; }
    }
  </style>
</head>`;
}

/* ────────────────────────────────────────────────────────────────────────────
   Shared logo block (switches between dark/light PNG)
   ──────────────────────────────────────────────────────────────────────────── */
function logoBlock() {
  return `
    <tr>
      <td class="em-logo-cell" align="center"
          style="background-color:${C.white};padding:28px 44px 22px;border-radius:16px 16px 0 0;">
        <!-- Dark logo for light mode -->
        <img class="logo-dark" src="${LOGO_DARK}" alt="SerenEdge" height="38" width="auto"
             style="display:block;height:38px;width:auto;max-width:200px;" />
        <!-- Light logo for dark mode (hidden by default, shown via media query) -->
        <img class="logo-light" src="${LOGO_LIGHT}" alt="SerenEdge" height="38" width="auto"
             style="display:none;height:38px;width:auto;max-width:200px;max-height:0;overflow:hidden;" />
      </td>
    </tr>
    <!-- Steel blue accent stripe -->
    <tr>
      <td height="3" style="background-color:${C.steel};height:3px;font-size:0;line-height:0;">&nbsp;</td>
    </tr>`;
}

/* ────────────────────────────────────────────────────────────────────────────
   Template 1 — Confirmation to the inquiry sender
   ──────────────────────────────────────────────────────────────────────────── */
function confirmationHtml(name: string, message: string) {
  const n = esc(name);
  const m = esc(message).replace(/\n/g, "<br>");

  return `${emailHead(`We got your message — SerenEdge`)}
<body style="margin:0;padding:0;background-color:${C.offWhite};">
<table class="em-outer" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:${C.offWhite};">
<tr><td align="center" style="padding:48px 20px 40px;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="max-width:580px;">

  ${logoBlock()}

  <!-- Navy header -->
  <tr>
    <td style="background-color:${C.navy};padding:36px 44px 32px;">
      <p style="margin:0 0 10px 0;color:rgba(255,255,255,0.55);font-size:11px;
                letter-spacing:0.12em;text-transform:uppercase;
                font-family:'Courier New',Courier,monospace;">
        Inquiry received
      </p>
      <h1 style="margin:0;color:${C.white};font-size:26px;font-weight:600;
                 letter-spacing:-0.02em;line-height:1.25;
                 font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        We&rsquo;ll be in touch, ${n}.
      </h1>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td class="em-body-cell em-card"
        style="background-color:${C.white};padding:40px 44px 44px;border-radius:0 0 16px 16px;">

      <p class="em-text"
         style="margin:0 0 16px;font-size:16px;line-height:1.75;color:${C.nearBlack};
                font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        Thanks for reaching out &mdash; your message landed safely.
        Every inquiry at SerenEdge is reviewed personally.
      </p>
      <p class="em-text"
         style="margin:0 0 36px;font-size:16px;line-height:1.75;color:${C.nearBlack};
                font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        Expect a reply within
        <strong style="color:${C.steelDeep};">24 hours</strong>.
        In the meantime, just reply to this email with anything else.
      </p>

      <!-- Divider -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="margin-bottom:28px;">
        <tr>
          <td class="em-divider"
              style="border-top:1px solid rgba(28,43,71,0.10);height:1px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
      </table>

      <!-- Quoted message -->
      <p class="em-label"
         style="margin:0 0 12px;font-size:10px;color:${C.muted};letter-spacing:0.10em;
                text-transform:uppercase;font-family:'Courier New',Courier,monospace;">
        Your message
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="margin-bottom:40px;">
        <tr>
          <td width="3" style="background-color:${C.steel};border-radius:3px 0 0 3px;width:3px;">&nbsp;</td>
          <td class="em-quote-bg"
              style="background-color:#F3F4F7;padding:18px 22px;border-radius:0 10px 10px 0;">
            <p class="em-muted"
               style="margin:0;font-size:14px;line-height:1.8;color:${C.slate};
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${m}</p>
          </td>
        </tr>
      </table>

      <!-- Signature -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="em-divider"
              style="border-top:1px solid rgba(28,43,71,0.10);padding-top:28px;">
            <p style="margin:0 0 3px;font-size:15px;font-weight:600;color:${C.navy};
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              Daham Dissanayake
            </p>
            <p class="em-muted"
               style="margin:0 0 12px;font-size:13px;color:${C.slate};
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              Founder &amp; Engineer &nbsp;&middot;&nbsp; SerenEdge
            </p>
            <p style="margin:0;font-size:13px;font-family:'Courier New',Courier,monospace;">
              <a href="mailto:contact@serenedge.com" style="color:${C.steel};text-decoration:none;">contact@serenedge.com</a>
              &nbsp;&middot;&nbsp;
              <a href="tel:+94704888440" style="color:${C.steel};text-decoration:none;">+94 70 488 8440</a>
            </p>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding:24px 0 0;">
      <p class="em-footer-text"
         style="margin:0 0 5px;font-size:12px;color:${C.muted};
                font-family:'Courier New',Courier,monospace;">
        SerenEdge &nbsp;&middot;&nbsp; Sri Lanka &nbsp;&middot;&nbsp; GMT+5:30
      </p>
      <p class="em-footer-text"
         style="margin:0;font-size:11px;color:#A0AABF;
                font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        You&rsquo;re receiving this because you submitted a contact form at serenedge.com.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ────────────────────────────────────────────────────────────────────────────
   Template 2 — Notification to Daham
   ──────────────────────────────────────────────────────────────────────────── */
function notificationHtml(name: string, email: string, message: string) {
  const n   = esc(name);
  const e   = esc(email);
  const m   = esc(message).replace(/\n/g, "<br>");
  const now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Colombo", dateStyle: "full", timeStyle: "short",
  });

  return `${emailHead(`New inquiry from ${n} — SerenEdge`)}
<body style="margin:0;padding:0;background-color:${C.offWhite};">
<table class="em-outer" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:${C.offWhite};">
<tr><td align="center" style="padding:48px 20px 40px;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="max-width:560px;">

  ${logoBlock()}

  <!-- Navy header -->
  <tr>
    <td style="background-color:${C.navyDeep};padding:28px 36px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.40);
                      letter-spacing:0.10em;text-transform:uppercase;
                      font-family:'Courier New',Courier,monospace;">
              serenedge.com &nbsp;&bull;&nbsp; new inquiry
            </p>
          </td>
          <td align="right">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);
                      font-family:'Courier New',Courier,monospace;">${now}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td class="em-body-cell em-card"
        style="background-color:${C.white};padding:36px 44px 40px;border-radius:0 0 16px 16px;">

      <h2 class="em-text"
          style="margin:0 0 28px;font-size:22px;font-weight:600;color:${C.navy};
                 letter-spacing:-0.02em;line-height:1.2;
                 font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        You got a new message.
      </h2>

      <!-- Sender info table -->
      <table class="em-meta-row" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="border:1px solid rgba(28,43,71,0.12);border-radius:10px;overflow:hidden;margin-bottom:28px;">
        <tr>
          <td class="em-meta-border"
              style="background-color:#F3F4F7;padding:13px 20px;width:72px;
                     border-bottom:1px solid rgba(28,43,71,0.10);">
            <span class="em-label"
                  style="font-size:10px;color:${C.muted};letter-spacing:0.10em;
                         text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Name</span>
          </td>
          <td class="em-meta-border"
              style="background-color:#F3F4F7;padding:13px 20px;
                     border-bottom:1px solid rgba(28,43,71,0.10);">
            <span class="em-text"
                  style="font-size:15px;font-weight:500;color:${C.nearBlack};
                         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${n}</span>
          </td>
        </tr>
        <tr>
          <td style="background-color:#F3F4F7;padding:13px 20px;width:72px;">
            <span class="em-label"
                  style="font-size:10px;color:${C.muted};letter-spacing:0.10em;
                         text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Email</span>
          </td>
          <td style="background-color:#F3F4F7;padding:13px 20px;">
            <a href="mailto:${e}"
               style="font-size:15px;color:${C.steelDeep};text-decoration:none;
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${e}</a>
          </td>
        </tr>
      </table>

      <!-- Message -->
      <p class="em-label"
         style="margin:0 0 12px;font-size:10px;color:${C.muted};letter-spacing:0.10em;
                text-transform:uppercase;font-family:'Courier New',Courier,monospace;">
        Message
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="margin-bottom:36px;">
        <tr>
          <td width="3" style="background-color:${C.steel};border-radius:3px 0 0 3px;width:3px;">&nbsp;</td>
          <td class="em-quote-bg"
              style="background-color:#F3F4F7;padding:18px 22px;border-radius:0 10px 10px 0;">
            <p class="em-muted"
               style="margin:0;font-size:14px;line-height:1.8;color:${C.slate};
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${m}</p>
          </td>
        </tr>
      </table>

      <!-- Reply CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background-color:${C.steelDeep};border-radius:10px;">
            <a href="mailto:${e}?subject=Re%3A%20Your%20inquiry%20to%20SerenEdge"
               style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;
                      color:${C.white};text-decoration:none;letter-spacing:-0.01em;
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              Reply to ${n} &rarr;
            </a>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding:24px 0 0;">
      <p class="em-footer-text"
         style="margin:0;font-size:12px;color:${C.muted};
                font-family:'Courier New',Courier,monospace;">
        SerenEdge &nbsp;&bull;&nbsp; internal notification
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ────────────────────────────────────────────────────────────────────────────
   Route handler
   ──────────────────────────────────────────────────────────────────────────── */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
           ?? request.headers.get("x-real-ip")
           ?? "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json({ error: "Too many requests — try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (
    typeof name    !== "string" || !name.trim()         ||
    typeof email   !== "string" || !email.includes("@") ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }
  if (name.length > 120 || email.length > 254 || message.length > 4000) {
    return NextResponse.json({ error: "Fields too long" }, { status: 400 });
  }

  const n = name.trim();
  const e = email.trim();
  const m = message.trim();

  /* Email 1 — notification to Daham (critical) */
  try {
    const { error } = await resend.emails.send({
      from:    FROM,
      to:      [TO_SELF],
      replyTo: e,
      subject: `New inquiry from ${n}`,
      html:    notificationHtml(n, e, m),
    });
    if (error) {
      console.error("[contact] Notification failed:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
  } catch (err) {
    console.error("[contact] Notification threw:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  /* Email 2 — confirmation to sender (skipped in sandbox) */
  if (!IS_SANDBOX) {
    try {
      const { error } = await resend.emails.send({
        from:    FROM,
        to:      [e],
        subject: `We got your message, ${n} — SerenEdge`,
        html:    confirmationHtml(n, m),
      });
      if (error) {
        console.warn("[contact] Confirmation email failed (non-fatal):", error);
      }
    } catch (err) {
      console.warn("[contact] Confirmation email threw (non-fatal):", err);
    }
  }

  return NextResponse.json({ success: true });
}
