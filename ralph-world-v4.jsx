import { useState, useEffect } from "react";

const R = {
  red: "#FF3B3B",
  blue: "#3B7DFF",
  yellow: "#FFD23B",
  green: "#3BCC7E",
  pink: "#FF6BB5",
  purple: "#9B6BFF",
  orange: "#FF8A3B",
  cyan: "#3BD4FF",
  bg: "#F5F0EB",
  card: "rgba(255,255,255,0.55)",
  cardHover: "rgba(255,255,255,0.72)",
  cardBorder: "rgba(255,255,255,0.6)",
  text: "#1A1A2E",
  textLight: "rgba(26,26,46,0.5)",
  textMuted: "rgba(26,26,46,0.35)",
};

const TICKER_ITEMS = [
  "🧸 Care Bears dashboard: 12.4k views this week",
  "📈 TikTok trending: nostalgic IP reboots +340%",
  "🗼 Ralph Tokyo shipped: new social toolkit",
  "📌 Pinterest: dopamine decor searches +89% MoM",
  "🎬 Netflix Aerials: 2.1M impressions first 48hrs",
  "🎵 Ralph Radio: pilot episode drops Friday",
  "🌸 Disney Darlings EMEA: campaign live",
  "⚡ YouTube Shorts: tutorial-core aesthetic emerging",
  "📻 FREQUENCY prototype: Episode 1 playable",
  "🎤 SlopBowl: Super Bowl Sunday launch",
];

const LAUNCHES = [
  {
    name: "SlopBowl",
    client: "Ralph Original",
    color: R.orange,
    date: "Feb 2026",
    emoji: "🎤",
    tag: "AI App",
    description: "Real-time AI roast machine for Super Bowl ads. Point your phone at any Big Game ad and get instant, unsolicited commentary from a jaded ad connoisseur who's seen every trick but still respects the craft.",
    link: "slopbowl.ralph.world",
  },
  {
    name: "Netflix Interactive Aerials",
    client: "Netflix",
    color: R.red,
    date: "Jan 2026",
    emoji: "✈️",
    tag: "Interactive",
    description: "An interactive aerial experience built for Netflix that transforms passive viewing into participatory content, reaching 2.1M impressions in the first 48 hours.",
    link: null,
  },
  {
    name: "Care Bears Social Hub",
    client: "Cloudco",
    color: R.pink,
    date: "Dec 2025",
    emoji: "🧸",
    tag: "Dashboard",
    description: "Growth forecasting dashboard and social content hub for the Care Bears franchise. Data-driven content strategy that helped win a $500k engagement.",
    link: null,
  },
  {
    name: "Disney Darlings EMEA",
    client: "Disney",
    color: R.purple,
    date: "Live Now",
    emoji: "👑",
    tag: "Campaign",
    description: "Full EMEA launch campaign for Disney Darlings, spanning social content creation, influencer strategy, and cross-platform distribution across European markets.",
    link: null,
  },
  {
    name: "Ralph Voices",
    client: "Ralph Lab",
    color: R.cyan,
    date: "Beta",
    emoji: "🎙️",
    tag: "Product",
    description: "Synthetic audience testing platform using AI-generated voice profiles to simulate focus group reactions and audience sentiment before content goes live.",
    link: null,
  },
  {
    name: "Narrativ Platform",
    client: "Ralph Lab",
    color: R.blue,
    date: "Beta",
    emoji: "📖",
    tag: "Product",
    description: "Storytelling intelligence platform that surfaces narrative patterns across social data, helping brands find the stories their audiences actually want to hear.",
    link: null,
  },
];

