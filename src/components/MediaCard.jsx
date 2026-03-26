export default function MediaCard({ item, onClick }) {
  const isVideo = item.type === 'video';
  const isYoutube = item.type === 'youtube';
  const isPlayable = isVideo || isYoutube;
  
  return (
    <div 
      className="masonry-item premium-card"
      onClick={() => onClick(item)}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {isVideo ? (
          <video 
            src={`${item.src}#t=0.5`} 
            className="card-media"
            muted
            loop
            preload="metadata"
            onMouseOver={e => e.target.play().catch(()=>{})}
            onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
          />
        ) : isYoutube ? (
          <img 
            src={item.thumb} 
            alt={item.title} 
            loading="lazy"
            className="card-media"
          />
        ) : (
          <img 
            src={item.src} 
            alt={item.title} 
            loading="lazy"
            className="card-media"
          />
        )}
        
        {isPlayable && (
          <div className="play-button">
            <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
        
        <div className="card-overlay" />
      </div>
      
      <div className="content-container">
        {(item.location || item.date) && (
          <span className="meta-tag">
            {item.location}{item.location && item.date ? ' • ' : ''}{item.date}
          </span>
        )}
        
        <h3 className="title">
          {item.title}
        </h3>
        
        {item.eventName && (
          <p className="event-name">
            {item.eventName}
          </p>
        )}
      </div>
    </div>
  );
}
