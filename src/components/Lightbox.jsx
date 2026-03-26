import { useEffect } from 'react';

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const isVideo = item.type === 'video';
  const isYoutube = item.type === 'youtube';

  return (
    <div 
      onClick={onClose}
      className="fade-in"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        padding: '1rem'
      }}
    >
      <button 
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer', zIndex: 110
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>

      <div 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '1000px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
      >
        {isVideo ? (
          <video 
            src={`${item.src}#t=0.5`} 
            controls 
            autoPlay 
            style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          />
        ) : isYoutube ? (
          <iframe 
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            style={{ width: '85vw', height: '80vh', maxWidth: '1000px', maxHeight: '560px', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: 'none' }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <img 
            src={item.src} 
            alt={item.title} 
            style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          />
        )}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3 className="text-accent" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0, color: 'var(--accent)' }}>{item.title}</h3>
        </div>
      </div>
    </div>
  );
}
