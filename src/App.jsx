import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from './components/Lightbox';
import Slideshow from './components/Slideshow';
import { sixModulesData } from './sixModulesData';

function App() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  // Deprecated activeMedia.type audio hook removed to support array-based Lightbox pausing

  const toggleMusic = () => {
    setUserInteracted(true);
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(e => console.log(e));
    }
  };

  useEffect(() => {
    const handleFirstClick = () => {
      if (!userInteracted && audioRef.current) {
        setUserInteracted(true);
        audioRef.current.play().then(() => setMusicPlaying(true)).catch(e => console.log(e));
      }
      document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);
    return () => document.removeEventListener('click', handleFirstClick);
  }, [userInteracted]);

  return (
    <>
      <audio ref={audioRef} src="/media/cumbiafrica_morenita.mp3" loop preload="auto" />
      <Header />
      
      <button 
        onClick={toggleMusic}
        className="hover-lift"
        style={{
          position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 1000,
          background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
          padding: '0.75rem 1.25rem', borderRadius: '30px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          fontFamily: 'var(--font-sans)', fontSize: '0.95rem', letterSpacing: '0.05em'
        }}
        aria-label={musicPlaying ? "Mute background music" : "Play background music"}
      >
        {musicPlaying ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            Mute Music
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            Play Music
          </>
        )}
      </button>

      <main className="fade-in" style={{ animationDelay: '0.2s', padding: '4rem 1rem' }}>
        <section style={{ textAlign: 'center', marginBottom: '6rem', maxWidth: '800px', margin: '0 auto 6rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', lineHeight: '1.1' }}>Hidden Rhythms Events</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, letterSpacing: '0.02em' }}>
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
