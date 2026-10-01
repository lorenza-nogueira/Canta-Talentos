import { useState, useEffect, useRef } from "react";
import logoMain from "@/imports/Prancheta_1_1-1.png";
import regulamentoPdf from "@/imports/CANTA_Talentos_Regulamento_-_ATUALIZAR_CRONOGRAMA.pdf";
import avatarIcon from "@/imports/Prancheta_2.png";
import videoSrc from "@/imports/Canta_Talentos_V1.1-1.mp4";
import videoVerticalSrc from "@/imports/Canta_Talentos_Vertical.mp4";
import vecBlueStar from "@/imports/Prancheta_2_c_pia.png";
import vecWhiteA from "@/imports/Prancheta_2_c_pia_2.png";
import vecWhiteB from "@/imports/Prancheta_2_c_pia_3.png";
import vecPinkFill from "@/imports/Prancheta_2_c_pia_4.png";
import vecPinkOutline from "@/imports/Prancheta_2_c_pia_5.png";

// ─── Brand Colors ────────────────────────────────────────────────
const PINK = "#ff3264";
const BLUE = "#0050fa";
const WHITE = "#FFFFFF";

// ─── Brand Star (sharp 5-pointed, flat filled) ──────────────────
function StarIcon({
  size = 40,
  color = WHITE,
  className = "",
  style = {},
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <polygon points="50,2 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" />
    </svg>
  );
}

// Small asterisk/cross star
function StarAsterisk({
  size = 28,
  color = WHITE,
  className = "",
  style = {},
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <polygon points="50,5 56,44 95,50 56,56 50,95 44,56 5,50 44,44" />
    </svg>
  );
}

