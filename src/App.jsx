import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from './components/Lightbox';
import Slideshow from './components/Slideshow';
import { mediaItems } from './mediaList';
import { slideshowItems } from './slideshowList';

function App() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (activeMedia && (activeMedia.type === 'video' || activeMedia.type === 'youtube') && audioRef.current) {
      audioRef.current.pause();
    } else if (musicPlaying && audioRef.current && userInteracted) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked', e));
    }
  }, [activeMedia, musicPlaying, userInteracted]);

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
      <audio ref={audioRef} src="/media/background.mp3" loop preload="auto" />
      <Header />
      
      <button 
        onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
        className="hover-lift"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50,
          width: '48px', height: '48px', borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer'
        }}
        title={musicPlaying ? "Pause Music" : "Play Music"}
      >
        {musicPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>

      <main className="fade-in" style={{ animationDelay: '0.2s', padding: '4rem 1rem' }}>
        <section style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', lineHeight: '1.1' }}>Hidden Rhythm Events</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, letterSpacing: '0.02em' }}>
            View a Collection of some of our Favorite Moments
          </p>
        </section>

        <Slideshow items={slideshowItems} onMediaClick={setActiveMedia} />
        
        <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '2rem' }} className="fade-in">
          <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
            Highlights from Other Events
          </h3>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent)', margin: '0 auto 1rem', opacity: 0.7 }}></div>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Explore a curated selection of incredible journeys and authentic encounters from our past productions.
          </p>
        </div>

        <GalleryGrid items={mediaItems} onMediaClick={setActiveMedia} />
      </main>

      {activeMedia && (
        <Lightbox item={activeMedia} onClose={() => setActiveMedia(null)} />
      )}
    </>
  );
}

export default App;
