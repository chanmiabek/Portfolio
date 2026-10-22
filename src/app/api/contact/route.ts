import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const body = await request.json().catch(() => null);

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {

    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }
  if (parsed.data.website) 
    return NextResponse.json({ ok: true });


  // Replace this basic per-process guard with Redis/Upstash or your host's rate limiting in multi-instance production.


  const key = `myfolio-contact:${createHash("sha256").update(ip).digest("hex")}`;

  const globalForRateLimit = globalThis as typeof globalThis & { contactHits?: 
    Map<string, { 
    count: number; 
    reset: number }> 
  };

  globalForRateLimit.contactHits ??= new Map();

  const now = Date.now();

  const hit = globalForRateLimit.contactHits.get(key);

  if (hit && hit.reset > now && hit.count >= 5) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, 
      { 
        status: 429 
      });
  }

  globalForRateLimit.contactHits.set(key, hit && hit.reset > now ? { count: hit.count + 1, reset: hit.reset } : { count: 1, reset: now + 60 * 60 * 1000 });
  
  try {
    const message = await db.contactMessage.create({
      data: {
        name: parsed.data.name, 
        email: parsed.data.email, 
        subject: parsed.data.subject,
        message: parsed.data.message, 
        ipHash: createHash("sha256").update(ip).digest("hex"),
      },
      select: { 
        id: true 
      },
    });
    return NextResponse.json({ 
      ok: true, 
      id: message.id 
    }, { status: 201 });

  } catch {
    return NextResponse.json({ 
      error: "Messages are temporarily unavailable. Please try again later." 
    }, { 
      status: 503 
    });
  }
}
