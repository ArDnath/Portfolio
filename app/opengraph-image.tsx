import { ImageResponse } from "next/og"
import { IMAGEKIT_PATHS } from "@/lib/imagekit"
import { imagekitUrl } from "@/lib/imagekit-url.server"

export const alt = "Ariyaman Debnath – Portfolio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  const logoUrl = imagekitUrl(IMAGEKIT_PATHS.logo, {
    width: 280,
    height: 280,
    quality: 90,
    format: "png",
  })

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#000",
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 720,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#737373",
            }}
          >
            Portfolio
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontSize: 64,
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Ariyaman Debnath
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontSize: 26,
              color: "#a3a3a3",
              lineHeight: 1.5,
            }}
          >
            Full-stack engineer · AI-native builder
          </p>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              paddingTop: 28,
              borderTop: "2px dashed rgba(255,255,255,0.2)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "ui-monospace, monospace",
                fontSize: 20,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#525252",
              }}
            >
              ariyaman.in
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid rgba(255,255,255,0.25)",
            boxShadow: "12px 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt=""
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    { ...size },
  )
}
