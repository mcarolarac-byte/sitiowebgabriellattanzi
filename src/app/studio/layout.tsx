export const metadata = {
  title: "Panel de contenido",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="h-screen">{children}</body>
    </html>
  );
}
