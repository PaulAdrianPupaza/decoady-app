import { useId } from "react";

/**
 * Emblema de Decoady: anillo tricolor con la Torre del Reloj de Sighișoara.
 * Versión sin texto, pensada para tamaños pequeños (header, favicon).
 * La versión completa con "DECOADY · REFORMAS" está en /public/brand/decoady-emblema.svg.
 */
export const BRAND_RING = {
  ochre: "#D4A03C",
  blue: "#2E4A78",
  clay: "#B5572F",
} as const;

export default function LogoMark({ className, title }: { className?: string; title?: string }) {
  const clipId = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Anillo tricolor: ocre arriba, azul a la izquierda, arcilla a la derecha */}
      <g fill="none" strokeWidth="10">
        <circle cx="50" cy="50" r="45" stroke={BRAND_RING.ochre} strokeDasharray="91.2 191.6" transform="rotate(211.5 50 50)" />
        <circle cx="50" cy="50" r="45" stroke={BRAND_RING.clay} strokeDasharray="91.2 191.6" transform="rotate(-28.5 50 50)" />
        <circle cx="50" cy="50" r="45" stroke={BRAND_RING.blue} strokeDasharray="91.2 191.6" transform="rotate(91.5 50 50)" />
      </g>

      <circle cx="50" cy="50" r="38" fill="#fcfbf8" />

      <g clipPath={`url(#${clipId})`}>
        {/* Tejados del casco antiguo */}
        <path d="M14 90V66l12-11 12 11V90Z M64 90V61l7-9h22v38Z" fill="#cfc2ad" />
        {/* Torre del Reloj */}
        <g fill="#1a1814">
          <path d="M50 11.5 50.8 27h-1.6Z" />
          <ellipse cx="50" cy="29" rx="1.6" ry="2" />
          <ellipse cx="50" cy="34.5" rx="3" ry="3.6" />
          <rect x="46.4" y="37.6" width="7.2" height="1.6" rx=".5" />
          <path d="M50 38.5c3.6 4.4 6.2 10 8.8 16.5H41.2c2.6-6.5 5.2-12.1 8.8-16.5Z" />
          <path d="M39.8 40.5 41.2 55h-2.8Z M60.2 40.5 61.6 55h-2.8Z" />
          <rect x="36.5" y="54.5" width="27" height="2.4" rx=".6" />
          <rect x="38.5" y="56.9" width="23" height="5" />
          <rect x="40.5" y="61.9" width="19" height="30" />
        </g>
        <g fill="#fcfbf8">
          <rect x="41.5" y="58" width="2.4" height="2.9" rx="1.2" />
          <rect x="45.8" y="58" width="2.4" height="2.9" rx="1.2" />
          <rect x="51.8" y="58" width="2.4" height="2.9" rx="1.2" />
          <rect x="56.1" y="58" width="2.4" height="2.9" rx="1.2" />
          <circle cx="50" cy="69.5" r="4" />
          <rect x="45" y="78.5" width="2" height="4.5" rx=".4" />
          <rect x="53" y="78.5" width="2" height="4.5" rx=".4" />
        </g>
        <path d="M50 69.5V66.8M50 69.5l2 .9" stroke="#1a1814" strokeWidth=".9" strokeLinecap="round" />
      </g>
    </svg>
  );
}
