"use client";

import { useEffect, useState, type CSSProperties } from "react";

const COLORS = ["#2F58A1", "#66AE3B", "#F7B900", "#8B5CF6"] as const;
const ROLE_NAMES = ["Colaborador", "Pares", "Jefe directo", "Cliente"] as const;

const scenes = [
  "La medición asigna a cada líder los roles que corresponden.",
  "Cada persona conserva la configuración definida para su evaluación.",
  "El feedback sigue el flujo previsto hacia la persona evaluada.",
  "Las respuestas se consolidan por rol antes de llegar al dashboard.",
  "El resultado agregado se convierte en una lectura clara.",
] as const;

const positions: Record<number, Array<[number, number]>> = {
  1: [[0, -1]],
  2: [[-1, 0], [1, 0]],
  3: [[0, -1], [0.866, 0.5], [-0.866, 0.5]],
  4: [[0, -1], [1, 0], [0, 1], [-1, 0]],
};

function Avatar({ cx, cy, r = 64 }: { cx: number; cy: number; r?: number }) {
  const scale = r / 64;
  return (
    <g className="pluz-svg-avatar">
      <circle cx={cx} cy={cy} r={r} fill="url(#pluzAvatar)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fff" strokeWidth={2.5 * scale} opacity=".5" />
      <circle cx={cx} cy={cy - 14 * scale} r={11 * scale} fill="none" stroke="#fff" strokeWidth={3 * scale} />
      <path
        d={`M ${cx - 19 * scale} ${cy + 20 * scale} Q ${cx} ${cy + 3 * scale} ${cx + 19 * scale} ${cy + 20 * scale}`}
        fill="none"
        stroke="#fff"
        strokeWidth={3 * scale}
        strokeLinecap="round"
      />
    </g>
  );
}

function MiniDiagram({ count, cx, cy, delay = 0 }: { count: number; cx: number; cy: number; delay?: number }) {
  const radius = 105;
  const avatarRadius = 45;
  const nodeRadius = 21;
  return (
    <g className="pluz-mini" style={{ animationDelay: `${delay}ms` }}>
      <rect x={cx - 54} y={cy - 171} width="108" height="36" rx="18" fill="#2F58A1" />
      <text x={cx} y={cy - 147} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">
        {count} {count === 1 ? "ROL" : "ROLES"}
      </text>
      <Avatar cx={cx} cy={cy} r={avatarRadius} />
      {positions[count].map(([ux, uy], index) => {
        const x = cx + ux * radius;
        const y = cy + uy * radius;
        return (
          <g key={`${count}-${index}`} className="pluz-mini-node" style={{ animationDelay: `${delay + 180 + index * 110}ms` }}>
            <line
              x1={cx + ux * avatarRadius}
              y1={cy + uy * avatarRadius}
              x2={cx + ux * (radius - nodeRadius)}
              y2={cy + uy * (radius - nodeRadius)}
              stroke={COLORS[index]}
              strokeWidth="4"
              strokeLinecap="round"
              opacity=".65"
            />
            <circle cx={x} cy={y} r={nodeRadius} fill={COLORS[index]} />
          </g>
        );
      })}
    </g>
  );
}

type BadgeData = {
  x: number;
  y: number;
  color: string;
  name: string;
};

const badges: BadgeData[] = [
  { x: 400, y: 78, color: COLORS[0], name: ROLE_NAMES[0] },
  { x: 650, y: 270, color: COLORS[1], name: ROLE_NAMES[1] },
  { x: 400, y: 462, color: COLORS[2], name: ROLE_NAMES[2] },
  { x: 150, y: 270, color: COLORS[3], name: ROLE_NAMES[3] },
];

