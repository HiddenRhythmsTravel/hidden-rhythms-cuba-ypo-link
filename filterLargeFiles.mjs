import fs from 'fs';

let content = fs.readFileSync('src/mediaList.js', 'utf-8');
const match = content.match(/export const mediaItems = (\[.*\]);/s);
if (match) {
  let items = JSON.parse(match[1]);
  items = items.filter(item => !item.src.includes('Colombiaphotos_20.MOV') && !item.src.includes('YPOConference_2.mp4'));
  fs.writeFileSync('src/mediaList.js', `export const mediaItems = ${JSON.stringify(items, null, 2)};\n`);
  console.log('Removed heavy videos from the tracking array.');
}
