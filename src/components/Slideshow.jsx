import { useState, useEffect } from 'react';

export default function Slideshow({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="fade-in" style={{ 
      marginBottom: '5rem', padding: '2.5rem', 
      backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '16px', 
      border: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem'
    }}>
      
      <div style={{ flex: '1 1 300px' }}>
        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
          Highlight Showcase
        </h4>
        <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)', marginBottom: '1rem', lineHeight: 1.1 }}>
          YPO Conference <br/> Cuba 2019
        </h3>
        <p style={{ opacity: 0.85, fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '0' }}>
          A dedicated retrospect of our landmark Havana assembly. This collection demonstrates the intricate production, immersive design, and seamless execution we bring to every exclusive destination.
        </p>
      </div>

      <div style={{
        flex: '1 1 500px', position: 'relative', width: '100%',
        aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)', backgroundColor: 'var(--surface)',
        transform: 'translateZ(0)'
      }}>
        {items.map((item, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute', inset: 0,
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              pointerEvents: index === currentIndex ? 'auto' : 'none'
            }}
          >
            <img 
              src={item.src} 
              alt={`YPO Cuba 2019 - Slide ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
        
        {/* Navigation Dots */}
        <div style={{
          position: 'absolute', bottom: '1rem', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 10
        }}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: index === currentIndex ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
