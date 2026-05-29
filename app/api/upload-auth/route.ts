import { getUploadAuthParams } from "@imagekit/next/server"
import {
  getImageKitPrivateKey,
  getImageKitPublicKey,
} from "@/lib/imagekit-env.server"
import {
  clientIpFromRequest,
  rateLimit,
} from "@/lib/rate-limit.server"

const UPLOAD_AUTH_LIMIT = 30
const UPLOAD_AUTH_WINDOW_MS = 60_000

export async function GET(request: Request) {
  const ip = clientIpFromRequest(request)
  const limited = rateLimit(`upload-auth:${ip}`, {
    limit: UPLOAD_AUTH_LIMIT,
    windowMs: UPLOAD_AUTH_WINDOW_MS,
  })

  if (!limited.ok) {
    return Response.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    )
  }

  try {
    const publicKey = getImageKitPublicKey()
    const privateKey = getImageKitPrivateKey()

    const auth = getUploadAuthParams({
      publicKey,
      privateKey,
      // Short-lived upload token (10 minutes)
      expire: Math.floor(Date.now() / 1000) + 600,
    })

    return Response.json({
      ...auth,
      publicKey,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload auth unavailable"
    console.error("[upload-auth]", message)
    return Response.json({ error: "Upload auth unavailable" }, { status: 503 })
  }
}
