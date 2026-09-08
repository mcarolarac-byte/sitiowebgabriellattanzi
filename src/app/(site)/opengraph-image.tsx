import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#FBF9F4",
          padding: "72px 80px",
          fontFamily: "Georgia, \'Times New Roman\', serif",
        }}
      >
        {/* Borde superior en brass */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#a67c34",
          }}
        />

        {/* Logo / iniciales */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "#14213d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FBF9F4",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "-0.5px",
            }}
          >
            GL
          </div>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              fontWeight: 400,
              color: "#3d4148",
              letterSpacing: "0.02em",
            }}
          >
            Gabriel Lattanzi
          </span>
        </div>

        {/* Titular principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontFamily: "Georgia, \'Times New Roman\', serif",
              fontSize: "64px",
              fontWeight: 700,
              color: "#14213d",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Acompañamiento y educación financiera
          </h1>
          <div
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#a67c34",
            }}
          />
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "22px",
              color: "#62666d",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: "700px",
            }}
          >
            Estratega financiero independiente · Barcelona, España
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "16px",
              color: "#a67c34",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            gabriellattanzi.com
          </span>
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "15px",
              color: "#62666d",
            }}
          >
            Planificación · Retiro · Inversión
          </span>
        </div>
      </div>
    ),
    size
  );
}