const TRENDING = [
  { platform: "TikTok", icon: "▶", color: "#000", metric: "+340%", topic: "Nostalgic IP reboots", detail: "Childhood brands remixed with irony. Care Bears, Polly Pocket, Tamagotchi content surging across creator accounts." },
  { platform: "Pinterest", icon: "📌", color: "#E60023", metric: "+89%", topic: "Dopamine decor", detail: "Maximalist interiors, bold color blocking, playful object design. Anti-minimalism is the new aspiration." },
  { platform: "Instagram", icon: "📷", color: "#C13584", metric: "+215%", topic: "Branded ASMR", detail: "Product-focused sensory content outperforming traditional branded reels by 3x on average engagement." },
  { platform: "YouTube", icon: "🎬", color: "#FF0000", metric: "+127%", topic: "Tutorial-core", detail: "How-to content dressed in editorial aesthetics. The 'cool teacher' format is dominating Shorts." },
  { platform: "X", icon: "𝕏", color: "#000", metric: "+180%", topic: "Comfort discourse", detail: "Audiences debating 'comfort content' vs 'challenge content'. Nostalgia fatigue emerging as counter-trend." },
];

const MAG_QUOTES = [
  { text: "The algorithm doesn't care about your brand deck. It cares about the first 0.3 seconds.", src: "Ralph Magazine, Issue 7", theme: "attention" },
  { text: "Joy is not a strategy. Joy is the strategy.", src: "Chris Hassell, Founder", theme: "philosophy" },
  { text: "Every scroll is a vote. What are you running for?", src: "Ralph Magazine, Issue 12", theme: "engagement" },
  { text: "The best content doesn't interrupt culture. It becomes culture.", src: "Ralph Magazine, Issue 9", theme: "culture" },
];

const ARCHIVE = [
  { title: "Behind the Aerials", type: "Case Study", color: R.red, emoji: "✈️", year: "2025", description: "How we turned passive Netflix viewing into participatory content that reached millions in 48 hours." },
  { title: "Tokyo Night Market", type: "Photo Essay", color: R.cyan, emoji: "🏮", year: "2024", description: "A visual exploration of Tokyo's underground creative scene through the lens of Ralph's Tokyo studio." },
  { title: "The Joy Issue", type: "Magazine", color: R.yellow, emoji: "😊", year: "2024", description: "Our most popular print issue, exploring why joy is the most undervalued currency in advertising." },
  { title: "Creator Roundtable", type: "Video", color: R.purple, emoji: "🎙️", year: "2025", description: "Six creators, one table, zero scripts. A candid conversation about the state of content creation." },
];

const INDUSTRY_DATA = [
  { label: "Short-form video", value: "$12.4B", change: "+34%", color: R.red },
  { label: "Creator economy", value: "$250B", change: "+22%", color: R.purple },
  { label: "Social commerce", value: "$1.2T", change: "+18%", color: R.green },
];

const OFFICES = [
  { city: "New York", tz: "America/New_York", emoji: "🗽" },
  { city: "London", tz: "Europe/London", emoji: "🎡" },
  { city: "LA", tz: "America/Los_Angeles", emoji: "🌴" },
  { city: "Tokyo", tz: "Asia/Tokyo", emoji: "⛩️" },
];

