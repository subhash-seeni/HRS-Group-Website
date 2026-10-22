const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/SUBHASH/.gemini/antigravity-ide/brain/cfd5d36e-91bc-4cbe-954f-3e039a5b228b';

const images = [
  { src: 'ahmedabad_skyline_test_1792599037250.jpg', dest: 'public/images/group/ahmedabad-skyline.webp' },
  { src: 'corporate_lobby_1792599360258.jpg', dest: 'public/images/group/corporate-lobby.webp' },
  { src: 'residential_tower_1792599380839.jpg', dest: 'public/images/hrishikesh-ventures/residential-tower.webp' },
  { src: 'h2_residential_1792599567702.jpg', dest: 'public/images/hrishikesh-ventures/h2-residential.webp' },
  { src: 'curtain_wall_1792599404870.jpg', dest: 'public/images/hrs-aluglaze/curtain-wall-detail.webp' },
  { src: 'sanand_campus_1792599593419.jpg', dest: 'public/images/hrs-aluglaze/sanand-campus.webp' },
  { src: 'window_frames_1792599425449.jpg', dest: 'public/images/geotrix/window-frames-section.webp' },
  { src: 'workshop_benches_1792599446471.jpg', dest: 'public/images/school-of-facade-technologies/workshop-benches.webp' },
  { src: 'whole_spices_1792599471483.jpg', dest: 'public/images/hrishikesh-food-products/whole-spices-stone.webp' },
  { src: 'manpras_grocery_1792599494083.jpg', dest: 'public/images/hrishikesh-consumer-products/manpras-store.webp' },
  { src: 'service_apartment_1792599520720.jpg', dest: 'public/images/firstgen/service-apartment.webp' },
  { src: 'south_indian_breakfast_1792599630828.jpg', dest: 'public/images/firstgen/south-indian-breakfast.webp' },
  { src: 'studio_desk_1792599538194.jpg', dest: 'public/images/indian-brand-house/studio-desk.webp' },
];

async function convertAll() {
  for (const img of images) {
    const srcPath = path.join(brainDir, img.src);
    const destDir = path.dirname(img.dest);
    fs.mkdirSync(destDir, { recursive: true });
    if (fs.existsSync(srcPath)) {
      const info = await sharp(srcPath)
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(img.dest);
      console.log('Converted:', img.dest, Math.round(info.size / 1024) + ' KB');
    } else {
      console.error('Missing source:', srcPath);
    }
  }
}

convertAll();
