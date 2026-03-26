import fs from 'fs';

let content = fs.readFileSync('src/mediaList.js', 'utf-8');
const match = content.match(/export const mediaItems = (\[.*\]);/s);
if (match) {
  let items = JSON.parse(match[1]);
  items = items.filter(item => !item.src || (!item.src.includes('Colombiaphotos_20.MOV') && !item.src.includes('YPOConference_2.mp4')));
  fs.writeFileSync('src/mediaList.js', `export const mediaItems = ${JSON.stringify(items, null, 2)};\n`);
}

let ig = '';
if (fs.existsSync('.gitignore')) ig = fs.readFileSync('.gitignore', 'utf8');
if (!ig.includes('Media Content for RFP')) ig += '\nMedia Content for RFP/\n';
if (!ig.includes('node_modules')) ig += 'node_modules/\n';
fs.writeFileSync('.gitignore', ig);
console.log('Successfully filtered large assets and patched .gitignore natively.');
