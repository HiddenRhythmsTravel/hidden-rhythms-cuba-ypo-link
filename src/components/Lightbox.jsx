import { useState, useEffect } from 'react';

export default function Lightbox({ item: mediaObj, onClose, musicPlaying, onVideoPlay, onVideoStop }) {
  const [currentIndex, setCurrentIndex] = useState(mediaObj.initialIndex !== undefined ? mediaObj.initialIndex : 0);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const items = mediaObj.items || [mediaObj];
  const currentItem = items[currentIndex];

  const goNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const isVideo = currentItem.type === 'video';
  const isYoutube = currentItem.type === 'youtube';

  useEffect(() => {
    if (isVideo || isYoutube) {
      if (onVideoPlay) onVideoPlay();
    } else {
      if (onVideoStop) onVideoStop();
    }
  }, [isVideo, isYoutube]);

  const handleClose = (e) => {
    if (onVideoStop) onVideoStop();
    if (onClose) onClose(e);
  };

  return (
    <div 
      onClick={handleClose}
      className="fade-in"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        padding: '1rem'
      }}
    >
      <button 
        onClick={handleClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem', width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer', zIndex: 110, backdropFilter: 'blur(8px)', transition: 'all 0.3s ease'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {items.length > 1 && (
        <>
          <button onClick={goPrev} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100, backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={goNext} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100, backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </>
      )}

      <div 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '1000px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
      >
        {isVideo ? (
          <video 
            key={currentItem.src}
            src={`${currentItem.src}#t=0.5`} 
            controls 
            autoPlay 
            style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          />
        ) : isYoutube ? (
          <iframe 
            key={currentItem.youtubeId}
            src={`https://www.youtube.com/embed/${currentItem.youtubeId}?autoplay=1&rel=0`}
            style={{ width: '85vw', height: '80vh', maxWidth: '1000px', maxHeight: '560px', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: 'none' }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <img 
            key={currentItem.src}
            src={currentItem.src} 
            alt={currentItem.title} 
            style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          />
        )}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3 className="text-accent" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0, color: 'var(--accent)' }}>
            {currentItem.title}{currentItem.location ? `, ${currentItem.location}` : ''}{currentItem.date ? `, ${currentItem.date}` : ''}
          </h3>
        </div>
      </div>
    </div>
  );
}
