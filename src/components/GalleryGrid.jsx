import MediaCard from './MediaCard';

export default function GalleryGrid({ items, onMediaClick }) {
  if (!items || items.length === 0) return <div style={{textAlign:'center', marginTop: '2rem'}}>Loading Media...</div>;
  return (
    <div id="gallery" className="masonry-grid px-4">
      {items.map((item, idx) => (
        <MediaCard key={item.youtubeId || item.src + idx} item={item} onClick={onMediaClick} />
      ))}
    </div>
  );
}