function RoleBadge({ badge }: { badge: BadgeData }) {
  return (
    <g>
      <ellipse cx={badge.x} cy={badge.y + 47} rx="42" ry="9" fill="#0f172a" opacity=".12" />
      <rect x={badge.x - 38} y={badge.y - 38} width="76" height="76" rx="20" fill={badge.color} />
      <circle cx={badge.x} cy={badge.y - 10} r="9" fill="none" stroke="#fff" strokeWidth="3" />
      <path d={`M ${badge.x - 14} ${badge.y + 16} Q ${badge.x} ${badge.y + 3} ${badge.x + 14} ${badge.y + 16}`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <text x={badge.x} y={badge.y < 150 ? badge.y - 52 : badge.y + 66} textAnchor="middle" fill="#334155" fontSize="16" fontWeight="750">
        {badge.name}
      </text>
    </g>
  );
}

function Connection({ badge, index, arrows = false }: { badge: BadgeData; index: number; arrows?: boolean }) {
  const dx = 400 - badge.x;
  const dy = 270 - badge.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const startX = badge.x + ux * 38;
  const startY = badge.y + uy * 38;
  const endX = 400 - ux * 64;
  const endY = 270 - uy * 64;
  return (
    <>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={badge.color}
        strokeWidth={arrows ? 3 : 2}
        strokeLinecap="round"
        opacity={arrows ? .52 : .28}
        markerEnd={arrows ? `url(#pluzArrow${index})` : undefined}
      />
      {arrows ? (
        <circle
          className="pluz-svg-pulse"
          cx={startX}
          cy={startY}
          r="7"
          fill={badge.color}
          style={{
            "--pluz-flow-x": `${endX - startX}px`,
            "--pluz-flow-y": `${endY - startY}px`,
            animationDelay: `${index * 230}ms`,
          } as CSSProperties}
        />
      ) : null}
    </>
  );
}

const satellites = [
  [[-76, -26], [-47, -67], [0, -82], [48, -66], [78, -25], [85, 27]],
  [[48, -61], [82, -22], [82, 27], [48, 63]],
  [[0, 76]],
  [[-79, -28], [-79, 32]],
] as const;

function ModelScene({ scene }: { scene: number }) {
  if (scene === 0 || scene === 1) {
    return (
      <g>
        <MiniDiagram count={scene === 0 ? 3 : 1} cx={235} cy={300} />
        <MiniDiagram count={scene === 0 ? 4 : 2} cx={575} cy={300} delay={380} />
      </g>
    );
  }

  if (scene === 2) {
    return (
      <g>
        {badges.map((badge, index) => <Connection key={badge.color} badge={badge} index={index} arrows />)}
        <Avatar cx={400} cy={270} />
        {badges.map((badge) => <RoleBadge key={badge.color} badge={badge} />)}
      </g>
    );
  }

  if (scene === 3) {
    return (
      <g>
        {badges.map((badge, index) => <Connection key={badge.color} badge={badge} index={index} />)}
        <Avatar cx={400} cy={270} />
        {badges.map((badge) => <RoleBadge key={badge.color} badge={badge} />)}
        {badges.flatMap((badge, roleIndex) => satellites[roleIndex].map(([dx, dy], index) => (
          <circle
            key={`${badge.color}-${index}`}
            className="pluz-svg-satellite"
            cx={badge.x}
            cy={badge.y}
            r="9"
            fill={badge.color}
            style={{
              "--pluz-satellite-x": `${dx}px`,
              "--pluz-satellite-y": `${dy}px`,
              animationDelay: `${index * 120 + roleIndex * 80}ms`,
            } as CSSProperties}
          />
        )))}
      </g>
    );
  }

  return (
    <g>
      <ellipse cx="400" cy="390" rx="90" ry="13" fill="#0f172a" opacity=".1" />
      <circle cx="400" cy="270" r="98" fill="none" stroke="#e2e8f0" strokeWidth="14" />
      <circle className="pluz-svg-ring" cx="400" cy="270" r="98" fill="none" stroke="#2F58A1" strokeWidth="14" strokeLinecap="round" transform="rotate(-90 400 270)" />
      <Avatar cx={400} cy={270} />
      <g className="pluz-svg-score">
        <path d="M392 116h16l-8 12z" fill="#fff" />
        <rect x="308" y="38" width="184" height="78" rx="16" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="400" y="67" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="750" letterSpacing="1.2">PROMEDIO</text>
        <text x="400" y="101" textAnchor="middle" fill="#2F58A1" fontSize="34" fontWeight="850">4.2</text>
      </g>
    </g>
  );
}

export default function PluzRolesAnimation() {
  const [scene, setScene] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    if (scene === scenes.length - 1) {
      const stop = window.setTimeout(() => setPlaying(false), 3800);
      return () => window.clearTimeout(stop);
    }
    const next = window.setTimeout(() => {
      setScene((current) => current + 1);
      setCycle((current) => current + 1);
    }, scene === 3 ? 4400 : 3400);
    return () => window.clearTimeout(next);
  }, [playing, scene]);

  const selectScene = (index: number) => {
    setScene(index);
    setCycle((current) => current + 1);
    setPlaying(false);
  };

  const replay = () => {
    setScene(0);
    setCycle((current) => current + 1);
    setPlaying(true);
  };

  return (
    <div className="pluz-model-demo">
      <div className="pluz-model-toolbar">
        <div>
          <span><i /> {playing ? "Secuencia en ejecución" : "Lista para iniciar"}</span>
          <strong>Dashboard / KPI&apos;s</strong>
        </div>
        <button type="button" onClick={replay}>▶ Iniciar animación</button>
      </div>
      <div className="pluz-model-canvas">
        <svg viewBox="0 0 800 560" role="img" aria-labelledby="pluz-model-title pluz-model-desc">
          <title id="pluz-model-title">Animación del modelo de evaluación 360</title>
          <desc id="pluz-model-desc">La animación explica las configuraciones de roles, el sentido del feedback, la combinación de respuestas y el promedio final.</desc>
          <defs>
            <linearGradient id="pluzAvatar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#64748b" /><stop offset="1" stopColor="#334155" /></linearGradient>
            {COLORS.map((color, index) => (
              <marker key={color} id={`pluzArrow${index}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0L10 5L0 10Z" fill={color} />
              </marker>
            ))}
          </defs>
          <g key={`${scene}-${cycle}`} className="pluz-svg-scene"><ModelScene scene={scene} /></g>
        </svg>
      </div>
      <div className="pluz-model-copy" aria-live="polite">
        <span>0{scene + 1} / 05</span>
        <p>{scenes[scene]}</p>
      </div>
      <div className="pluz-model-controls" aria-label="Escenas del modelo 360">
        {scenes.map((label, index) => (
          <button key={label} type="button" onClick={() => selectScene(index)} className={scene === index ? "is-active" : ""} aria-pressed={scene === index}>
            <span>0{index + 1}</span><small>{["Roles", "Variación", "Dirección", "Privacidad", "Promedio"][index]}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
