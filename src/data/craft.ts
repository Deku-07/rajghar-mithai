export interface CraftChapter {
  id: string;
  chapterNo: string;
  title: string;
  subtitle: string;
  narrative: string;
  detailMetric: string;
  image: string;
  tools: string[];
}

export const CRAFT_CHAPTERS: CraftChapter[] = [
  {
    id: 'ingredients',
    chapterNo: 'CHAPTER I',
    title: 'Sacred Provenance',
    subtitle: 'Single-Origin Saffron, Pistachios & Estate Cashews',
    narrative:
      'Every confection begins months before the hearth is lit. Crimson Mongra saffron threads from Pampore, emerald pistachios harvested early in Kerman, and whole W180 Goan cashews are hand-sorted under magnifying lenses inside our Jaipur vault.',
    detailMetric: '0.02% Saffron Grade · Harvest 2026',
    image: '/images/craft-ingredients.jpg',
    tools: ['Hand-beaten Brass Bowls', 'Single-Estate Sorting', 'Cold-Press Grinding'],
  },
  {
    id: 'copper',
    chapterNo: 'CHAPTER II',
    title: 'Heavy Copper & Slow Ember',
    subtitle: 'Four-Hour Khoya Reduction in Hammered Kadhais',
    narrative:
      'Fresh morning A2 milk enters heavy tin-lined copper kadhais prized for unmatched thermal symmetry. Master halwais stir continuously with curved brass khuntis, coaxing sugars to caramelize naturally without scorching a single drop.',
    detailMetric: '4 Hours Continuous Reduction · 92°C',
    image: '/images/craft-copper.jpg',
    tools: ['Hammered Copper Kadhai', 'Curved Brass Khunti', 'Slow Wood-Ember Hearth'],
  },
  {
    id: 'finishing',
    chapterNo: 'CHAPTER III',
    title: 'Marble Tempering & Silver Varq',
    subtitle: 'Hand-Cut Precision & Velvet Coffret Sealing',
    narrative:
      'On cooled Makrana marble slabs, cashew and pistachio pastes are kneaded to silk sheen and diamond-cut by brass guide blades. Sheets of gossamer chandi varq are laid by breath alone before each sweet rests inside maroon velvet coffrets.',
    detailMetric: '4.5mm Exact Profile · 24K & Pure Silver Leaf',
    image: '/images/mithai-kaju-katli.jpg',
    tools: ['Makrana Marble Slab', 'Brass Cutting Scales', 'Maroon Velvet Coffrets'],
  },
];

export interface HotspotInfo {
  id: string;
  label: string;
  title: string;
  description: string;
  metric: string;
  anchor3D: [number, number, number];
}

export const SIGNATURE_HOTSPOTS: HotspotInfo[] = [
  {
    id: 'varq',
    label: '01 / CHANDI VARQ',
    title: 'Hand-Beaten Edible Silver Leaf',
    description:
      '99.9% pure vegetarian silver leaf beaten between parchment for six hours until thinner than morning mist, lending ceremonial luminosity.',
    metric: '0.2 Microns · 100% Vegetarian',
    anchor3D: [0.35, 0.34, 0.2],
  },
  {
    id: 'cashew',
    label: '02 / W180 GOAN CASHEW',
    title: 'Stone-Ground Single-Origin Paste',
    description:
      'Whole jumbo coastal cashews stone-milled chilled at low RPM so natural butter oils never separate, yielding our signature melt-in-mouth satin crumb.',
    metric: '78% Nut Content · Zero Flour',
    anchor3D: [-0.75, 0.08, 0.35],
  },
  {
    id: 'saffron',
    label: '03 / PAMPORE MONGRA KESAR',
    title: 'Crimson Kashmiri Saffron Threads',
    description:
      'Only the deep crimson stigma tips are steeped in warm Kannauj rosewater before being folded into the syrup and crowned atop every diamond.',
    metric: 'Crocin > 240 · Pampore Valley',
    anchor3D: [0.95, 0.62, -0.15],
  },
  {
    id: 'pistachio',
    label: '04 / EMERALD PISTACHIO & ALMOND',
    title: 'Orbiting Botanical Aromatics',
    description:
      'Toasted Iranian emerald pistachio slivers and Kashmiri Mamra almonds punctuate the creamy cashew sweetness with crisp roasted depth.',
    metric: 'Unbleached Early Harvest',
    anchor3D: [-1.05, -0.45, 0.45],
  },
];
