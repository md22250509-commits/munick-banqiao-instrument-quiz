import type { ReactNode } from "react";

type IllustrationProps = {
  className?: string;
};

function Frame({
  className,
  bg,
  children,
}: {
  className?: string;
  bg: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <rect width="320" height="200" rx="28" fill={bg} />
      {children}
    </svg>
  );
}

function Note({
  x,
  y,
  color,
  scale = 1,
}: {
  x: number | string;
  y: number | string;
  color: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="8" cy="22" rx="8" ry="6" fill={color} />
      <rect x="14" y="2" width="3.5" height="20" fill={color} />
    </g>
  );
}

function Kid({
  x,
  y,
  shirt,
  hair,
  scale = 1,
}: {
  x: number | string;
  y: number | string;
  shirt: string;
  hair: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="28" cy="86" rx="22" ry="8" fill="#00000018" />
      <circle cx="28" cy="28" r="16" fill="#F6D7B8" />
      <path
        d="M12 26c2-16 30-16 32 0 1 8-6 12-16 12s-17-4-16-12z"
        fill={hair}
      />
      <circle cx="22" cy="30" r="2.2" fill="#3C2F2A" />
      <circle cx="34" cy="30" r="2.2" fill="#3C2F2A" />
      <path
        d="M23 37c3 3 7 3 10 0"
        stroke="#C16A4D"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="14" y="46" width="28" height="26" rx="10" fill={shirt} />
      <rect x="10" y="50" width="8" height="16" rx="4" fill={shirt} />
      <rect x="38" y="50" width="8" height="16" rx="4" fill={shirt} />
      <rect x="18" y="70" width="8" height="16" rx="4" fill="#5B6EAA" />
      <rect x="30" y="70" width="8" height="16" rx="4" fill="#5B6EAA" />
    </g>
  );
}

export function HeroArt({ className }: IllustrationProps) {
  return (
    <Frame className={className} bg="#FFE7C7">
      <Note x="24" y="22" color="#E07A5F" scale={1.1} />
      <Note x="268" y="28" color="#2A9D8F" scale={0.9} />
      <Note x="248" y="128" color="#F4D35E" />
      <Kid x="128" y="46" shirt="#E07A5F" hair="#5A3828" scale={1.15} />
      <g transform="translate(28 108)">
        <ellipse cx="28" cy="18" rx="28" ry="12" fill="#D96C4F" />
        <rect x="26" y="-10" width="4" height="28" fill="#F4D35E" />
        <rect x="18" y="-16" width="20" height="8" rx="3" fill="#F4D35E" />
      </g>
      <g transform="translate(214 96)">
        <path d="M12 48 L60 40 L64 18 L16 28 Z" fill="#7A4E2D" />
        <circle cx="18" cy="44" r="10" fill="#F6D7B8" stroke="#3C2F2A" strokeWidth="2" />
        <circle cx="58" cy="24" r="7" fill="#F6D7B8" stroke="#3C2F2A" strokeWidth="2" />
      </g>
    </Frame>
  );
}

export function AgeArt({ className }: IllustrationProps) {
  return (
    <Frame className={className} bg="#FFE1D6">
      <Kid x="36" y="86" shirt="#7EB8D4" hair="#3C2F2A" scale={0.72} />
      <Kid x="118" y="62" shirt="#E07A5F" hair="#6B3F24" />
      <Kid x="206" y="40" shirt="#2A9D8F" hair="#3C2F2A" scale={1.2} />
      <Note x="250" y="18" color="#E07A5F" />
    </Frame>
  );
}

export function PersonalityArt({ className }: IllustrationProps) {
  return (
    <Frame className={className} bg="#EEDCFF">
      <circle cx="70" cy="88" r="46" fill="#FFF7" />
      <circle cx="250" cy="88" r="46" fill="#FFF7" />
      <Kid x="42" y="42" shirt="#C084FC" hair="#5A3828" />
      <Kid x="222" y="42" shirt="#60A5FA" hair="#3C2F2A" />
      <circle cx="86" cy="168" r="6" fill="#E07A5F" />
      <circle cx="234" cy="168" r="6" fill="#60A5FA" />
    </Frame>
  );
}

export function PlayArt({ className }: IllustrationProps) {
  return (
    <Frame className={className} bg="#D8F3E8">
      <g transform="translate(18 70)">
        <ellipse cx="36" cy="40" rx="36" ry="16" fill="#E07A5F" />
        <ellipse cx="36" cy="22" rx="22" ry="10" fill="#F4D35E" />
        <rect x="70" y="8" width="6" height="46" rx="3" fill="#7A4E2D" />
      </g>
      <g transform="translate(118 58)">
        <rect x="0" y="36" width="72" height="28" rx="6" fill="#F4E1C1" />
        <rect x="8" y="20" width="8" height="20" fill="#3C2F2A" />
        <rect x="22" y="12" width="8" height="28" fill="#3C2F2A" />
        <rect x="36" y="16" width="8" height="24" fill="#3C2F2A" />
        <rect x="50" y="8" width="8" height="32" fill="#3C2F2A" />
      </g>
      <g transform="translate(214 54)">
        <path d="M16 70 L70 56 L76 24 L22 38 Z" fill="#2A9D8F" />
        <circle cx="22" cy="64" r="12" fill="#F6D7B8" stroke="#3C2F2A" strokeWidth="2" />
        <circle cx="70" cy="32" r="8" fill="#F6D7B8" stroke="#3C2F2A" strokeWidth="2" />
      </g>
      <circle cx="160" cy="36" r="16" fill="#E07A5F" />
      <rect x="154" y="18" width="12" height="22" rx="6" fill="#FFF" />
    </Frame>
  );
}

