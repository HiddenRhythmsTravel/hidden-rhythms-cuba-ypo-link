import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath, arrayOfFiles) {
  try {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    });
  } catch (e) {
    console.error(e);
  }
  return arrayOfFiles;
}

const allMedia = getAllFiles('public/slideshow').filter(f => f.match(/\.(jpg|jpeg|png|webp|mp4|mov)$/i));

// Shuffle the array so the slideshow feels dynamic
for (let i = allMedia.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allMedia[i], allMedia[j]] = [allMedia[j], allMedia[i]];
}

// Slice to 100 max to avoid extreme dom bloat in the carousel
const selectedMedia = allMedia.slice(0, 100);

const items = selectedMedia.map(f => {
  return { src: f.replace('public', '') };
});

const fileContent = `export const slideshowItems = ${JSON.stringify(items, null, 2)};\n`;
fs.writeFileSync('src/slideshowList.js', fileContent);
console.log(`Generated ${items.length} slideshow items!`);
