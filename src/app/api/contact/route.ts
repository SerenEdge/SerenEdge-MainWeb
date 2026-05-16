import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM    = process.env.CONTACT_FROM_EMAIL ?? "SerenEdge <onboarding@resend.dev>";
const TO_SELF = process.env.CONTACT_TO_EMAIL   ?? "dahamdissanayake05@gmail.com";

/* Sandbox mode = using Resend's test domain.
   In sandbox, emails can only be sent to your own verified Resend address.
   We skip the confirmation email to the user in this case. */
const IS_SANDBOX = FROM.includes("onboarding@resend.dev");

/* ── HTML escape ── */
function esc(s: string) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* ─────────────────────────────────────────────────────────────────────────────
   Template 1 — Confirmation to the person who submitted
   ───────────────────────────────────────────────────────────────────────────── */
function confirmationHtml(name: string, message: string) {
  const n = esc(name);
  const m = esc(message).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>We got your message — SerenEdge</title>
</head>
<body style="margin:0;padding:0;background-color:#eef0f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef0f5">
<tr><td align="center" style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">

  <!-- Logo -->
  <tr>
    <td align="center" style="padding-bottom:28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td bgcolor="#6366f1" width="32" height="32"
              style="background:#6366f1;border-radius:8px;text-align:center;vertical-align:middle;width:32px;height:32px;">
            <span style="color:#fff;font-size:15px;font-weight:700;font-family:'Courier New',monospace;line-height:32px;display:block;">S</span>
          </td>
          <td style="padding-left:10px;vertical-align:middle;">
            <span style="font-size:17px;font-weight:600;color:#0f1424;letter-spacing:-0.02em;font-family:system-ui,-apple-system,sans-serif;">
              Seren<span style="color:#6366f1;">Edge</span>
            </span>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Card -->
  <tr>
    <td bgcolor="#ffffff"
        style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 40px rgba(15,20,36,0.07);">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

      <!-- Card header -->
      <tr>
        <td bgcolor="#4f46e5"
            style="background:#6366f1;padding:36px 44px 32px;border-radius:20px 20px 0 0;">
          <p style="margin:0 0 10px;color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-family:'Courier New',monospace;">
            Inquiry received
          </p>
          <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:600;letter-spacing:-0.02em;line-height:1.25;font-family:system-ui,-apple-system,sans-serif;">
            We&rsquo;ll be in touch, ${n}.
          </h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 44px 36px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#444c5e;font-family:system-ui,-apple-system,sans-serif;">
            Thanks for reaching out &mdash; your message landed safely. Every inquiry at SerenEdge is reviewed personally.
          </p>
          <p style="margin:0 0 36px;font-size:16px;line-height:1.8;color:#444c5e;font-family:system-ui,-apple-system,sans-serif;">
            You can expect a reply within <strong style="color:#0f1424;">24 hours</strong>.
            In the meantime, if you have anything else to share, simply reply to this email.
          </p>

          <!-- Divider -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr><td style="border-top:1px solid #eef0f5;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
          </table>

          <!-- Quoted message -->
          <p style="margin:0 0 14px;font-size:11px;color:#9ba3c0;letter-spacing:0.1em;text-transform:uppercase;font-family:'Courier New',monospace;">
            Your message
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;">
            <tr>
              <td width="3" bgcolor="#6366f1"
                  style="background:#6366f1;border-radius:3px 0 0 3px;width:3px;">&nbsp;</td>
              <td bgcolor="#f8f8fd"
                  style="background:#f8f8fd;padding:18px 22px;border-radius:0 10px 10px 0;">
                <p style="margin:0;font-size:14px;line-height:1.8;color:#555e78;font-family:system-ui,-apple-system,sans-serif;">${m}</p>
              </td>
            </tr>
          </table>

          <!-- Signature -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="border-top:1px solid #eef0f5;padding-top:28px;">
                <p style="margin:0 0 3px;font-size:15px;font-weight:600;color:#0f1424;font-family:system-ui,-apple-system,sans-serif;">
                  Daham Dissanayake
                </p>
                <p style="margin:0 0 12px;font-size:13px;color:#9ba3c0;font-family:system-ui,-apple-system,sans-serif;">
                  Founder &amp; Engineer &nbsp;&middot;&nbsp; SerenEdge
                </p>
                <p style="margin:0;font-size:13px;color:#9ba3c0;font-family:system-ui,-apple-system,sans-serif;">
                  <a href="mailto:contact@serenedge.com" style="color:#6366f1;text-decoration:none;">contact@serenedge.com</a>
                  &nbsp;&middot;&nbsp;
                  <a href="tel:+94704888440" style="color:#6366f1;text-decoration:none;">+94 70 488 8440</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding:28px 0 0;">
      <p style="margin:0 0 6px;font-size:12px;color:#b0b8cc;font-family:system-ui,-apple-system,sans-serif;">
        SerenEdge &nbsp;&middot;&nbsp; Sri Lanka &nbsp;&middot;&nbsp; GMT+5:30
      </p>
      <p style="margin:0;font-size:12px;color:#c8cfe0;font-family:system-ui,-apple-system,sans-serif;">
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

/* ─────────────────────────────────────────────────────────────────────────────
   Template 2 — Notification to Daham
   ───────────────────────────────────────────────────────────────────────────── */
function notificationHtml(name: string, email: string, message: string) {
  const n = esc(name);
  const e = esc(email);
  const m = esc(message).replace(/\n/g, "<br>");
  const now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New inquiry from ${n} — SerenEdge</title>
</head>
<body style="margin:0;padding:0;background-color:#07090f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#07090f">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

  <!-- Header bar -->
  <tr>
    <td bgcolor="#0a0e1a"
        style="background:#0a0e1a;border:1px solid rgba(255,255,255,0.08);border-radius:16px 16px 0 0;padding:20px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0;font-size:11px;color:#5d6478;letter-spacing:0.1em;text-transform:uppercase;font-family:'Courier New',monospace;">
              serenedge.com &nbsp;&bull;&nbsp; new inquiry
            </p>
          </td>
          <td align="right">
            <p style="margin:0;font-size:11px;color:#5d6478;font-family:'Courier New',monospace;">${now}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Accent strip -->
  <tr>
    <td bgcolor="#6366f1" height="3"
        style="background:#6366f1;height:3px;font-size:0;line-height:0;">&nbsp;</td>
  </tr>

  <!-- Card body -->
  <tr>
    <td bgcolor="#0a0e1a"
        style="background:#0a0e1a;border:1px solid rgba(255,255,255,0.08);border-top:0;border-radius:0 0 16px 16px;padding:32px;">

      <h2 style="margin:0 0 28px;font-size:22px;font-weight:600;color:#e7e9f0;letter-spacing:-0.02em;line-height:1.2;font-family:system-ui,-apple-system,sans-serif;">
        You got a new message.
      </h2>

      <!-- Sender info -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;margin-bottom:28px;">
        <tr>
          <td bgcolor="#0f1424" width="80"
              style="background:#0f1424;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.06);width:80px;">
            <span style="font-size:10px;color:#5d6478;letter-spacing:0.1em;text-transform:uppercase;font-family:'Courier New',monospace;">Name</span>
          </td>
          <td bgcolor="#0f1424"
              style="background:#0f1424;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;font-weight:500;color:#e7e9f0;font-family:system-ui,-apple-system,sans-serif;">${n}</span>
          </td>
        </tr>
        <tr>
          <td bgcolor="#0f1424"
              style="background:#0f1424;padding:14px 20px;width:80px;">
            <span style="font-size:10px;color:#5d6478;letter-spacing:0.1em;text-transform:uppercase;font-family:'Courier New',monospace;">Email</span>
          </td>
          <td bgcolor="#0f1424" style="background:#0f1424;padding:14px 20px;">
            <a href="mailto:${e}" style="font-size:15px;color:#6366f1;text-decoration:none;font-family:system-ui,-apple-system,sans-serif;">${e}</a>
          </td>
        </tr>
      </table>

      <!-- Message -->
      <p style="margin:0 0 12px;font-size:10px;color:#5d6478;letter-spacing:0.1em;text-transform:uppercase;font-family:'Courier New',monospace;">
        Message
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
        <tr>
          <td width="3" bgcolor="#6366f1"
              style="background:#6366f1;border-radius:3px 0 0 3px;width:3px;">&nbsp;</td>
          <td bgcolor="#0f1424"
              style="background:#0f1424;padding:18px 22px;border-radius:0 10px 10px 0;">
            <p style="margin:0;font-size:14px;line-height:1.8;color:#a4a9bd;font-family:system-ui,-apple-system,sans-serif;">${m}</p>
          </td>
        </tr>
      </table>

      <!-- Reply CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td bgcolor="#6366f1" style="background:#6366f1;border-radius:10px;">
            <a href="mailto:${e}?subject=Re%3A%20Your%20inquiry%20to%20SerenEdge"
               style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;font-family:system-ui,-apple-system,sans-serif;letter-spacing:-0.01em;">
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
      <p style="margin:0;font-size:12px;color:#2a2f42;font-family:'Courier New',monospace;">
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

/* ─────────────────────────────────────────────────────────────────────────────
   Route handler
   ───────────────────────────────────────────────────────────────────────────── */
export async function POST(request: Request) {
  /* Parse body */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  /* Validate */
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

  /* ── Email 1: Notification to Daham (always sent, critical) ── */
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

  /* ── Email 2: Confirmation to the sender (skipped in sandbox mode) ── */
  if (!IS_SANDBOX) {
    try {
      const { error } = await resend.emails.send({
        from:    FROM,
        to:      [e],
        subject: `We got your message, ${n} — SerenEdge`,
        html:    confirmationHtml(n, m),
      });
      if (error) {
        /* Non-fatal — notification already delivered */
        console.warn("[contact] Confirmation email failed (non-fatal):", error);
      }
    } catch (err) {
      console.warn("[contact] Confirmation email threw (non-fatal):", err);
    }
  }

  return NextResponse.json({ success: true });
}
