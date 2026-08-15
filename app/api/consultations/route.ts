type ConsultationPayload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type RuntimeEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  CONSULTATION_HASH_SALT?: string;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function supabaseHeaders(serviceKey: string) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ error: "Formato de solicitud no válido." }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) {
      return Response.json({ error: "La solicitud es demasiado extensa." }, { status: 413 });
    }

    const body = (await request.json()) as ConsultationPayload;
    const name = clean(body.name, 120);
    const contact = clean(body.contact, 180);
    const message = clean(body.message, 3000);
    const website = clean(body.website, 200);
    const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

    // Los visitantes reales nunca completan este campo oculto.
    if (website) {
      return Response.json({ ok: true }, { status: 201 });
    }

    if (!startedAt || Date.now() - startedAt < 2_000) {
      return Response.json({ error: "Espera un momento y vuelve a intentarlo." }, { status: 429 });
    }

    if (name.length < 2 || contact.length < 5) {
      return Response.json({ error: "Revisa los datos obligatorios del formulario." }, { status: 400 });
    }

    const runtimeEnv = process.env as RuntimeEnv;
    const supabaseUrl = runtimeEnv.SUPABASE_URL?.replace(/\/$/, "");
    const serviceKey = runtimeEnv.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return Response.json(
        { error: "El canal de consultas está en configuración. Escríbeme por WhatsApp mientras tanto." },
        { status: 503 },
      );
    }

    const ipHash = await sha256(`${clientIp(request)}:${runtimeEnv.CONSULTATION_HASH_SALT || serviceKey}`);
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const rateUrl = new URL(`${supabaseUrl}/rest/v1/consultation_requests`);
    rateUrl.searchParams.set("select", "id");
    rateUrl.searchParams.set("ip_hash", `eq.${ipHash}`);
    rateUrl.searchParams.set("created_at", `gte.${since}`);
    rateUrl.searchParams.set("limit", "5");

    const recentResponse = await fetch(rateUrl, {
      headers: supabaseHeaders(serviceKey),
    });

    if (!recentResponse.ok) {
      throw new Error(`Supabase rate check failed (${recentResponse.status}).`);
    }

    const recent = (await recentResponse.json()) as Array<{ id: string }>;
    if (recent.length >= 5) {
      return Response.json(
        { error: "Recibimos varias solicitudes seguidas. Inténtalo nuevamente en unos minutos." },
        { status: 429 },
      );
    }

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/consultation_requests`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(serviceKey),
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        contact,
        intent: "Agendar una conversación",
        message: message || null,
        source: "timco-case-study",
        ip_hash: ipHash,
        user_agent: clean(request.headers.get("user-agent"), 500) || null,
      }),
    });

    if (!insertResponse.ok) {
      throw new Error(`Supabase insert failed (${insertResponse.status}).`);
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("consultation_submission_failed", error);
    return Response.json(
      { error: "No pudimos registrar la solicitud. Puedes escribirme directamente por WhatsApp." },
      { status: 500 },
    );
  }
}