export function ReactionArt({ className }: IllustrationProps) {
  return (
    <Frame className={className} bg="#FFF1B8">
      <Kid x="46" y="58" shirt="#E07A5F" hair="#5A3828" />
      <Kid x="186" y="50" shirt="#2A9D8F" hair="#3C2F2A" />
      <path
        d="M118 148c18-22 54-22 72 0"
        stroke="#E07A5F"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <Note x="132" y="28" color="#E07A5F" />
      <Note x="250" y="24" color="#2A9D8F" scale={0.85} />
    </Frame>
  );
}

export function MusicArt({ className }: IllustrationProps) {
  return (
    <Frame className={className} bg="#D9ECFF">
      <circle cx="96" cy="104" r="58" fill="#3C2F2A" />
      <circle cx="96" cy="104" r="22" fill="#F4D35E" />
      <circle cx="96" cy="104" r="8" fill="#3C2F2A" />
      <rect x="170" y="48" width="110" height="72" rx="18" fill="#FFF" />
      <rect x="184" y="64" width="82" height="10" rx="5" fill="#E07A5F" />
      <rect x="184" y="84" width="58" height="10" rx="5" fill="#2A9D8F" />
      <Note x="248" y="128" color="#7EB8D4" />
    </Frame>
  );
}

export function MotiveArt({ className }: IllustrationProps) {
  return (
    <Frame className={className} bg="#FFD9C8">
      <Kid x="48" y="54" shirt="#7EB8D4" hair="#6B3F24" />
      <Kid x="176" y="54" shirt="#E07A5F" hair="#3C2F2A" />
      <circle cx="92" cy="42" r="10" fill="#F4D35E" />
      <circle cx="220" cy="38" r="8" fill="#2A9D8F" />
      <path
        d="M40 168h240"
        stroke="#E07A5F55"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </Frame>
  );
}

export function InstrumentArt({
  id,
  className,
}: {
  id: "drums" | "guitar-acoustic" | "guitar-electric" | "bass" | "vocal" | "piano";
  className?: string;
}) {
  if (id === "drums") {
    return (
      <Frame className={className} bg="#FFE1D6">
        <ellipse cx="160" cy="128" rx="70" ry="28" fill="#E07A5F" />
        <ellipse cx="160" cy="118" rx="58" ry="20" fill="#F8E2C8" />
        <ellipse cx="92" cy="92" rx="28" ry="12" fill="#F4D35E" />
        <ellipse cx="228" cy="92" rx="28" ry="12" fill="#F4D35E" />
        <rect x="154" y="40" width="12" height="78" rx="6" fill="#7A4E2D" />
        <rect x="200" y="36" width="10" height="70" rx="5" fill="#7A4E2D" transform="rotate(18 205 71)" />
      </Frame>
    );
  }
  if (id === "guitar-electric") {
    return (
      <Frame className={className} bg="#E4D7FF">
        <path d="M86 142c18 22 58 22 70-8 8-20-2-38-24-48l8-54 18 4-8 48c26 2 48 22 44 52-6 38-72 52-108 6z" fill="#7C3AED" />
        <rect x="168" y="28" width="90" height="14" rx="7" fill="#3C2F2A" />
        <circle cx="118" cy="118" r="10" fill="#F4D35E" />
      </Frame>
    );
  }
  if (id === "guitar-acoustic") {
    return (
      <Frame className={className} bg="#F3E2C8">
        <ellipse cx="128" cy="118" rx="54" ry="44" fill="#B45309" />
        <ellipse cx="128" cy="118" rx="18" ry="16" fill="#F8E2C8" />
        <rect x="170" y="36" width="96" height="14" rx="7" fill="#7A4E2D" />
        <circle cx="128" cy="118" r="8" fill="#7A4E2D" />
      </Frame>
    );
  }
  if (id === "bass") {
    return (
      <Frame className={className} bg="#D8F3E8">
        <path d="M74 150c22 24 78 18 86-18 6-26-18-42-40-48l6-52 20 4-6 46c32 6 62 28 54 58-10 40-86 56-120 10z" fill="#0F766E" />
        <rect x="176" y="24" width="108" height="16" rx="8" fill="#3C2F2A" />
        <circle cx="112" cy="122" r="12" fill="#F4D35E" />
      </Frame>
    );
  }
  if (id === "vocal") {
    return (
      <Frame className={className} bg="#FDE68A">
        <Kid x="118" y="44" shirt="#E07A5F" hair="#5A3828" scale={1.1} />
        <rect x="196" y="86" width="16" height="44" rx="8" fill="#3C2F2A" />
        <ellipse cx="204" cy="78" rx="18" ry="22" fill="#E07A5F" />
        <Note x="52" y="36" color="#E07A5F" />
        <Note x="250" y="28" color="#2A9D8F" />
      </Frame>
    );
  }
  return (
    <Frame className={className} bg="#E8F0FF">
      <rect x="48" y="108" width="224" height="48" rx="8" fill="#F8E2C8" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect
          key={i}
          x={60 + i * 14}
          y={78}
          width="8"
          height={i % 2 === 0 ? 48 : 36}
          fill="#3C2F2A"
          rx="1"
        />
      ))}
      <rect x="48" y="126" width="224" height="8" fill="#E07A5F" />
    </Frame>
  );
}
