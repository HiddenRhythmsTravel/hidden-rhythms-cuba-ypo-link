import fs from 'fs';
import path from 'path';

const rfps = 'Media Content for RFP';
const dest = 'public/media';
const numItems = 43;

// Clean extraction folder
if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

function getAllFiles(dirPath, arrayOfFiles) {
  try {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
      if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
        arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    });
  } catch (e) {
    console.error(e);
  }
  return arrayOfFiles;
}

const allMedia = getAllFiles(rfps).filter(f => f.match(/\.(jpg|jpeg|png|mp4|mov)$/i) && !f.includes('._'));

let categorized = {};
allMedia.forEach(f => {
  const parts = f.split('/');
  const category = parts[1];
  if (!categorized[category]) categorized[category] = [];
  categorized[category].push({ file: f, size: fs.statSync(f).size });
});

let selected = [];
for (let cat in categorized) {
  categorized[cat].sort((a,b) => b.size - a.size);
  selected = selected.concat(categorized[cat].slice(0, 8)); // Ensures an even spread across destinations
}

for (let i = selected.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [selected[i], selected[j]] = [selected[j], selected[i]];
}

selected = selected.slice(0, numItems);

// Keep the two youtube embeds permanently pinned to the top of the array
const youtubeItems = [
  {
    "type": "youtube",
    "youtubeId": "g4H_3b3rkno",
    "thumb": "https://img.youtube.com/vi/g4H_3b3rkno/maxresdefault.jpg",
    "title": "Super Jam",
    "location": "Havana",
    "date": "2024",
    "eventName": "Getting Funky"
  },
  {
    "type": "youtube",
    "youtubeId": "YosQXRmBlKc",
    "thumb": "https://img.youtube.com/vi/YosQXRmBlKc/maxresdefault.jpg",
    "title": "The Dallas Assembly",
    "location": "Havana",
    "date": "2025",
    "eventName": ""
  }
];

let finalMediaList = [...youtubeItems];

selected.forEach((obj, idx) => {
  const f = obj.file;
  const parts = f.split('/');
  const rawEventName = parts[1];
  const origName = path.basename(f);
  const ext = path.extname(f);
  
  const newName = `${rawEventName.replace(/[^a-zA-Z0-9]/g, '')}_${idx}${ext}`;
  fs.copyFileSync(f, path.join(dest, newName));
  
  let item = {
    type: ext.match(/\.(mp4|mov)$/i) ? 'video' : 'image',
    src: `/media/${newName}`,
    title: origName.replace(ext, ''),
    location: '',
    date: '',
    eventName: rawEventName
  };
  
  // Re-inject pristine retagging logic mapping
  const title = item.title;
  if (rawEventName.includes('Netflix')) {
    item.eventName = 'Netflix Retreat';
    item.location = 'Havana';
    item.date = '2016';
  } 
  else if (rawEventName.includes('Vilken') || rawEventName.includes('YPO Conference')) {
    item.eventName = 'Vilken Event';
    item.location = 'Havana';
    item.date = '2019';
  }
  else if (rawEventName.includes('AUA Gala')) {
    item.eventName = 'AUA Gala';
    item.location = 'Havana';
    const year = title.match(/20\d\d/);
    item.date = year ? year[0] : '2017';
  }
  else if (rawEventName.includes('Getting Funky')) {
    item.eventName = 'Getting Funky';
    item.location = title.toLowerCase().includes('medellin') ? 'Medellín' : 'Havana';
    const year = title.match(/20\d\d/);
    item.date = year ? year[0] : '2019';
  }
  else if (rawEventName.includes('Colombia')) {
    item.eventName = 'Colombia Experience';
    if (title.toLowerCase().includes('cartagena')) item.location = 'Cartagena';
    else if (title.toLowerCase().includes('medellin') || title.toLowerCase().includes('comuna')) item.location = 'Medellín';
    else item.location = 'Colombia';
    const year = title.match(/20\d\d/);
    item.date = year ? year[0] : '2024';
  }
  else if (rawEventName.includes('Kevin')) {
    item.eventName = 'Private Client Retreat';
    item.location = 'Havana';
    item.date = '2023';
  }
  
  item.title = item.title
    .replace(/20\d\d/g, '')
    .replace(/Moment \d+/gi, '')
    .replace(/Foto Claudio Pelaez Sordo/gi, '')
    .replace(/\(\d+\)/g, '')
    .replace(/Netflix Photos- Cuba/gi, '')
    .replace(/colombia main/gi, 'Colombia')
    .replace(/Gettomg Funky in Havana Tropical/gi, 'Getting Funky')
    .replace(/Getting Funky in Havana/gi, '')
    .replace(/Getting Funky Havana/gi, '')
    .replace(/AUA Gala/gi, 'Gala')
    .replace(/  +/g, ' ')
    .replace(/^[-\s,]+|[-\s,]+$/g, ''); 
    
  if (!item.title || item.title.trim() === '') {
    item.title = item.eventName;
  }
  
  finalMediaList.push(item);
});

// Since we deleted public/media, we MUST copy the Selva Beat background music back!
if (fs.existsSync('Selva Beat🔥 - AFROBEAT x CUMBIA Colombiana Instrumental  #afrocumbia 2026 🇨🇴 - Andry Øz Beats.mp3')) {
  fs.copyFileSync('Selva Beat🔥 - AFROBEAT x CUMBIA Colombiana Instrumental  #afrocumbia 2026 🇨🇴 - Andry Øz Beats.mp3', path.join(dest, 'background.mp3'));
}

const fileContent = `export const mediaItems = ${JSON.stringify(finalMediaList, null, 2)};\n`;
fs.writeFileSync('src/mediaList.js', fileContent);
console.log(`Generated mediaList.js with ${finalMediaList.length} total curated items!`);