// Paint brush stroke — organic SVG shape
function BrushStroke({
  color = BLUE,
  width = 120,
  rotate = -20,
  className = "",
  style = {},
}: {
  color?: string;
  width?: number;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const h = Math.round(width * 0.18);
  return (
    <svg
      width={width}
      height={h + 8}
      viewBox={`0 0 ${width} ${h + 8}`}
      className={`absolute pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, transformOrigin: "center", ...style }}
      aria-hidden="true"
    >
      <path
        d={`M4,${h * 0.6} C${width * 0.15},2 ${width * 0.35},${h * 0.3} ${width * 0.55},${h * 0.2} C${width * 0.75},${h * 0.1} ${width * 0.88},${h * 0.4} ${width - 4},${h * 0.5} C${width - 4},${h * 0.5} ${width * 0.9},${h + 4} ${width * 0.6},${h + 2} C${width * 0.4},${h} ${width * 0.2},${h + 5} 4,${h * 0.6} Z`}
        fill={color}
        opacity="0.95"
      />
    </svg>
  );
}

// ─── Background vector element ───────────────────────────────────
function BgVec({
  src,
  alt = "",
  size = 120,
  top, left, right, bottom,
  rotate = 0,
  opacity = 0.12,
  className = "",
}: {
  src: string; alt?: string; size?: number;
  top?: string; left?: string; right?: string; bottom?: string;
  rotate?: number; opacity?: number; className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden="true"
      draggable={false}
      width={size}
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        height: "auto",
        top, left, right, bottom,
        transform: `rotate(${rotate}deg)`,
        opacity,
      }}
    />
  );
}

// Corner decoration cluster matching brand materials
function CornerDeco({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute pointer-events-none";
  if (corner === "tl") return (
    <div className={`${base} top-0 left-0 w-48 h-48 md:w-72 md:h-72`} aria-hidden="true">
      <StarIcon size={72} color={PINK} className="absolute top-6 left-2" style={{ "--rot": "-18deg", transform: "rotate(-18deg)" } as React.CSSProperties} />
      <StarIcon size={44} color={BLUE} className="absolute top-2 left-16" style={{ transform: "rotate(10deg)" }} />
      <BrushStroke color={BLUE} width={110} rotate={-28} className="top-16 -left-4" />
    </div>
  );
  if (corner === "tr") return (
    <div className={`${base} top-0 right-0 w-48 h-48 md:w-72 md:h-72`} aria-hidden="true">
      <StarIcon size={80} color="#111111" className="absolute top-2 right-2" style={{ transform: "rotate(12deg)" }} />
      <StarIcon size={38} color={BLUE} className="absolute top-14 right-12" style={{ transform: "rotate(-8deg)" }} />
      <BrushStroke color={PINK} width={90} rotate={20} className="top-10 right-0" />
    </div>
  );
  if (corner === "bl") return (
    <div className={`${base} bottom-0 left-0 w-48 h-48 md:w-72 md:h-72`} aria-hidden="true">
      <BrushStroke color={BLUE} width={130} rotate={-22} className="bottom-14 -left-6" />
      <BrushStroke color="#111111" width={100} rotate={-15} className="bottom-4 left-2" style={{ opacity: 0.7 }} />
    </div>
  );
  // br
  return (
    <div className={`${base} bottom-0 right-0 w-48 h-48 md:w-72 md:h-72`} aria-hidden="true">
      <StarIcon size={68} color={PINK} className="absolute bottom-6 right-4" style={{ transform: "rotate(20deg)" }} />
      <StarAsterisk size={22} color={WHITE} className="absolute bottom-20 right-20" />
      <BrushStroke color={BLUE} width={80} rotate={15} className="bottom-20 right-0" />
    </div>
  );
}

// ─── Logo ────────────────────────────────────────────────────────
function CantaLogo({ size = "md", w }: { size?: "sm" | "md" | "lg"; w?: number }) {
  const widths = { sm: 130, md: 190, lg: 300 };
  return (
    <img
      src={logoMain}
      alt="CANTA. Talentos"
      width={w ?? widths[size]}
      style={{ height: "auto", display: "block" }}
      draggable={false}
    />
  );
}

// ─── Header ──────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Regulamento", href: "#regulamento" },
    { label: "Premiação", href: "#premiacao" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: 0,
        marginTop: "60px",
        paddingTop: "env(safe-area-inset-top)",
        background: scrolled ? "rgba(15,15,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo — menor em telas pequenas */}
        <a href="#" aria-label="CANTA Talentos — início" className="shrink-0">
          <img
            src={logoMain}
            alt="CANTA. Talentos"
            style={{ width: "clamp(100px, 22vw, 150px)", height: "auto", display: "block" }}
            draggable={false}
          />
        </a>

        {/* Desktop nav — colapsa em lg (1024px) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs xl:text-sm font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#formulario"
            className="btn-primary hidden lg:inline-block"
            style={{ padding: "9px 20px", fontSize: "0.8rem" }}
          >
            Quero Participar
          </a>

          {/* Hamburger — visível abaixo de lg */}
          <button
            className="lg:hidden text-white p-2 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {menuOpen && (
        <div
          className="lg:hidden px-5 sm:px-8 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(12,12,12,0.99)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold uppercase tracking-wide text-white/70 hover:text-white transition-colors py-1"
              style={{ fontFamily: "var(--font-display)" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#formulario"
            className="btn-primary text-center mt-2"
            style={{ padding: "12px 24px", fontSize: "0.9rem" }}
            onClick={() => setMenuOpen(false)}
          >
            Quero Participar
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="sobre"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28"
      style={{ paddingTop: "10px" }}
      aria-label="Seção principal"
    >
      {/* Animated gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none animate-hero-glow"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 75% 60% at 20% 30%, ${PINK}28 0%, transparent 55%),
            radial-gradient(ellipse 70% 55% at 80% 70%, ${BLUE}28 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)
          `,
        }}
      />
      {/* Top & bottom edge fades */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #0f0f0f, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to top, #0f0f0f, transparent)" }} />

      {/* Floating brand vectors */}
      <BgVec src={vecBlueStar}    size={160} top="2%"    left="-2%"  rotate={-15} opacity={1} className="hidden md:block animate-float" />
      <BgVec src={vecPinkFill}    size={130} top="3%"    right="-2%" rotate={20}  opacity={1} className="hidden md:block animate-float-slow" />
      <BgVec src={vecPinkOutline} size={110} bottom="6%" left="-1%"  rotate={-8}  opacity={1} className="hidden md:block animate-float-med" />
      <BgVec src={vecWhiteA}      size={100} bottom="4%" right="-1%" rotate={12}  opacity={1} className="hidden md:block animate-float" />

      {/* Content */}
      <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">

        {/* Logo — fade-in scale */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-scale" style={{ animationDelay: "0s" }}>
          <img
            src={logoMain}
            alt="CANTA. Talentos"
            style={{
              width: "clamp(260px, 72vw, 560px)",
              height: "auto",
              display: "block",
              filter: `drop-shadow(0 0 60px ${PINK}70) drop-shadow(0 0 120px ${BLUE}40)`,
            }}
            draggable={false}
          />
        </div>

        {/* Headline */}
        <h1
          className="text-white mb-5 uppercase animate-fade-in-up"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 6.5vw, 5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            animationDelay: "0.15s",
          }}
        >
          Luz, câmera…{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${PINK}, #ff6b9d, ${PINK})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
            }}
          >
            CANTA Talentos!
          </span>{" "}
          <span className="text-[0.65em]" style={{ WebkitTextFillColor: "initial" }}>✨</span>
        </h1>

        {/* Sub-headline */}
        <div
          className="mb-8 mx-auto animate-fade-in-up space-y-2 text-left"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.92rem, 2vw, 1.08rem)",
            lineHeight: 1.8,
            maxWidth: "620px",
            animationDelay: "0.28s",
          }}
        >
          <p className="text-white font-bold">Porque existe muito mais talento por trás de cada cargo.</p>
          <p className="text-white/65">Somos designers. Editores. Redatores. Analistas. Gestores.</p>
          <p className="text-white/65">Mas também somos muito mais.</p>
          <p className="text-white/65">Somos músicos. Artistas. Atletas. Escritores. Criadores.</p>
          <p className="text-white/65">Somos pessoas com hobbies, paixões, projetos e talentos que vão muito além do que fazemos no trabalho.</p>
          <p className="text-white font-semibold">Porque ninguém é definido apenas pelo seu cargo.</p>
          <p className="text-white/65">O CANTA Talentos chegou para revelar e celebrar tudo aquilo que faz a nossa gente ser única. 💜</p>
          <p className="text-white/65">Pode ser aquele hobby que você ama, um projeto que criou, uma habilidade que desenvolveu ou algo que simplesmente faz seus olhos brilharem.</p>
          <p className="text-white/65">Mostre do seu jeito: em vídeo, foto, texto, áudio ou outro formato disponível na Landing Page. Pode ser sozinho, em dupla ou em grupo.</p>
        </div>

        {/* Spoiler callout */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl px-6 py-4 mb-10 animate-fade-in-up"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            fontFamily: "var(--font-body)",
            animationDelay: "0.42s",
            boxShadow: `0 0 32px ${PINK}18`,
          }}
        >
          🏆
          <span className="tag-pink">E tem mais:</span>
          <span className="text-white font-semibold">os 3 talentos mais votados serão premiados!</span>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
          <a
            href="#formulario"
            className="btn-primary animate-btn-pulse"
            style={{ fontSize: "1.05rem", padding: "18px 44px", display: "inline-block" }}
          >
            Colocar Meu Talento em Cena
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Video ────────────────────────────────────────────────────────
function VideoSection() {
  const videoRefH = useRef<HTMLVideoElement>(null); // horizontal — desktop
  const videoRefV = useRef<HTMLVideoElement>(null); // vertical — mobile
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    // controla o vídeo visível conforme breakpoint
    const isMobile = window.innerWidth < 768;
    const v = isMobile ? videoRefV.current : videoRefH.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const PlayOverlay = () => (
    <div
      className="absolute inset-0 flex items-center justify-center cursor-pointer"
      onClick={toggle}
      role="button"
      aria-label="Reproduzir vídeo"
      style={{ background: "rgba(0,0,0,0.35)" }}
    >
      <div
        className="flex items-center justify-center w-20 h-20 rounded-full transition-transform duration-200 hover:scale-110"
        style={{ background: PINK, boxShadow: `0 0 48px ${PINK}66` }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );

  const LogoMask = () => (
    <div
      className="absolute bottom-4 left-4 pointer-events-none"
      style={{
        background: "rgba(15,15,15,0.72)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "10px 16px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      aria-hidden="true"
    >
      <img src={logoMain} alt="" width={100} style={{ height: "auto", display: "block", opacity: 0.95 }} draggable={false} />
    </div>
  );

  return (
    <section id="video" className="py-20 px-6 md:px-12 relative overflow-hidden" aria-label="Vídeo de convite">
      {/* Blue gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, ${BLUE}30 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 0% 50%,  ${BLUE}18 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 100% 50%,${BLUE}18 0%, transparent 55%),
            #0f0f0f
          `,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #0f0f0f, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to top, #0f0f0f, transparent)" }} />
      <BgVec src={vecWhiteB}      size={110} top="-1%"   left="-2%"  rotate={20}  opacity={1} className="hidden md:block" />
      <BgVec src={vecPinkOutline} size={120} bottom="-1%" right="-2%" rotate={-15} opacity={1} className="hidden md:block" />

      <div className="max-w-[900px] mx-auto relative z-10">
        <div className="mb-10">
          <h2
            className="section-title-bar text-white uppercase"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}
          >
            Assista ao{" "}
            <span style={{ color: BLUE }}>vídeo oficial</span>
          </h2>
        </div>

        {/* Glow halo */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: `0 0 80px 20px ${PINK}22, 0 0 40px 8px ${BLUE}18`, zIndex: 0 }}
            aria-hidden="true"
          />

          {/* ── Vertical video — mobile only ── */}
          <div
            className="relative rounded-2xl overflow-hidden md:hidden"
            style={{ background: "#000", border: "1px solid rgba(255,255,255,0.08)", zIndex: 1, maxWidth: 400, margin: "0 auto" }}
          >
            <video
              ref={videoRefV}
              src={videoVerticalSrc}
              className="w-full block"
              style={{ display: "block" }}
              onEnded={() => setPlaying(false)}
              onClick={toggle}
              playsInline
              aria-label="Vídeo de convite CANTA Talentos"
            />
            {!playing && <PlayOverlay />}
            {!playing && <LogoMask />}
          </div>

          {/* ── Horizontal video — tablet/desktop ── */}
          <div
            className="relative w-full rounded-2xl overflow-hidden hidden md:block"
            style={{ background: "#000", border: "1px solid rgba(255,255,255,0.08)", zIndex: 1 }}
          >
            <video
              ref={videoRefH}
              src={videoSrc}
              className="w-full block"
              style={{ display: "block" }}
              onEnded={() => setPlaying(false)}
              onClick={toggle}
              playsInline
              aria-label="Vídeo de convite CANTA Talentos"
            />
            {!playing && <PlayOverlay />}
            {!playing && <LogoMask />}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Como Funciona ────────────────────────────────────────────────
function HowItWorks() {
  type Step = { emoji: string; num: string; title: string; period: string; desc: string; detail: string; accent: string };
  const [activeStep, setActiveStep] = useState<Step | null>(null);
  const steps: Step[] = [
    {
      emoji: "🔎",
      num: "01",
      title: "MOSTRE",
      period: "20/08 → 23/09/2026",
      desc: "Tire seu talento dos bastidores. Envie seu projeto pela Landing Page e compartilhe com a CANTA aquilo que você faz, cria ou ama.",
      detail: "1 projeto individual + participação ilimitada em projetos em dupla ou grupo.",
      accent: BLUE,
    },
    {
      emoji: "🗳️",
      num: "02",
      title: "VOTE",
      period: "24/09 → 08/10/2026",
      desc: "Agora, a cena é dos seus colegas. Conheça os talentos que estavam escondidos por aqui e vote em um ou mais projetos favoritos.",
      detail: "Só não vale votar no próprio projeto. 😉",
      accent: PINK,
    },
    {
      emoji: "🏆",
      num: "03",
      title: "CELEBRE",
      period: "08/10/2026",
      desc: "É hora de descobrir quem conquistou o público! No Dia do Bem-estar, vamos conhecer os 3 talentos mais votados, que serão premiados.",
      detail: "Prepare a torcida. O próximo destaque pode ser você! ✨",
      accent: WHITE,
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden"
      aria-label="Como funciona"
    >
      {/* Como Funciona vectors — canto sup-direito e inf-esquerdo, sem vetor no meio */}
      <BgVec src={vecBlueStar}    size={120} top="747px" left="0px" bottom="200px" right="787px" rotate={-12} opacity={1} className="hidden md:block" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="mb-12">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: PINK, fontFamily: "var(--font-display)" }}
          >
            Passo a passo
          </p>
          <h2
            className="section-title-bar text-white uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            🎬 A Jornada do Seu{" "}
            <span style={{ color: PINK }}>Talento</span>
          </h2>
          <p className="text-white/50 mt-3 text-base" style={{ fontFamily: "var(--font-body)" }}>
            Do primeiro clique ao grande momento. Seu talento passa por 3 momentos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="card-dark p-8 relative overflow-hidden cursor-pointer group"
              onClick={() => setActiveStep(step)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalhes da etapa ${step.num}: ${step.title}`}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveStep(step); }}
            >
              {/* Big background number */}
              <span
                className="absolute -top-3 -right-2 text-[7rem] font-black opacity-[0.04] leading-none select-none"
                style={{ fontFamily: "var(--font-logo)" }}
                aria-hidden="true"
              >
                {step.num}
              </span>

              {/* Accent top border */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: step.accent }}
                aria-hidden="true"
              />

              <div className="text-4xl mb-5" role="img" aria-label={step.title}>{step.emoji}</div>

              {/* Period badge */}
              <div
                className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                style={{
                  background: `${step.accent}18`,
                  color: step.accent === WHITE ? "rgba(255,255,255,0.7)" : step.accent,
                  border: `1px solid ${step.accent}30`,
                  fontFamily: "var(--font-body)",
                }}
              >
                {step.period}
              </div>

              <h3
                className="text-white text-2xl mb-3 uppercase"
                style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "0.02em" }}
              >
                {step.title}
              </h3>

              <p className="text-white/60 text-sm leading-relaxed mb-2" style={{ fontFamily: "var(--font-body)" }}>
                {step.desc}
              </p>
              <p className="text-white/40 text-xs leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
                {step.detail}
              </p>

              <span
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all"
                style={{ color: step.accent === "#FFFFFF" ? "rgba(255,255,255,0.5)" : step.accent, fontFamily: "var(--font-display)" }}
                aria-hidden="true"
              >
                Saiba mais
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>

      <ProcessModal step={activeStep} onClose={() => setActiveStep(null)} />
    </section>
  );
}

// ─── Process Modal ───────────────────────────────────────────────
function ProcessModal({
  step,
  onClose,
}: {
  step: { emoji: string; num: string; title: string; period: string; desc: string; detail: string; accent: string } | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!step) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [step, onClose]);

  if (!step) return null;

  const modalContent: Record<string, { heading: string; bullets: string[] }> = {
    "01": {
      heading: "Como inscrever seu talento",
      bullets: [
        "Acesse o formulário de inscrição nesta página.",
        "Preencha seus dados: nome, e-mail corporativo, área e equipe.",
        "Escolha uma categoria que melhor representa seu talento.",
        "Dê um nome criativo para o seu projeto.",
        "Faça o upload do material: foto, vídeo, áudio ou outro formato.",
        "Projetos individuais: 1 inscrição por e-mail. Duplas e grupos: sem limite.",
        "Prazo: até 23/09/2026.",
      ],
    },
    "02": {
      heading: "Como funciona a votação",
      bullets: [
        "Todos os colaboradores da CANTA poderão votar nos projetos inscritos.",
        "A votação acontece entre 24/09 e 08/10/2026.",
        "Você pode votar em mais de um projeto — mas não no seu próprio.",
        "Link de votação será divulgado pelos canais internos.",
        "Os 3 projetos com mais votos serão os premiados.",
      ],
    },
    "03": {
      heading: "A celebração dos talentos",
      bullets: [
        "Os resultados serão revelados no Dia do Bem-estar: 08/10/2026.",
        "Os 3 talentos mais votados receberão vouchers especiais.",
        "🥇 1º lugar: voucher R$ 500",
        "🥈 2º lugar: voucher R$ 300",
        "🥉 3º lugar: voucher R$ 200",
        "Todos os participantes serão reconhecidos pela coragem de mostrar seus talentos!",
      ],
    },
  };

  const content = modalContent[step.num] ?? { heading: step.title, bullets: [step.desc, step.detail] };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start md:items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes: ${step.title}`}
    >
      <div
        className="relative w-full max-w-[520px] rounded-2xl p-6 md:p-10 my-4 md:my-0"
        style={{ background: "#181818", border: "1.5px solid rgba(255,255,255,0.09)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoMain} alt="CANTA Talentos" width={140} style={{ height: "auto" }} draggable={false} />
        </div>

        {/* Step badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" role="img" aria-hidden="true">{step.emoji}</span>
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: step.accent === "#FFFFFF" ? "rgba(255,255,255,0.5)" : step.accent, fontFamily: "var(--font-display)" }}
            >
              Etapa {step.num}
            </div>
            <h3
              className="text-white uppercase"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.4rem", letterSpacing: "0.02em" }}
            >
              {step.title}
            </h3>
          </div>
        </div>

        {/* Period */}
        <div
          className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6"
          style={{
            background: `${step.accent}18`,
            color: step.accent === "#FFFFFF" ? "rgba(255,255,255,0.7)" : step.accent,
            border: `1px solid ${step.accent}30`,
            fontFamily: "var(--font-body)",
          }}
        >
          {step.period}
        </div>

        <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-display)" }}>
          {content.heading}
        </p>

        <ul className="space-y-2">
          {content.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>
              <span style={{ color: step.accent === "#FFFFFF" ? "rgba(255,255,255,0.4)" : step.accent, flexShrink: 0 }}>›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-end">
          <button onClick={onClose} className="btn-primary" style={{ padding: "10px 28px", fontSize: "0.85rem" }}>
            Entendi!
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────
function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    talentName: "",
    category: "",
    description: "",
    participation: "individual",
    authorized: false,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [externalLink, setExternalLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const categories = [
    "Arte, pintura e desenho",
    "Música e composição",
    "Fotografia",
    "Vídeos e audiovisual",
    "Escrita e poesia",
    "Dança",
    "Artesanato",
    "Culinária e gastronomia",
    "Games",
    "Tecnologia e projetos digitais",
    "Jardinagem",
    "Esportes",
    "Teatro e performance",
    "Viagens",
    "Outros",
  ];

  const INSCRICOES_URL = import.meta.env.VITE_INSCRICOES_URL as string | undefined;
  const MAX_TOTAL_MB = 30;

  const toBase64 = (file: File) =>
    new Promise<{ name: string; type: string; data: string }>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve({ name: file.name, type: file.type || "application/octet-stream", data: String(r.result).split(",")[1] });
      r.onerror = () => reject(r.error);
      r.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!INSCRICOES_URL) {
      setEmailError("O envio de inscrições ainda não foi configurado. Avise a organização.");
      return;
    }

    const files = [photoFile, videoFile, audioFile].filter((f): f is File => !!f);
    const totalMb = files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024;
    if (totalMb > MAX_TOTAL_MB) {
      setEmailError(`Os anexos somam ${totalMb.toFixed(1)} MB. O limite é ${MAX_TOTAL_MB} MB — para arquivos maiores, use o campo "Link externo" (YouTube, Drive, etc.).`);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        email: formData.email.toLowerCase().trim(),
        externalLink,
        photo: photoFile ? await toBase64(photoFile) : null,
        video: videoFile ? await toBase64(videoFile) : null,
        audio: audioFile ? await toBase64(audioFile) : null,
      };
      // text/plain evita o bloqueio de CORS do Google Apps Script
      const res = await fetch(INSCRICOES_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!result.ok) {
        setEmailError(result.error || "Não foi possível enviar sua inscrição. Tente novamente.");
        return;
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", area: "", talentName: "", category: "", description: "", participation: "individual", authorized: false });
      setPhotoFile(null); setVideoFile(null); setAudioFile(null); setExternalLink("");
    } catch (err) {
      console.error(err);
      setEmailError("Falha de conexão ao enviar. Verifique sua internet e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => setSubmitted(false);

  // ── Confirmation modal ──────────────────────────────────────────
  const modal = submitted ? (
    <div
      className="fixed inset-0 z-[200] flex items-start md:items-center justify-center px-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Inscrição confirmada"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="relative w-full max-w-[480px] rounded-2xl overflow-hidden text-center my-4 md:my-0"
        style={{
          background: "#111",
          border: `1.5px solid rgba(255,255,255,0.1)`,
          boxShadow: `0 0 80px ${PINK}33`,
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${PINK}, ${BLUE})` }} />

        {/* Close button */}
        <button
          onClick={closeModal}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
          style={{ lineHeight: 1, fontSize: "1.4rem" }}
        >
          ✕
        </button>

        <div className="px-8 pt-10 pb-10">
          {/* Badge image */}
          <img
            src={logoMain}
            alt="TALENTOS"
            width={260}
            className="mx-auto mb-6"
            style={{ height: "auto" }}
            draggable={false}
          />

          <h2
            className="text-white uppercase mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.6rem, 5vw, 2rem)", lineHeight: 1.1 }}
          >
            Seu talento entrou em cena!
          </h2>

          <p className="mb-2" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.65)", fontSize: "0.97rem", lineHeight: 1.65 }}>
            Obrigado por participar do CANTA Talentos. A sua inscrição foi recebida com sucesso. 🎉
          </p>
          <p className="mb-8" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.6 }}>
            Fique de olho nas próximas etapas — a votação começa em 24/09. Boa sorte! ✨
          </p>

          <button className="btn-primary w-full" style={{ fontSize: "0.95rem" }} onClick={closeModal}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {modal}
      <section
        id="formulario"
        className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden"
      aria-label="Formulário de participação"
    >
      {/* Form vectors — apenas nos cantos sup/inf opostos */}
      <BgVec src={vecPinkFill}    size={120} top="-1%"    right="-2%" rotate={18}  opacity={1} className="hidden md:block" />
      <BgVec src={vecBlueStar}    size={110} top="1365px" right="797px" bottom="100px" left="-18px" rotate={-12} opacity={1} className="hidden md:block" />

      <div className="max-w-[760px] mx-auto relative z-10">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: PINK, fontFamily: "var(--font-display)" }}>
            Participe agora
          </p>
          <h2
            className="section-title-bar text-white uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Coloque Seu Talento{" "}
            <span style={{ color: BLUE }}>em Cena</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="card-dark p-8 md:p-10 space-y-6"
          aria-label="Formulário de envio de talento"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="form-label">Nome completo *</label>
              <input id="name" type="text" className="form-input" placeholder="Seu nome" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required autoComplete="name" />
            </div>
            <div>
              <label htmlFor="email" className="form-label">Seu e-mail da CANTA *</label>
              <input id="email" type="email" className="form-input" placeholder="voce@canta.ag" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} required autoComplete="email" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="area" className="form-label">Área / Equipe *</label>
              <input id="area" type="text" className="form-input" placeholder="Ex.: Redação Smiles, Criação PETRONAS…" value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="talentName" className="form-label">Nome do talento ou projeto *</label>
              <input id="talentName" type="text" className="form-input" placeholder="Dê um nome ao seu talento" value={formData.talentName}
                onChange={(e) => setFormData({ ...formData, talentName: e.target.value })} required />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="form-label">Categoria *</label>
            <select id="category" className="form-input" value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })} required style={{ cursor: "pointer" }}>
              <option value="" disabled>Selecione uma categoria</option>
              {categories.map((c) => (
                <option key={c} value={c} style={{ background: "#1a1a1a", color: "#fff" }}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="form-label">Descrição do talento *</label>
            <textarea id="description" className="form-input resize-none" rows={4}
              placeholder="Conte mais sobre seu talento, projeto ou hobby. O que você faz? Como surgiu? O que te move?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          </div>

          <div>
            <p className="form-label mb-3">Anexos</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "📸 Foto", icon: "📸", accept: "image/*", file: photoFile, setFile: setPhotoFile, id: "photo-upload" },
                { label: "🎬 Vídeo", icon: "🎬", accept: "video/*", file: videoFile, setFile: setVideoFile, id: "video-upload" },
                { label: "🎵 Áudio", icon: "🎵", accept: "audio/*", file: audioFile, setFile: setAudioFile, id: "audio-upload" },
              ].map(({ icon, accept, file, setFile, id, label }) => (
                <label key={id} htmlFor={id} className="upload-zone block cursor-pointer">
                  <input id={id} type="file" accept={accept}
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)} aria-label={`Enviar ${label}`} />
                  <div className="relative pointer-events-none">
                    <p className="text-2xl mb-1">{icon}</p>
                    <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-body)" }}>
                      {file ? file.name.slice(0, 18) + "…" : label.split(" ").slice(1).join(" ")}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="externalLink" className="form-label">Link externo (opcional)</label>
            <input id="externalLink" type="url" className="form-input"
              placeholder="YouTube, SoundCloud, Instagram, portfólio…"
              value={externalLink} onChange={(e) => setExternalLink(e.target.value)} />
          </div>

          <div>
            <p className="form-label mb-3">Tipo de participação *</p>
            <div className="flex flex-wrap gap-3" role="radiogroup">
              {["individual", "dupla", "grupo"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer px-5 py-3 rounded-xl transition-all duration-200"
                  style={{
                    background: formData.participation === type ? `${BLUE}18` : "#1a1a1a",
                    border: `1.5px solid ${formData.participation === type ? BLUE : "rgba(255,255,255,0.08)"}`,
                    color: formData.participation === type ? BLUE : "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  <input type="radio" name="participation" value={type}
                    checked={formData.participation === type}
                    onChange={() => setFormData({ ...formData, participation: type })}
                    className="sr-only" />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>

            {formData.participation === "individual" && (
              <div
                className="mt-3 flex items-start gap-2 rounded-lg px-4 py-3"
                style={{ background: `${BLUE}14`, border: `1px solid ${BLUE}40` }}
                role="note"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="8" cy="8" r="7.5" stroke={BLUE} />
                  <rect x="7.25" y="7" width="1.5" height="5" rx="0.75" fill={BLUE} />
                  <circle cx="8" cy="4.5" r="0.875" fill={BLUE} />
                </svg>
                <p
                  suppressHydrationWarning
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: "<b style='color:#fff'>Participação individual:</b> cada pessoa pode inscrever apenas <b style='color:#fff'>um único projeto individual</b>. Você pode participar de quantos projetos em dupla ou grupo quiser." }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={formData.authorized}
                onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                className="mt-1 w-4 h-4" style={{ accentColor: BLUE }} required aria-required="true" />
              <span className="text-sm text-white/55 group-hover:text-white/75 transition-colors leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}>
                Confirmo que autorizo a divulgação do meu conteúdo para fins da campanha.
              </span>
            </label>
          </div>

          {emailError && (
            <div
              className="flex items-start gap-3 rounded-xl px-5 py-4"
              style={{ background: `${PINK}18`, border: `1.5px solid ${PINK}55` }}
              role="alert"
            >
              <span style={{ color: PINK, fontSize: "1.1rem", lineHeight: 1.3 }}>⚠</span>
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                {emailError}
              </p>
            </div>
          )}

          <div className="pt-2">
            <button type="submit" className="btn-primary w-full text-center py-4 text-base" disabled={submitting}
              style={{ fontSize: "1rem" }} aria-label="Enviar talento">
              {submitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando seu talento…
                </span>
              ) : "Enviar Meu Talento 🎤"}
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
}

// ─── Premiação ────────────────────────────────────────────────────
function Premio() {
  const places = [
    { medal: "🥇", pos: "1º Lugar", voucher: "R$ 500", accentColor: "#FFD700", borderColor: "rgba(255,215,0,0.35)", bg: "rgba(255,215,0,0.07)" },
    { medal: "🥈", pos: "2º Lugar", voucher: "R$ 300", accentColor: "#C0C0C0", borderColor: "rgba(192,192,192,0.3)", bg: "rgba(192,192,192,0.06)" },
    { medal: "🥉", pos: "3º Lugar", voucher: "R$ 200", accentColor: "#CD7F32", borderColor: "rgba(205,127,50,0.3)", bg: "rgba(205,127,50,0.06)" },
  ];

  return (
    <section
      id="premiacao"
      className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden"
      aria-label="Premiação"
    >
      {/* Premio vectors — cantos diagonais opostos */}
      <BgVec src={vecWhiteB}   size={150} top="150px" right="757px" bottom="608px" left="-18px" rotate={-20} opacity={1} className="hidden md:block" />
      <BgVec src={vecPinkFill} size={140} bottom="-3%" right="-2%" rotate={15}  opacity={1} className="hidden md:block" />

      {/* Background gradient — chamativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 75% 60% at 20% 40%,  ${PINK}40   0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 80% 55%,  ${BLUE}38   0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 50% 10%,  rgba(255,255,255,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 80% 40% at 50% 100%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
        }}
      />
      {/* Top & bottom edge fades */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #0f0f0f, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to top, #0f0f0f, transparent)" }} />

      <div className="max-w-[900px] mx-auto relative z-10 text-center">

        {/* Eyebrow */}
        <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: PINK, fontFamily: "var(--font-display)" }}>
          Premiação
        </p>

        <h2
          className="text-white uppercase mb-4"
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          Seus hobbies{" "}
          <span style={{ color: PINK }}>valem prêmio!</span>
        </h2>

        <p className="text-white/55 mb-12 text-base" style={{ fontFamily: "var(--font-body)", maxWidth: 520, margin: "0 auto 3rem" }}>
          Os 3 talentos mais votados ganham um vale voucher para aproveitar como quiser. 🎫
        </p>

        {/* Prize cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {places.map(({ medal, pos, voucher, accentColor, borderColor, bg }) => (
            <div
              key={pos}
              className="relative rounded-2xl p-8 flex flex-col items-center gap-3"
              style={{ background: bg, border: `1.5px solid ${borderColor}` }}
            >
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: accentColor }} aria-hidden="true" />

              <span className="text-5xl" role="img" aria-label={pos}>{medal}</span>

              <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: accentColor }}>
                {pos}
              </p>

              <p
                className="font-black uppercase"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 2.8rem)", color: accentColor, letterSpacing: "-0.01em", lineHeight: 1 }}
              >
                {voucher}
              </p>

              <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-body)" }}>
                vale voucher
              </p>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <p className="mt-10 text-white/40 text-sm" style={{ fontFamily: "var(--font-body)" }}>
          Resultado anunciado no Dia do Bem-estar — <strong className="text-white/60">08/10</strong>
        </p>
      </div>
    </section>
  );
}

// ─── CTA Final ────────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section
      className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden"
      aria-label="Chamada final"
    >
      {/* Full-bleed colored strip */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(232,0,61,0.07) 0%, rgba(0,71,255,0.07) 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${PINK}55, ${BLUE}55, transparent)` }}
        aria-hidden="true"
      />


      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <h2
          className="text-white mb-8 uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          A câmera está pronta.{" "}
          <br className="hidden md:block" />
          Agora, é só colocar seu talento em cena!{" "}
          <span className="text-[0.8em]">🎬✨</span>
        </h2>

        <a href="#formulario" className="btn-primary" style={{ fontSize: "1.1rem", padding: "18px 44px" }}>
          Colocar Meu Talento em Cena
        </a>
      </div>
    </section>
  );
}

// ─── Regulamento ─────────────────────────────────────────────────
function Regulamento() {
  return (
    <section
      id="regulamento"
      className="py-16 md:py-20 px-6 md:px-12 relative overflow-hidden"
      aria-label="Regulamento"
    >
      {/* Gradient mask — full-bleed, behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 10% 50%, ${BLUE}22 0%, transparent 70%),
            radial-gradient(ellipse 60% 70% at 90% 50%, ${PINK}18 0%, transparent 65%)
          `,
        }}
      />
      {/* Top edge fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #0f0f0f, transparent)" }}
      />
      {/* Bottom edge fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #0f0f0f, transparent)" }}
      />

      <div className="max-w-[760px] mx-auto relative z-10">
        <div
          className="flex flex-col md:flex-row items-center gap-6 rounded-2xl p-6 md:p-10"
          style={{
            background: "rgba(24,24,24,0.85)",
            backdropFilter: "blur(12px)",
            border: `1.5px solid rgba(255,255,255,0.09)`,
            boxShadow: `0 0 60px ${BLUE}18, 0 0 30px ${PINK}10`,
          }}
        >
          {/* Icon */}
          <div
            className="shrink-0 flex items-center justify-center rounded-2xl w-20 h-20"
            style={{ background: `${BLUE}18`, border: `1.5px solid ${BLUE}40` }}
            aria-hidden="true"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BLUE, fontFamily: "var(--font-display)" }}>
              Documento oficial
            </p>
            <h2
              className="text-white uppercase mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "-0.01em" }}
            >
              Regulamento do CANTA Talentos
            </h2>
            <p className="text-white/45 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Leia as regras completas de participação, votação e premiação antes de se inscrever.
            </p>
          </div>

          {/* Download button */}
          <a
            href={regulamentoPdf}
            download="Regulamento_CANTA_Talentos.pdf"
            className="shrink-0 btn-blue"
            style={{ fontSize: "0.88rem", padding: "12px 24px", whiteSpace: "nowrap" }}
            aria-label="Baixar regulamento em PDF"
          >
            Baixar PDF
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────
const faqItems = [
  { q: "O que é o Canta Talentos?", a: "O Canta Talentos é um projeto interno para descobrir e compartilhar talentos, hobbies, habilidades e projetos dos colaboradores da agência. É uma oportunidade para mostrar aquilo que você gosta de fazer além da rotina de trabalho." },
  { q: "Preciso fazer uma apresentação ao vivo?", a: "Não! Não haverá apresentações ao vivo. Você deverá cadastrar seu talento pela Landing Page e enviar um material que represente seu projeto, como vídeo, foto, texto, áudio ou outro formato disponível." },
  { q: "Quando posso enviar meu talento?", a: "As submissões começam no dia 📅 20 de agosto e terminam no dia 📅 23 de setembro." },
  { q: "Quantos talentos posso enviar?", a: "Você pode enviar 1 projeto individual e participar de quantos projetos em dupla ou grupo quiser." },
  { q: "Posso participar de vários projetos coletivos?", a: "Sim! Não existe limite para a quantidade de projetos em dupla ou grupo dos quais você pode participar." },
  { q: "Posso enviar um projeto individual e também participar de projetos em grupo?", a: "Sim! O limite de 1 submissão é válido apenas para projetos individuais. Você pode enviar seu próprio projeto e participar de quantos projetos coletivos desejar." },
  { q: "Preciso ser profissional no que faço?", a: "De jeito nenhum! O Canta Talentos não é sobre ser profissional ou especialista. Queremos conhecer aquele talento que você desenvolveu por paixão, curiosidade ou diversão." },
  { q: "Posso inscrever um hobby?", a: "Claro! Fotografia, culinária, dança, games, desenho, esportes, artesanato, música, viagens e muitos outros hobbies podem fazer parte do Canta Talentos." },
  { q: "Meu talento não está na lista. Posso participar?", a: "Sim! A lista de exemplos não é limitada. Se você tem uma habilidade, hobby ou projeto que gostaria de compartilhar, esse espaço também é seu." },
  { q: "Preciso aparecer no material enviado?", a: "Não. Você pode aparecer, narrar, demonstrar seu talento ou simplesmente apresentar o resultado do seu projeto." },
  { q: "Posso participar com colegas?", a: "Sim! Você pode criar um projeto em dupla ou grupo com outros colaboradores. Não há limite específico de integrantes, desde que todos sejam colaboradores da agência." },
  { q: "Quando começa a votação?", a: "A votação começa no dia 🗳️ 24 de setembro e ficará aberta até 💜 08 de outubro, Dia do Bem-estar." },
  { q: "Quem será o vencedor?", a: "Serão premiados os 3 talentos mais votados durante o período oficial de votação. O resultado será anunciado no Dia do Bem-estar — 08 de outubro." },
  { q: "Posso votar no meu próprio projeto?", a: "Não vale votar em si mesmo! 😉 Cada colaborador poderá votar em outros projetos, mas não no próprio." },
  { q: "Posso votar mais de uma vez?", a: "Sim! Você poderá votar em um ou mais projetos e escolher os talentos que mais gostou. Só não vale votar no próprio projeto. 💜" },
  { q: "O que acontece se houver empate?", a: "Em caso de empate, será aplicado o critério de desempate definido pela organização e comunicado aos participantes." },
  { q: "Os projetos serão divulgados?", a: "Sim. Os talentos poderão ser disponibilizados na Landing Page e divulgados nos canais internos da agência, respeitando as autorizações necessárias." },
  { q: "Posso enviar um projeto que já existe?", a: "Sim! Seu projeto não precisa ter sido criado especialmente para o Canta Talentos. Pode ser algo que você já desenvolve há anos ou algo que começou recentemente." },
  { q: "Posso desistir depois de enviar meu projeto?", a: "Sim. Caso queira retirar sua participação, entre em contato com a organização para verificar a possibilidade de remoção do conteúdo." },
  { q: "E se eu tiver vergonha de participar?", a: "Esse é um ótimo motivo para participar! 😄 Você não precisa ser profissional ou ter um talento extraordinário. O objetivo é descobrir um lado dos nossos colegas que normalmente não aparece no dia a dia." },
  { q: "Qual é a principal regra?", a: "Não deixe seu talento escondido! 💜 Escolha algo que você ama fazer, prepare seu material e compartilhe com a gente. 20/08: começa a descoberta. 24/09: começa a votação. 08/10: celebramos os talentos!" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="text-white font-bold text-base leading-snug"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
        >
          {q}
        </span>
        <span
          className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300"
          style={{
            background: open ? PINK : "rgba(255,255,255,0.07)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            color: open ? "#fff" : "rgba(255,255,255,0.5)",
            fontSize: "1.2rem",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.6)" }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden"
      aria-label="Perguntas frequentes"
    >
      {/* FAQ vectors — cantos opostos */}
      <BgVec src={vecPinkOutline} size={130} top="-2%"    right="-2%" rotate={10}  opacity={1} className="hidden md:block" />
      <BgVec src={vecBlueStar}    size={110} bottom="-2%" left="-2%"  rotate={-18} opacity={1} className="hidden md:block" />

      <div className="max-w-[760px] mx-auto relative z-10">
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: PINK, fontFamily: "var(--font-display)" }}>
            Dúvidas?
          </p>
          <h2
            className="section-title-bar text-white uppercase"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}
          >
            Perguntas <span style={{ color: BLUE }}>frequentes</span>
          </h2>
        </div>

        <div>
          {faqItems.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-10 px-6 md:px-12 relative"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      aria-label="Rodapé"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <CantaLogo size="sm" />

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center" aria-label="Links do rodapé">
          {[
            { label: "Como Funciona", href: "#como-funciona" },
            { label: "Regulamento", href: "#regulamento" },
            { label: "Premiação", href: "#premiacao" },
            { label: "FAQ", href: "#faq" },
          ].map((l) => (
            <a key={l.label} href={l.href}
              className="text-xs font-semibold uppercase tracking-wider text-white/35 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-display)" }}>
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-white/25 text-center" style={{ fontFamily: "var(--font-body)" }}>
          Revelando e celebrando as paixões da nossa gente.<br />
          © 2026 CANTA Talentos.
        </p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh" }}>
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <HowItWorks />
        <Regulamento />
        <FormSection />
        <Premio />
        <CTAFinal />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
