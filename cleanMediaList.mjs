import fs from 'fs';

let content = fs.readFileSync('src/mediaList.js', 'utf-8');
const match = content.match(/export const mediaItems = (\[.*\]);/s);
if (match) {
  let items = JSON.parse(match[1]);
  
  items = items.map(item => {
    let newTitle = item.title;
    
    // Pristine formatting overrides for raw filenames
    if (item.eventName === "Netflix Retreat") newTitle = "Netflix Executive Showcase";
    if (item.eventName === "Getting Funky") newTitle = "Super Jam Production";
    if (item.eventName === "Private Client Retreat") newTitle = "Exclusive Client Engagement";
    if (item.eventName === "Colombia Experience") {
      if (item.type === "video") newTitle = "Fenix Beach Cinematic Feature";
      else newTitle = "Immersive Colombia Experience";
    }
    if (item.eventName === "AUA Gala") newTitle = "VIP Gala Reception";
    
    // Preserve intrinsic youtube names
    if (item.type === "youtube") newTitle = item.title;
    
    return { ...item, title: newTitle };
  });

  // Promote Fenix Beach Party Videos to the very top row seamlessly below Youtube
  const youtubeItems = items.filter(i => i.type === "youtube");
  const fenixVideos = items.filter(i => i.eventName === "Colombia Experience" && i.type === "video");
  const rest = items.filter(i => i.type !== "youtube" && !(i.eventName === "Colombia Experience" && i.type === "video"));
  
  const reordered = [...youtubeItems, ...fenixVideos, ...rest];

  fs.writeFileSync('src/mediaList.js', `export const mediaItems = ${JSON.stringify(reordered, null, 2)};\n`);
  console.log('Sanitized internal JSON titles and promoted Fenix features to index 0/1.');
}
