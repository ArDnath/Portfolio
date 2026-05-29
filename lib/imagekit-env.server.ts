import "server-only"

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

/** ImageKit private key — server only, never expose to the client bundle. */
export function getImageKitPrivateKey(): string {
  return requireEnv("IMAGEKIT_PRIVATE_KEY")
}

/** ImageKit public key — safe to return from upload-auth API responses. */
export function getImageKitPublicKey(): string {
  return requireEnv("IMAGEKIT_PUBLIC_KEY")
}
