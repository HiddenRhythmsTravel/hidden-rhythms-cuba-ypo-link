import { useState, useEffect } from 'react';

export default function Slideshow({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // 5 sec per slide
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="slideshow-container fade-in" style={{ marginBottom: '5rem', padding: '0 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          YPO Conference — Cuba 2019
        </h3>
        <p style={{ opacity: 0.8, fontSize: '1.1rem', letterSpacing: '0.02em' }}>An exclusive retrospect of our landmark Havana assembly.</p>
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto',
        aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', backgroundColor: 'var(--surface)',
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
          position: 'absolute', bottom: '1.5rem', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: '0.75rem', zIndex: 10
        }}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: index === currentIndex ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
