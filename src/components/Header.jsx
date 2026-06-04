export default function Header({ activeView, onViewChange }) {
  return (
    <header className="glass-nav sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center fade-in">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-serif text-accent" style={{margin: 0, letterSpacing: '0.02em', cursor: 'pointer'}} onClick={() => onViewChange('gallery')}>
          Hidden Rhythms
        </h1>
      </div>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button 
          onClick={() => onViewChange('gallery')}
          style={{
            background: 'transparent', border: 'none', color: 'white',
            textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.78rem',
            cursor: 'pointer', opacity: activeView === 'gallery' ? 1 : 0.6,
            fontWeight: activeView === 'gallery' ? 'bold' : 'normal',
            transition: 'opacity 0.3s ease', padding: '0.5rem 0'
          }}
        >
          Master Collection
        </button>
        <button 
          onClick={() => onViewChange('pitch')}
          style={{
            background: 'var(--accent)', border: 'none', color: 'var(--bg-primary)',
            textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.78rem',
            cursor: 'pointer', padding: '0.5rem 1.2rem', borderRadius: '20px',
            fontWeight: 'bold', boxShadow: activeView === 'pitch' ? '0 4px 15px rgba(239, 156, 130, 0.3)' : 'none',
            opacity: activeView === 'pitch' ? 1 : 0.85,
            transition: 'all 0.3s ease'
          }}
          className="hover-lift"
        >
          EO Columbus Medellin
        </button>
      </nav>
    </header>
  );
}

