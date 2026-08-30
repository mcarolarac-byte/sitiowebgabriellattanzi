type HorizonProps = {
  className?: string;
};

// Elemento de firma del sitio: una línea de horizonte con un punto de guía,
// referencia visual a "planear el horizonte financiero" (retiro, largo plazo).
export function Horizon({ className }: HorizonProps) {
  return (
    <svg
      viewBox="0 0 640 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="90"
        x2="640"
        y2="90"
        stroke="var(--color-line)"
        strokeWidth="1"
      />
      <path
        d="M40 90C120 90 150 30 260 30C370 30 400 90 480 90"
        stroke="var(--color-brass)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="260" cy="30" r="4" fill="var(--color-brass)" />
      <circle cx="260" cy="30" r="9" stroke="var(--color-brass)" strokeOpacity="0.4" />
    </svg>
  );
}
