export default function Header({ activeView, onViewChange }) {
  return (
    <header 
      className="glass-nav fade-in"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        width: "100%"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1 
          className="font-serif text-accent" 
          style={{
            margin: 0, 
            letterSpacing: '0.02em', 
            cursor: 'pointer',
            fontSize: 'clamp(1.5rem, 4vw, 1.85rem)'
          }} 
          onClick={() => onViewChange('gallery')}
        >
          Hidden Rhythms
        </h1>
      </div>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button 
          onClick={() => onViewChange('gallery')}
          style={{
            background: 'transparent', border: 'none', color: 'white',
            textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem',
            cursor: 'pointer', opacity: activeView === 'gallery' ? 1 : 0.6,
            fontWeight: activeView === 'gallery' ? 'bold' : 'normal',
            transition: 'opacity 0.3s ease', padding: '0.5rem 0.75rem'
          }}
        >
          Master Collection
        </button>
        <button 
          onClick={() => onViewChange('pitch')}
          style={{
            background: 'var(--accent)', border: 'none', color: 'var(--bg-primary)',
            textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem',
            cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '20px',
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
