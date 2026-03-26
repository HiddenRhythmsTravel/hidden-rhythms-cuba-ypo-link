import fs from 'fs';
import path from 'path';

const sourceBase = 'public/New Media/Media for RFP';
const destBase = 'public/modules_clean';

if (fs.existsSync(destBase)) fs.rmSync(destBase, { recursive: true, force: true });
fs.mkdirSync(destBase, { recursive: true });

function getAllFiles(dirPath) {
  let arrayOfFiles = [];
  try {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    files.forEach(function(file) {
      if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
        arrayOfFiles = arrayOfFiles.concat(getAllFiles(path.join(dirPath, file)));
      } else {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    });
  } catch (e) {
    console.error(e);
  }
  return arrayOfFiles;
}

const getFilteredFiles = (folderName, maxCount) => {
  const folderPath = path.join(sourceBase, folderName);
  let files = getAllFiles(folderPath).filter(f => f.match(/\.(jpg|jpeg|png|mp4|mov)$/i) && !f.includes('._'));
  
  // Exclude massive video files to protect GitHub/Vercel thresholds
  files = files.filter(f => fs.statSync(f).size < 80 * 1024 * 1024);
  
  // Shuffle strictly
  for (let i = files.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [files[i], files[j]] = [files[j], files[i]];
  }
  return files.slice(0, maxCount);
};

const boxData = [
  {
    id: "box1",
    folderMatching: "1. YPO Regional Conference",
    max: 25,
    title: "YPO Mid Atlantic Regional Conference, 2019",
    description: "A five-day program in Havana, Cuba for 250 CEOs from the Mid-Atlantic region, combining educational sessions, immersive cultural experiences, evenings with top-tier entertainment across Havana's most iconic venues and \"only in YPO\" access to Cuban thought leaders and cultural figures. Hidden Rhythms managed all aspects of the conference, including lodging, meetings, transportation, guides, and curated cultural and educational programming."
  },
  {
    id: "box2",
    folderMatching: "2. Jetsetting Private Client Event",
    max: 20,
    title: "Jet-setting Private Client Event, 2019",
    description: "An incredibly bespoke, highly-curated luxury immersion tailored explicitly for jet-setting private clients. Features premium access to exclusive venues, private concerts, high-end culinary experiences, and uncompromised VIP treatment throughout the tropical destination."
  },
  {
    id: "box3",
    folderMatching: "3. Medellin Funk Expedition",
    max: 15,
    title: "Medellin Funk Expedition, 2025",
    description: "Eighty person, high-end cultural trip to Medellin, Colombia in October 2025. Hidden Rhythms handled lodging, transportation, meals and program curation and implementation for a group of visiting Americans interested in behind-the-scenes access to Colombian music and art."
  },
  {
    id: "box4",
    folderMatching: "4. The Dallas Assembly",
    max: 25,
    title: "The Dallas Assembly Event, 2025",
    description: "Policy and business focused trip to Havana, Cuba for 175 thought leaders from Dallas, Texas in January 2025. Hidden Rhythms handled all aspects of the conference, including lodging, transportation, meals, socials and educational and cultural experiences, unlocking access to Cuba's top venues, thought leaders, politicians and artists."
  },
  {
    id: "box5",
    folderMatching: "5. Netflix",
    max: 30,
    title: "Netflix Executive Retreat, 500 Person Event, 2016",
    description: "Three day, 30-person Executive Retreat for the Netflix founder, board and top executives, followed by a three day Quarterly Business Review for 500 global Netflix team members from 20+ countries and 6 continents. Hidden Rhythms handled all aspects of both events, including two dozen private flights, nightly socials with Cuban guests for 1000-2000 people, full team meetings, breakout sessions, meals, transportation, lodging and the development of offline apps for the event to deal with limited connectivity in Cuba at the time."
  },
  {
    id: "box6",
    folderMatching: "6. Getting Funky in Havana",
    max: 20,
    title: "Getting Funky in Havana, 2020-2026",
    description: "High-end, high-impact cultural exchange trip for VIP music fans, music executives and philanthropists. Each January Hidden Rhythms brings 250 VIP travelers, 60+ tier American Artists and 5-10 journalists to Cuba for a long weekend of jam sessions, intimate rooftop concerts, master classes at music schools, curated meals, panel discussions and cultural experiences and simultaneously produces a 4-night music festival that draws 5-20,000 people each night. Hidden Rhythms handles all elements of both projects, white glove experience for the VIP travelers and artists and a top-notch music festival, Getting Funky in Havana, that will celebrate its 5th edition in 2027."
  }
];

const finalExport = [];

boxData.forEach((box, moduleIndex) => {
  const rawFiles = getFilteredFiles(box.folderMatching, box.max);
  const webItems = [];
  
  const modDir = path.join(destBase, box.id);
  fs.mkdirSync(modDir, { recursive: true });
  
  rawFiles.forEach((f, idx) => {
    const ext = path.extname(f);
    const newName = `${box.id}_img_${idx}${ext}`;
    const newPath = path.join(modDir, newName);
    
    fs.copyFileSync(f, newPath);
    
    webItems.push({
      type: ext.match(/\.(mp4|mov)$/i) ? 'video' : 'image',
      src: `/modules_clean/${box.id}/${newName}`,
      title: box.title
    });
  });
  
  finalExport.push({
    id: box.id,
    index: String(moduleIndex + 1).padStart(2, '0'),
    title: box.title,
    description: box.description,
    items: webItems
  });
});

const fileContent = `export const sixModulesData = ${JSON.stringify(finalExport, null, 2)};\n`;
fs.writeFileSync('src/sixModulesData.js', fileContent);

let ig = '';
if (fs.existsSync('.gitignore')) ig = fs.readFileSync('.gitignore', 'utf8');
if (!ig.includes('public/New Media/')) ig += '\npublic/New Media/\n';
fs.writeFileSync('.gitignore', ig);

console.log('Successfully orchestrated precisely 6 layout modules extracting optimal imagery perfectly!');
