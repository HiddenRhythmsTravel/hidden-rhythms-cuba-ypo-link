export default function Header() {
  return (
    <header className="glass-nav sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center fade-in">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-serif text-accent" style={{margin: 0, letterSpacing: '0.02em'}}>Hidden Rhythm Events</h1>
      </div>
      <nav>
        <a href="#gallery" className="text-sm uppercase tracking-widest hover-text" style={{textDecoration: 'none', transition: 'color 0.3s'}}>
          View Gallery
        </a>
      </nav>
    </header>
  );
}