// ─── OVERLAY SYSTEM ───
function Overlay({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,15,0.3)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.8)",
          borderRadius: "24px",
          maxWidth: "560px", width: "100%",
          boxShadow: "0 32px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
          animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          overflow: "hidden",
        }}
      >
        {/* Color bar */}
        <div style={{ height: "4px", background: item.color || R.red }} />

        <div style={{ padding: "28px 32px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: `${item.color || R.red}12`, border: `1px solid ${item.color || R.red}20`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
              }}>
                {item.emoji}
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: R.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>{item.name || item.title}</div>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center" }}>
                  {item.client && <span style={{ fontSize: "12px", color: R.textLight, fontFamily: "'DM Mono', monospace" }}>{item.client}</span>}
                  {item.tag && (
                    <span style={{
                      fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "10px",
                      background: `${item.color}15`, color: item.color, fontFamily: "'DM Mono', monospace",
                      textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>{item.tag}</span>
                  )}
                  {item.type && (
                    <span style={{
                      fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "10px",
                      background: `${item.color}15`, color: item.color, fontFamily: "'DM Mono', monospace",
                      textTransform: "uppercase",
                    }}>{item.type}</span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{
              width: "32px", height: "32px", borderRadius: "50%", border: "none",
              background: "rgba(26,26,46,0.06)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", color: R.textMuted, transition: "background 0.2s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(26,26,46,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(26,26,46,0.06)"}
            >×</button>
          </div>

          {/* Description */}
          {item.description && (
            <div style={{
              fontSize: "15px", color: R.textLight, lineHeight: 1.65,
              fontFamily: "'DM Sans', sans-serif", marginBottom: "20px",
            }}>
              {item.description}
            </div>
          )}

          {/* Meta */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {item.date && (
              <div style={{ fontSize: "11px", color: R.textMuted, fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", gap: "4px" }}>
                {item.date === "Live Now" && <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: item.color, animation: "pulse 2s ease-in-out infinite" }} />}
                {item.date}
              </div>
            )}
            {item.year && <div style={{ fontSize: "11px", color: R.textMuted, fontFamily: "'DM Mono', monospace" }}>{item.year}</div>}
            {item.link && (
              <div style={{
                fontSize: "11px", color: item.color, fontFamily: "'DM Mono', monospace",
                cursor: "pointer", fontWeight: 600,
              }}>
                {item.link} →
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}

// ─── GLASS CARD ───
function Glass({ children, style, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? R.cardHover : R.card,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${R.cardBorder}`,
        borderRadius: "20px",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: hovered ? "translateY(-3px) scale(1.005)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)"
          : "0 8px 24px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children, color }) {
  return (
    <div style={{
      fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
      color: color || R.textLight, fontFamily: "'DM Mono', monospace",
      display: "flex", alignItems: "center", gap: "6px",
    }}>{children}</div>
  );
}

// ─── TICKER ───
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      overflow: "hidden", whiteSpace: "nowrap", height: "34px",
      display: "flex", alignItems: "center",
      background: "rgba(255,255,255,0.35)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.4)",
    }}>
      <div style={{ display: "inline-flex", gap: "48px", paddingLeft: "100%", animation: "ticker 50s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: R.text, opacity: 0.65 }}>{item}</span>
        ))}
      </div>
      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

// ─── VIDEO PLAYER ───
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <Glass style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Label color={R.red}>📺 Ralph.TV</Label>
        {playing && <span style={{ fontSize: "9px", color: R.red, fontFamily: "'DM Mono', monospace", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: R.red, animation: "pulse 2s ease-in-out infinite" }} />
          NOW PLAYING
        </span>}
      </div>
      <div style={{
        flex: 1, margin: "0 12px 12px", borderRadius: "14px", minHeight: 0,
        background: `linear-gradient(135deg, ${R.red}12 0%, ${R.red}06 100%)`,
        border: `1px solid ${R.red}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ display: "flex", gap: "4px", alignItems: "center", height: "50px", position: "absolute", opacity: 0.25 }}>
          {[...Array(28)].map((_, i) => (
            <div key={i} style={{
              width: "3.5px", borderRadius: "4px", background: R.red,
              height: playing ? `${8 + Math.abs(Math.sin(i * 0.5)) * 35}px` : "4px",
              animation: playing ? `wave ${0.4 + (i % 5) * 0.12}s ease-in-out infinite alternate` : "none",
              transition: "height 0.4s ease",
            }} />
          ))}
        </div>
        <button onClick={() => setPlaying(!playing)} style={{
          width: "64px", height: "64px", borderRadius: "50%", cursor: "pointer",
          border: "none", position: "relative", zIndex: 2,
          background: playing ? "#fff" : R.red,
          boxShadow: `0 8px 28px ${R.red}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: playing ? "scale(0.9)" : "scale(1)",
        }}>
          {playing ? (
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ width: "5px", height: "20px", background: R.red, borderRadius: "2px" }} />
              <div style={{ width: "5px", height: "20px", background: R.red, borderRadius: "2px" }} />
            </div>
          ) : (
            <div style={{ width: 0, height: 0, marginLeft: "4px", borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid #fff" }} />
          )}
        </button>
        <style>{`@keyframes wave { 0% { height: 6px; } 100% { height: 40px; } }`}</style>
      </div>
    </Glass>
  );
}

// ─── LATEST LAUNCHES ───
function LatestLaunches({ onSelect }) {
  return (
    <Glass style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px 8px" }}>
        <Label>🚀 Latest Launches</Label>
      </div>
      <div style={{ flex: 1, padding: "0 10px 10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", minHeight: 0, overflow: "hidden" }}>
        {LAUNCHES.map((p, i) => (
          <div key={i} onClick={() => onSelect(p)} style={{
            padding: "10px 12px", borderRadius: "14px", cursor: "pointer",
            background: `${p.color}06`, border: `1px solid ${p.color}10`,
            transition: "all 0.25s ease", display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}14`; e.currentTarget.style.borderColor = `${p.color}28`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${p.color}06`; e.currentTarget.style.borderColor = `${p.color}10`; }}
          >
            <div>
              <div style={{ fontSize: "16px", marginBottom: "3px" }}>{p.emoji}</div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: R.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.25 }}>{p.name}</div>
              <div style={{ fontSize: "10px", color: R.textMuted, fontFamily: "'DM Mono', monospace", marginTop: "1px" }}>{p.client}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
              <span style={{
                fontSize: "8px", fontWeight: 700, padding: "2px 6px", borderRadius: "8px",
                background: `${p.color}12`, color: p.color, fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase", letterSpacing: "0.3px",
              }}>{p.tag}</span>
              <span style={{ fontSize: "9px", color: p.date === "Live Now" ? p.color : R.textMuted, fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", gap: "3px" }}>
                {p.date === "Live Now" && <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: p.color, animation: "pulse 2s ease-in-out infinite" }} />}
                {p.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Glass>
  );
}

// ─── DAILY READ (PROMINENT) ───
function DailyRead() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const iv = setInterval(() => setIdx(i => (i + 1) % MAG_QUOTES.length), 12000); return () => clearInterval(iv); }, []);
  const q = MAG_QUOTES[idx];
  const themeColors = { attention: R.red, philosophy: R.orange, engagement: R.blue, culture: R.purple };
  const color = themeColors[q.theme];
  return (
    <Glass style={{
      height: "100%", display: "flex", flexDirection: "column",
      background: `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, ${color}08 100%)`,
    }}>
      <div style={{ padding: "16px 22px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Label color={color}>📖 Daily Read</Label>
        <div style={{
          fontSize: "9px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
          background: `${color}12`, color: color, fontFamily: "'DM Mono', monospace",
          textTransform: "uppercase", letterSpacing: "0.5px",
        }}>{q.theme}</div>
      </div>
      <div style={{ flex: 1, padding: "0 22px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "48px", color: color, opacity: 0.2, lineHeight: 0.6, marginBottom: "8px", fontFamily: "Georgia, serif", fontWeight: 700 }}>"</div>
        <div style={{ fontSize: "19px", color: R.text, lineHeight: 1.5, fontWeight: 500, fontFamily: "Georgia, serif", marginBottom: "12px", letterSpacing: "-0.2px" }}>
          {q.text}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "11px", color: R.textLight, fontFamily: "'DM Mono', monospace" }}>{q.src}</div>
          <div style={{ display: "flex", gap: "5px" }}>
            {MAG_QUOTES.map((_, i) => (
              <div key={i} onClick={() => setIdx(i)} style={{
                width: "8px", height: "8px", borderRadius: "50%", cursor: "pointer",
                background: i === idx ? color : "rgba(26,26,46,0.1)", transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </div>
    </Glass>
  );
}

// ─── LISTEN ───
function ListenButton() {
  const [state, setState] = useState("idle");
  const click = () => {
    if (state === "idle") { setState("loading"); setTimeout(() => setState("playing"), 2200); }
    else if (state === "playing") setState("idle");
  };
  return (
    <Glass style={{ height: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={click}>
      <div style={{ padding: "14px 18px 8px" }}>
        <Label color={R.blue}>🎧 Listen</Label>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", padding: "0 14px 14px" }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: state === "playing" ? R.blue : state === "loading" ? `${R.blue}30` : `${R.blue}12`,
          border: state === "idle" ? `2.5px solid ${R.blue}` : "2.5px solid transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: state === "playing" ? `0 8px 28px ${R.blue}40` : "none",
          animation: state === "loading" ? "spin 1s linear infinite" : "none",
        }}>
          {state === "idle" && <span style={{ fontSize: "18px", marginLeft: "2px", color: R.blue }}>▶</span>}
          {state === "loading" && <div style={{ width: "16px", height: "16px", border: `2.5px solid ${R.blue}`, borderTop: "2.5px solid transparent", borderRadius: "50%" }} />}
          {state === "playing" && (
            <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ width: "3.5px", background: "#fff", borderRadius: "2px", animation: `eqBar ${0.35 + i * 0.12}s ease-in-out infinite alternate` }} />
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", color: state === "playing" ? R.blue : R.text }}>
            {state === "idle" ? "Today's Digest" : state === "loading" ? "Generating..." : "Now Playing"}
          </div>
          <div style={{ fontSize: "10px", color: R.textMuted, fontFamily: "'DM Mono', monospace", marginTop: "2px" }}>4 min AI briefing</div>
        </div>
      </div>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes eqBar { 0% { height: 5px; } 100% { height: 20px; } }
      `}</style>
    </Glass>
  );
}

// ─── INNOVATION LAB ───
function InnovationLab() {
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setScanPos(p => (p + 1) % 100), 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <Glass style={{
      height: "100%", display: "flex", flexDirection: "column",
      background: `linear-gradient(135deg, rgba(255,255,255,0.55) 0%, ${R.green}06 100%)`,
    }}>
      <div style={{ padding: "14px 18px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Label color={R.green}>🧪 Innovation Lab</Label>
        <span style={{
          fontSize: "9px", fontWeight: 700, padding: "3px 8px", borderRadius: "10px",
          background: `${R.green}12`, color: R.green, fontFamily: "'DM Mono', monospace",
        }}>LATEST PROTOTYPE</span>
      </div>
      <div style={{ flex: 1, padding: "0 18px 14px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
        {/* FREQUENCY Feature */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "14px", flexShrink: 0,
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(155,107,255,0.3)",
            boxShadow: "0 4px 16px rgba(155,107,255,0.15)",
            position: "relative", overflow: "hidden",
          }}>
            <span style={{ fontSize: "24px", position: "relative", zIndex: 2 }}>📻</span>
            {/* Scan line */}
            <div style={{
              position: "absolute", top: 0, left: `${scanPos}%`, width: "2px", height: "100%",
              background: `linear-gradient(180deg, transparent 0%, ${R.green} 50%, transparent 100%)`,
              opacity: 0.6, transition: "left 0.08s linear",
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "16px", fontWeight: 800, color: R.text, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.3px" }}>
              FREQUENCY
            </div>
            <div style={{ fontSize: "11px", color: R.textLight, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4, marginTop: "2px" }}>
              Interactive radio narrative. Scan frequencies, talk to AI characters, uncover a mystery.
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
              <span style={{
                fontSize: "8px", fontWeight: 700, padding: "2px 6px", borderRadius: "8px",
                background: `${R.purple}12`, color: R.purple, fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
              }}>ElevenLabs</span>
              <span style={{
                fontSize: "8px", fontWeight: 700, padding: "2px 6px", borderRadius: "8px",
                background: `${R.blue}12`, color: R.blue, fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
              }}>OpenAI</span>
              <span style={{
                fontSize: "8px", fontWeight: 700, padding: "2px 6px", borderRadius: "8px",
                background: `${R.green}12`, color: R.green, fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
              }}>WebSocket</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(26,26,46,0.06)" }} />

        {/* Mini frequency visualization */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "2px", alignItems: "center", flex: 1 }}>
            {[...Array(32)].map((_, i) => {
              const h = 3 + Math.abs(Math.sin((i + scanPos * 0.3) * 0.4)) * 14;
              return (
                <div key={i} style={{
                  width: "3px", height: `${h}px`, borderRadius: "2px",
                  background: h > 12 ? R.green : h > 8 ? `${R.green}60` : `${R.green}25`,
                  transition: "height 0.15s ease",
                }} />
              );
            })}
          </div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: R.green, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
            27.{String(200 + Math.floor(scanPos * 4.65)).padStart(3, "0")} MHz
          </div>
        </div>
      </div>
    </Glass>
  );
}

// ─── FROM THE ARCHIVE ───
function FromArchive({ onSelect }) {
  const [idx, setIdx] = useState(0);
  const a = ARCHIVE[idx];
  useEffect(() => { const iv = setInterval(() => setIdx(i => (i + 1) % ARCHIVE.length), 9000); return () => clearInterval(iv); }, []);
  return (
    <Glass style={{ height: "100%", display: "flex", flexDirection: "column" }} onClick={() => onSelect(a)}>
      <div style={{ padding: "14px 18px 8px" }}>
        <Label>📁 From the Archive</Label>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 18px 14px" }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "14px",
          background: `${a.color}12`, border: `1px solid ${a.color}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "26px", transition: "all 0.4s ease",
        }}>{a.emoji}</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: R.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}>{a.title}</div>
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "4px" }}>
            <span style={{
              fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "10px",
              background: `${a.color}12`, color: a.color, fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
            }}>{a.type}</span>
            <span style={{ fontSize: "9px", color: R.textMuted, fontFamily: "'DM Mono', monospace", padding: "2px 0" }}>{a.year}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
          {ARCHIVE.map((_, i) => (
            <div key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} style={{
              width: "7px", height: "7px", borderRadius: "50%", cursor: "pointer",
              background: i === idx ? a.color : "rgba(26,26,46,0.1)", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </Glass>
  );
}

// ─── INDUSTRY PULSE ───
function IndustryPulse() {
  return (
    <Glass style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px 8px" }}>
        <Label>📊 Industry Pulse</Label>
      </div>
      <div style={{ flex: 1, padding: "0 12px 10px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "7px" }}>
        {INDUSTRY_DATA.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 10px", borderRadius: "12px", background: `${d.color}06` }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: d.color, fontFamily: "'DM Sans', sans-serif" }}>{d.value}</div>
              <div style={{ fontSize: "10px", fontWeight: 600, color: R.text, fontFamily: "'DM Sans', sans-serif", marginTop: "1px" }}>{d.label}</div>
            </div>
            <div style={{
              marginLeft: "auto", fontSize: "10px", fontWeight: 700,
              color: R.green, fontFamily: "'DM Mono', monospace",
              padding: "2px 8px", borderRadius: "10px", background: `${R.green}10`,
            }}>{d.change} ↑</div>
          </div>
        ))}
        <div style={{ fontSize: "8px", color: R.textMuted, fontFamily: "'DM Mono', monospace", textAlign: "right", marginTop: "2px" }}>
          eMarketer, Goldman Sachs 2025
        </div>
      </div>
    </Glass>
  );
}

// ─── SIGNAL FOOTER ───
function SignalFooter() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const iv = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(iv); }, []);
  return (
    <div style={{
      height: "36px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
      gap: "28px", background: "rgba(255,255,255,0.35)", backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(255,255,255,0.4)",
    }}>
      {OFFICES.map((o, i) => {
        const hour = parseInt(new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone: o.tz }).format(now));
        const isActive = hour >= 9 && hour < 18;
        const time = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: o.tz }).format(now);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "12px" }}>{o.emoji}</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: R.text, fontFamily: "'DM Sans', sans-serif" }}>{o.city}</span>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: isActive ? R.green : "rgba(26,26,46,0.15)",
              boxShadow: isActive ? `0 0 6px ${R.green}` : "none",
              animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
            }} />
            <span style={{ fontSize: "10px", color: R.textMuted, fontFamily: "'DM Mono', monospace" }}>{time}</span>
          </div>
        );
      })}
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
    </div>
  );
}

// ─── TRENDING ROTATOR ───
function TrendingRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const iv = setInterval(() => setIdx(i => (i + 1) % TRENDING.length), 5000); return () => clearInterval(iv); }, []);
  const t = TRENDING[idx];
  return (
    <Glass style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Label color={R.orange}>🔥 Trending</Label>
        <div style={{ display: "flex", gap: "4px" }}>
          {TRENDING.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              width: "6px", height: "6px", borderRadius: "50%", cursor: "pointer",
              background: i === idx ? R.orange : "rgba(26,26,46,0.1)", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "0 18px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "16px" }}>{t.icon}</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: R.text, fontFamily: "'DM Sans', sans-serif" }}>{t.platform}</span>
          <span style={{
            fontSize: "10px", fontWeight: 700, color: R.green, fontFamily: "'DM Mono', monospace",
            padding: "1px 6px", borderRadius: "8px", background: `${R.green}10`,
          }}>{t.metric}</span>
        </div>
        <div style={{ fontSize: "15px", fontWeight: 800, color: R.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.25, marginBottom: "6px" }}>
          {t.topic}
        </div>
        <div style={{ fontSize: "11px", color: R.textLight, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
          {t.detail}
        </div>
        <div style={{ fontSize: "8px", color: R.textMuted, fontFamily: "'DM Mono', monospace", marginTop: "8px" }}>via Apify</div>
      </div>
    </Glass>
  );
}

// ─── MAIN ───
export default function RalphWorldPage() {
  const [time, setTime] = useState(new Date());
  const [overlayItem, setOverlayItem] = useState(null);
  useEffect(() => { const iv = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(iv); }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* WebGL Canvas iframe */}
      <iframe src="about:blank" title="Ralph Canvas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", zIndex: 0 }} />

      {/* Fallback */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse at 15% 25%, ${R.pink}16 0%, transparent 45%),
          radial-gradient(ellipse at 85% 75%, ${R.blue}12 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, ${R.yellow}10 0%, transparent 55%),
          radial-gradient(ellipse at 80% 20%, ${R.cyan}08 0%, transparent 40%),
          ${R.bg}
        `,
        animation: "bgShift 25s ease-in-out infinite alternate",
      }} />
      <style>{`@keyframes bgShift { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(12deg); } }`}</style>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{
          height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", flexShrink: 0,
          background: "rgba(255,255,255,0.35)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.4)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              padding: "3px 10px", borderRadius: "20px", fontSize: "9px", fontWeight: 700,
              background: `${R.red}12`, color: R.red, fontFamily: "'DM Mono', monospace",
              letterSpacing: "1px", display: "flex", alignItems: "center", gap: "5px",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: R.red, animation: "pulse 2s ease-in-out infinite" }} />
              LIVE
            </div>
          </div>
          <div style={{ fontSize: "11px", color: R.textMuted, fontFamily: "'DM Mono', monospace" }}>
            {time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>

        <Ticker />

        {/* Grid: 3 rows, 4 cols */}
        <div style={{
          flex: 1, padding: "12px 16px", minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1.8fr 1.3fr 1fr 1fr",
          gridTemplateRows: "1.1fr 0.9fr 1fr",
          gap: "10px",
        }}>
          {/* R1, C1-2: Daily Read (HERO) */}
          <div style={{ gridRow: "1", gridColumn: "1 / 3" }}><DailyRead /></div>

          {/* R1, C3: Listen */}
          <div style={{ gridRow: "1", gridColumn: "3" }}><ListenButton /></div>

          {/* R1, C4: Industry Pulse */}
          <div style={{ gridRow: "1", gridColumn: "4" }}><IndustryPulse /></div>

          {/* R2, C1: Video */}
          <div style={{ gridRow: "2 / 4", gridColumn: "1" }}><VideoPlayer /></div>

          {/* R2-3, C2: Latest Launches */}
          <div style={{ gridRow: "2 / 4", gridColumn: "2" }}><LatestLaunches onSelect={setOverlayItem} /></div>

          {/* R2, C3-4: Innovation Lab */}
          <div style={{ gridRow: "2", gridColumn: "3 / 5" }}><InnovationLab /></div>

          {/* R3, C3: Trending Now - takes remaining space */}
          <div style={{ gridRow: "3", gridColumn: "3" }}><FromArchive onSelect={setOverlayItem} /></div>

          {/* R3, C4: Trending (rotating) */}
          <div style={{ gridRow: "3", gridColumn: "4" }}><TrendingRotator /></div>
        </div>

        <SignalFooter />
      </div>

      {/* Overlay */}
      <Overlay item={overlayItem} onClose={() => setOverlayItem(null)} />
    </div>
  );
}
