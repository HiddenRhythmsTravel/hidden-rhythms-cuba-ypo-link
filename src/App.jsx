import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import GalleryGrid from "./components/GalleryGrid";
import Lightbox from "./components/Lightbox";
import Slideshow from "./components/Slideshow";
import { sixModulesData } from "./sixModulesData";
import EOColumbusProposal from "./components/eo-columbus/EOColumbusProposal";

function App() {
  const [activeView, setActiveView] = useState("pitch"); // Defaults to the EO Columbus Proposal
  const [activeMedia, setActiveMedia] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [volume, setVolume] = useState(0.25);
  const [playerMinimized, setPlayerMinimized] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play().then(() => setMusicPlaying(true)).catch(e => console.log(e));
      }
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  // Pause background music when a video lightbox is open
  useEffect(() => {
    if (activeMedia && (activeMedia.type === "video" || activeMedia.type === "youtube") && audioRef.current) {
      audioRef.current.pause();
    } else if (musicPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Music play blocked", e));
    }
  }, [activeMedia, musicPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.play()
        .then(() => setMusicPlaying(true))
        .catch(e => {
          console.log("Autoplay blocked by browser. Awaiting user interaction.", e);
        });
    }

    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.25;
        audioRef.current.play()
          .then(() => setMusicPlaying(true))
          .catch(e => console.log(e));
      }
      document.removeEventListener("click", handleFirstClick);
    };
    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/media/sunset_in_el_palmar.mp3" loop preload="auto" autoPlay />
      
      {/* Top Navbar */}
      <Header activeView={activeView} onViewChange={setActiveView} />

      {/* Sleek Glassmorphic Music Player Controls */}
      {playerMinimized ? (
        <button 
          onClick={() => setPlayerMinimized(false)}
          className="hover-lift"
          style={{
            position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 1000,
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(11, 71, 69, 0.9)", color: "white", 
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(16px)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            cursor: "pointer", outline: "none", transition: "all 0.3s ease",
            padding: 0
          }}
          aria-label="Expand music player"
        >
          <span style={{ 
            fontSize: "1.1rem", 
            display: "inline-block", 
            animation: musicPlaying ? "waveFlag 2s infinite ease-in-out" : "none" 
          }}>
            🎵
          </span>
        </button>
      ) : (
        <div 
          className="hover-lift"
          style={{
            position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 1000,
            background: "rgba(11, 71, 69, 0.85)", color: "white", 
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "0.6rem 1.2rem", borderRadius: "30px",
            display: "flex", alignItems: "center", gap: "14px",
            backdropFilter: "blur(16px)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
            fontFamily: "var(--font-sans)"
          }}
        >
          {/* Play/Pause Button */}
          <button 
            onClick={toggleMusic}
            style={{
              background: "none", border: "none", color: "var(--accent)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              padding: 0, outline: "none", transition: "transform 0.2s ease"
            }}
            aria-label={musicPlaying ? "Pause music" : "Play music"}
          >
            {musicPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
            )}
          </button>

          {/* Divider */}
          <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)" }}></div>

          {/* Track Title */}
          <div style={{ display: "flex", flexDirection: "column", minWidth: "120px" }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "bold", lineHeight: "1" }}>Now Playing</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-heading)", fontWeight: "500", marginTop: "2px", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>Sunset in El Palmar</span>
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)" }}></div>

          {/* Volume Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => {
                const newVol = volume > 0 ? 0 : 0.25;
                setVolume(newVol);
                if (audioRef.current) audioRef.current.volume = newVol;
              }}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: 0 }}
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
              ) : volume < 0.5 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              )}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={volume} 
              onChange={handleVolumeChange}
              className="volume-slider"
              style={{ cursor: "pointer" }}
              aria-label="Volume Slider"
            />
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)" }}></div>

          {/* Minimize / Hide Button */}
          <button 
            onClick={() => setPlayerMinimized(true)}
            style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.6)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              padding: "2px", outline: "none", transition: "color 0.2s"
            }}
            title="Minimize Player"
            aria-label="Minimize music player"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
      )}

      {activeView === "pitch" ? (
        <EOColumbusProposal />
      ) : (
        <main className="fade-in" style={{ animationDelay: "0.2s", padding: "4rem 1rem" }}>
          <section style={{ textAlign: "center", marginBottom: "6rem", maxWidth: "800px", margin: "0 auto 6rem" }}>
            <h2 style={{ fontSize: "3.5rem", fontFamily: "var(--font-serif)", marginBottom: "1rem", lineHeight: "1.1" }}>Hidden Rhythms Events</h2>
            <p style={{ fontSize: "1.25rem", opacity: 0.8, letterSpacing: "0.02em" }}>
              A Master Collection of Global Production Highlights
            </p>
          </section>

          {sixModulesData.map((module, idx) => (
            <Slideshow 
              key={module.id} 
              data={module} 
              onMediaClick={setActiveMedia} 
              reverse={idx % 2 !== 0} 
            />
          ))}
        </main>
      )}

      {activeMedia && (
        <Lightbox 
          item={activeMedia} 
          onClose={() => setActiveMedia(null)} 
          musicPlaying={musicPlaying}
          onVideoPlay={() => { if (audioRef.current) audioRef.current.pause() }}
          onVideoStop={() => { if (musicPlaying && audioRef.current) audioRef.current.play().catch(e=>console.log(e)) }}
        />
      )}
    </>
  );
}

export default App;
