/**
 * Image Registry and Mapping for HRS Group
 * 
 * Maps entity slugs, projects, and contextual captions to real 35mm editorial WebP imagery.
 */

import { getAssetPath } from '@/lib/assets';

export interface ImageMeta {
  src: string;
  alt: string;
}

const rawImageRegistry: Record<string, ImageMeta> = {
  // Group & Corporate
  'group-skyline': {
    src: '/images/group/ahmedabad-skyline.webp',
    alt: 'Ahmedabad Sabarmati riverfront skyline with contemporary glazed commercial facades in golden hour light',
  },
  'corporate-lobby': {
    src: '/images/group/corporate-lobby.webp',
    alt: 'Travertine stone corporate architectural lobby with double-height glazing and minimalist timber desk',
  },

  // Built Environment
  'hrishikesh-ventures': {
    src: '/images/hrishikesh-ventures/residential-tower.webp',
    alt: 'Sandstone residential apartment tower facade and contemporary villa pavilion in warm afternoon light',
  },
  'h2-residential': {
    src: '/images/hrishikesh-ventures/h2-residential.webp',
    alt: 'H2 residential development in Shela, Ahmedabad with limestone facades, bronze aluminium mullions, and courtyard',
  },
  'hrs-aluglaze': {
    src: '/images/hrs-aluglaze/curtain-wall-detail.webp',
    alt: 'Precision unitized aluminium and glass curtain wall facade detail with structural mullion joints',
  },
  'sanand-campus': {
    src: '/images/hrs-aluglaze/sanand-campus.webp',
    alt: 'Sanand industrial engineering and manufacturing campus facade with precision steel and architectural glass',
  },
  'geotrix': {
    src: '/images/geotrix/window-frames-section.webp',
    alt: 'Architectural cross-section of high-performance aluminium window and facade profiles on smooth concrete',
  },
  'school-of-facade-technologies': {
    src: '/images/school-of-facade-technologies/workshop-benches.webp',
    alt: 'Technical training workshop for facade engineering with timber workbenches and aluminium window mockups',
  },

  // Food and Consumer
  'hrishikesh-food-products': {
    src: '/images/hrishikesh-food-products/whole-spices-stone.webp',
    alt: 'Collection of whole Indian spices, coriander seeds, cumin seeds, and turmeric roots on dark slate stone slab',
  },
  'hrishikesh-consumer-products': {
    src: '/images/hrishikesh-consumer-products/manpras-store.webp',
    alt: 'Modern neighbourhood grocery store interior with clean wooden shelves stocked with artisanal staples',
  },
  'manpras': {
    src: '/images/hrishikesh-consumer-products/manpras-store.webp',
    alt: 'Manpras retail neighbourhood grocery store with wooden shelving and pantry dry goods',
  },

  // Hospitality, Leasing & Retail
  'firstgen': {
    src: '/images/firstgen/service-apartment.webp',
    alt: 'High-end service apartment living room in Bengaluru with teak wood credenza and window overlooking garden canopy',
  },
  'firstgen-hotels': {
    src: '/images/firstgen/south-indian-breakfast.webp',
    alt: 'South Indian breakfast with crisp dosa, rava idli, and chutneys served on fresh banana leaf',
  },
  'firstgen-assets': {
    src: '/images/firstgen/service-apartment.webp',
    alt: 'Commercial leasing and residential asset interiors with natural light and refined finishes',
  },
  'firstgen-enterprises': {
    src: '/images/firstgen/service-apartment.webp',
    alt: 'Hospitality and enterprise retail interiors with contemporary timber details',
  },

  // Services
  'indian-brand-house': {
    src: '/images/indian-brand-house/studio-desk.webp',
    alt: 'Graphic design studio table with printed brand guideline books, fine paper swatches, and typographic layout boards',
  },
};

export const imageRegistry: Record<string, ImageMeta> = Object.fromEntries(
  Object.entries(rawImageRegistry).map(([key, meta]) => [
    key,
    { ...meta, src: getAssetPath(meta.src) },
  ])
);

/**
 * Resolve image source and alt text from explicit props or contextual caption/keywords
 */
export function resolveImage(explicitSrc?: string, caption?: string, altProp?: string): ImageMeta | null {
  if (explicitSrc) {
    return {
      src: getAssetPath(explicitSrc),
      alt: altProp || caption || 'HRS Group photography representation',
    };
  }

  if (!caption) {
    return null;
  }

  const lower = caption.toLowerCase();

  // Match by caption keywords
  if (lower.includes('ahmedabad headquarters') || lower.includes('sg highway and regional') || lower.includes('regional manufacturing')) {
    return imageRegistry['group-skyline'];
  }
  if (lower.includes('corporate offices on sg highway') || lower.includes('governance and project allocations')) {
    return imageRegistry['corporate-lobby'];
  }
  if (lower.includes('hrishikesh ventures') || lower.includes('residential development')) {
    return imageRegistry['hrishikesh-ventures'];
  }
  if (lower.includes('aluglaze') || lower.includes('glazing') || lower.includes('curtain wall')) {
    return imageRegistry['hrs-aluglaze'];
  }
  if (lower.includes('geotrix') || lower.includes('window frames')) {
    return imageRegistry['geotrix'];
  }
  if (lower.includes('facade technologies') || lower.includes('soft') || lower.includes('training')) {
    return imageRegistry['school-of-facade-technologies'];
  }
  if (lower.includes('food products') || lower.includes('spice') || lower.includes('masala')) {
    return imageRegistry['hrishikesh-food-products'];
  }
  if (lower.includes('consumer products') || lower.includes('manpras') || lower.includes('retail grocery')) {
    return imageRegistry['manpras'];
  }
  if (lower.includes('hotel') || lower.includes('breakfast') || lower.includes('amuktamalyada')) {
    return imageRegistry['firstgen-hotels'];
  }
  if (lower.includes('firstgen') || lower.includes('service apartment') || lower.includes('leasing')) {
    return imageRegistry['firstgen'];
  }
  if (lower.includes('brand house') || lower.includes('identity') || lower.includes('design studio')) {
    return imageRegistry['indian-brand-house'];
  }

  return null;
}
