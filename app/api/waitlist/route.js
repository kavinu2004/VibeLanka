import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (payload?.email || "").toString().trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error("waitlist: RESEND_API_KEY or RESEND_AUDIENCE_ID not configured");
    return Response.json(
      { error: "Waitlist isn't ready yet. Try again shortly." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    const alreadyExists = (error.message || "").toLowerCase().includes("already");
    if (alreadyExists) {
      return Response.json({ ok: true, alreadyOnList: true });
    }
    console.error("waitlist: resend error", error);
    return Response.json({ error: "Couldn't add you right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
