import { useState, useEffect } from "react";
import { R } from "./data/theme";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { adaptiveText } from "./hooks/useContrastColor";

import Ticker from "./components/Ticker";
import DailyRead from "./components/DailyRead";
import ListenButton from "./components/ListenButton";
import IndustryPulse from "./components/IndustryPulse";
import VideoPlayer from "./components/VideoPlayer";
import LatestLaunches from "./components/LatestLaunches";
import InnovationLab from "./components/InnovationLab";
import FromArchive from "./components/FromArchive";
import TrendingRotator from "./components/TrendingRotator";
import SignalFooter from "./components/SignalFooter";
import Overlay from "./components/Overlay";

const CANVAS_URL = "https://ralph-visual-canvas-production.up.railway.app/";


export default function App() {
  const [time, setTime] = useState(new Date());
  const [overlayItem, setOverlayItem] = useState(null);
  const bp = useBreakpoint();
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(iv);
  }, []);

  const isDesktop = bp === "desktop";
  const isMobile = bp === "mobile";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Dynamic canvas background */}
      <iframe
        src={CANVAS_URL}
        title="Ralph Canvas"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 0,
          pointerEvents: "none",
        }}
        allow="autoplay"
        loading="eager"
      />

      {/* Very light tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse at 15% 25%, ${R.pink}06 0%, transparent 45%),
            radial-gradient(ellipse at 85% 75%, ${R.blue}05 0%, transparent 45%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Floating LIVE badge + date — not a bar */}
        <div
          style={{
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "space-between",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              fontSize: "10px",
              fontWeight: 700,
              background: "rgba(15,15,25,0.4)",
              backdropFilter: "blur(64px)",
              WebkitBackdropFilter: "blur(64px)",
              color: R.red,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: R.red,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            LIVE
          </div>
          {!isMobile && (
            <div
              style={{
                fontSize: "11px",
                fontFamily: "'DM Mono', monospace",
                padding: "5px 14px",
                borderRadius: "20px",
                background: "rgba(15,15,25,0.4)",
                backdropFilter: "blur(64px)",
                WebkitBackdropFilter: "blur(64px)",
                border: "1px solid rgba(255,255,255,0.1)",
                isolation: "isolate",
                ...adaptiveText,
              }}
            >
              {time.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}
        </div>

        {/* Ticker */}
        {!isMobile && (
          <div style={{ padding: "0 20px 8px", flexShrink: 0 }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", height: "34px" }}>
              <Ticker />
            </div>
          </div>
        )}

        {/* Main grid — relaxed with nudges */}
        {isDesktop ? (
          <div
            style={{
              flex: 1,
              padding: "6px 20px 10px",
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: "1.8fr 1.3fr 1fr 1fr",
              gridTemplateRows: "1.1fr 0.9fr 1fr",
              gap: "14px",
            }}
          >
            {/* R1 C1-2: Daily Read — naked text */}
            <div style={{ gridRow: "1", gridColumn: "1 / 3"}}>
              <DailyRead />
            </div>

            {/* R1 C3: Listen */}
            <div style={{ gridRow: "1", gridColumn: "3"}}>
              <ListenButton />
            </div>

            {/* R1 C4: Industry Pulse */}
            <div style={{ gridRow: "1", gridColumn: "4"}}>
              <IndustryPulse />
            </div>

            {/* R2-3 C1: Video */}
            <div style={{ gridRow: "2 / 4", gridColumn: "1"}}>
              <VideoPlayer />
            </div>

            {/* R2-3 C2: Latest Launches */}
            <div style={{ gridRow: "2 / 4", gridColumn: "2"}}>
              <LatestLaunches onSelect={setOverlayItem} />
            </div>

            {/* R2 C3-4: Innovation Lab */}
            <div style={{ gridRow: "2", gridColumn: "3 / 5"}}>
              <InnovationLab />
            </div>

            {/* R3 C3: Archive */}
            <div style={{ gridRow: "3", gridColumn: "3"}}>
              <FromArchive onSelect={setOverlayItem} />
            </div>

            {/* R3 C4: Trending */}
            <div style={{ gridRow: "3", gridColumn: "4"}}>
              <TrendingRotator />
            </div>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              padding: "8px 16px",
              overflowY: "auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              alignContent: "start",
            }}
          >
            <div style={isMobile ? { minHeight: "180px" } : { gridColumn: "1 / 3", minHeight: "180px" }}>
              <DailyRead />
            </div>
            <div style={{ minHeight: "180px" }}><ListenButton /></div>
            <div style={{ minHeight: "180px" }}><IndustryPulse /></div>
            <div style={{ minHeight: "260px" }}><VideoPlayer /></div>
            <div style={{ minHeight: "260px" }}><LatestLaunches onSelect={setOverlayItem} /></div>
            <div style={isMobile ? { minHeight: "220px" } : { gridColumn: "1 / 3", minHeight: "220px" }}>
              <InnovationLab />
            </div>
            <div style={{ minHeight: "200px" }}><FromArchive onSelect={setOverlayItem} /></div>
            <div style={{ minHeight: "200px" }}><TrendingRotator /></div>
          </div>
        )}

        {/* Footer — floating pill, not a bar */}
        <div style={{ padding: "8px 20px 14px", display: "flex", justifyContent: "flex-end" }}>
          <SignalFooter />
        </div>
      </div>

      {/* Detail overlay */}
      <Overlay item={overlayItem} onClose={() => setOverlayItem(null)} />
    </div>
  );
}
