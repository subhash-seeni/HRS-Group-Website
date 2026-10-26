import { SceneDefinition } from '../types';
import { drawFacades } from './facades';
import { drawHomes } from './homes';
import { drawMasalas } from './masalas';
import { drawBrands } from './brands';
import { drawStays } from './stays';
import { drawSkills } from './skills';
import { drawRetail } from './retail';

export {
  drawFacades,
  drawHomes,
  drawMasalas,
  drawBrands,
  drawStays,
  drawSkills,
  drawRetail,
};

export const scenes: SceneDefinition[] = [
  {
    id: 'facades',
    word: 'facades',
    title: 'Curtain-Wall Elevation',
    description: 'Tall curtain wall elevation with mullions, transoms, glare reflections, projecting casement window, and base brackets.',
    color: '#F58220', // HRS orange
    draw: drawFacades,
  },
  {
    id: 'homes',
    word: 'homes',
    title: 'Villa Elevation & Garden Tree',
    description: 'Pitched roof villa elevation with gabled fascia, chimney, ocular attic window, front door with stepped entrance, and garden tree.',
    color: '#A84325', // Warm terracotta
    draw: drawHomes,
  },
  {
    id: 'masalas',
    word: 'masalas',
    title: 'Botanical Spice Processing',
    description: 'Three graduated spice jars with fitted lids and botanical labels, heavy stone mortar and pestle, small bowl with tasting spoon, and cinnamon sticks.',
    color: '#D99400', // Rich turmeric gold
    draw: drawMasalas,
  },
  {
    id: 'brands',
    word: 'brands',
    title: 'Consumer Packaged Goods',
    description: 'Three stacked cartons in oblique projection, fluted bottle with ribbed cap, snack pouch with serrated zigzag seal, and price tag with string loop.',
    color: '#154D28', // Forest green
    draw: drawBrands,
  },
  {
    id: 'stays',
    word: 'stays',
    title: 'Hospitality Suite & Bed',
    description: 'Hotel bed with channeled headboard, duvet fold and plush pillows, bedside nightstand with shaded table lamp, and window with draped curtains.',
    color: '#0D565C', // Coastal teal
    draw: drawStays,
  },
  {
    id: 'skills',
    word: 'skills',
    title: 'Technical Education & Craft',
    description: 'Open technical textbook with leaf layers, construction hard hat with structural ridge, precision set square, and drafting pencil.',
    color: '#274B76', // Cadet blue
    draw: drawSkills,
  },
  {
    id: 'retail',
    word: 'retail',
    title: 'Multi-Format Retail Storefront',
    description: 'Storefront with striped scalloped awning, entrance door, display window with stocked shelves, and wireframe shopping basket.',
    color: '#0F2A5C', // BOGO navy
    draw: drawRetail,
  },
];
