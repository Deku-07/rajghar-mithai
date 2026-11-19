export type MithaiCategory =
  | 'All Mithai'
  | 'Kaju'
  | 'Ghee & Ladoo'
  | 'Milk & Khoya'
  | 'Pista & Dry Fruit'
  | 'Seasonal Specialities';

export interface WeightOption {
  label: string;
  grams: number;
  price: number;
}

export interface MithaiProduct {
  id: string;
  archiveNo: string;
  name: string;
  subtitle: string;
  category: Exclude<MithaiCategory, 'All Mithai'>;
  shortDesc: string;
  editorialStory: string;
  price: number;
  weightOptions: WeightOption[];
  image: string;
  ingredients: string[];
  origin: string;
  tastingNotes: string[];
  craftDuration: string;
  shelfNote: string;
  pedestalOffset: 'tall' | 'medium' | 'low';
  featuredBadge?: string;
}

export const MITHAI_CATEGORIES: MithaiCategory[] = [
  'All Mithai',
  'Kaju',
  'Ghee & Ladoo',
  'Milk & Khoya',
  'Pista & Dry Fruit',
  'Seasonal Specialities',
];

export const MITHAI_PRODUCTS: MithaiProduct[] = [
  {
    id: 'royal-kaju-katli',
    archiveNo: 'RG — 01',
    name: 'Royal Kaju Katli',
    subtitle: 'Goan W180 Cashew & 24K Chandi Varq',
    category: 'Kaju',
    shortDesc:
      'Silky single-origin Goan cashew fudge hand-rolled on cooled Makrana marble and veiled in pure edible silver leaf.',
    editorialStory:
      'Crafted from whole W180 estate cashews stone-ground at dawn to preserve their natural ivory oils. Gently folded with single-thread cardamom syrup, rolled to an exact 4.5 mm profile on Makrana marble, and crowned with hand-beaten vegetarian chandi varq.',
    price: 1650,
    weightOptions: [
      { label: '250g Jewel Coffret', grams: 250, price: 1650 },
      { label: '500g Sovereign Box', grams: 500, price: 3150 },
      { label: '1kg Darbar Chest', grams: 1000, price: 6100 },
    ],
    image: '/images/mithai-kaju-katli.jpg',
    ingredients: [
      'W180 Goan Cashew Kernels (78%)',
      'Raw Cane Sugar',
      'Pampore Mongra Saffron',
      'Pure Edible Silver Leaf (Chandi Varq)',
      'Rosewater Hydrosol',
    ],
    origin: 'Goa Coast & Jaipur Atelier',
    tastingNotes: ['Velvety Ivory Cream', 'Toasted Nutty Finish', 'Subtle Rose Mist'],
    craftDuration: '14 Hours',
    shelfNote: 'Best savoured within 12 days in cool dry storage.',
    pedestalOffset: 'tall',
    featuredBadge: 'House Crown Jewel',
  },
  {
    id: 'motichoor-ladoo',
    archiveNo: 'RG — 02',
    name: 'Pure Desi Ghee Motichoor Ladoo',
    subtitle: 'Hand-Dropped Saffron Boondi Pearls',
    category: 'Ghee & Ladoo',
    shortDesc:
      'Microscopic pearls of heirloom gram flour fried in cultured A2 Gir cow ghee, steeped in saffron-cardamom nectar.',
    editorialStory:
      'Passed through hand-forged brass jharas into bubbling clarified Gir cow ghee, each luminous pearl is infused with Kashmiri saffron syrup and hand-bound while warm with toasted magaj seeds and emerald pistachio slivers.',
    price: 1450,
    weightOptions: [
      { label: '250g Jewel Coffret', grams: 250, price: 1450 },
      { label: '500g Sovereign Box', grams: 500, price: 2750 },
      { label: '1kg Darbar Chest', grams: 1000, price: 5300 },
    ],
    image: '/images/mithai-motichoor-ladoo.jpg',
    ingredients: [
      'Cultured A2 Bilona Desi Ghee',
      'Heirloom Chana Dal Besan',
      'Kashmiri Saffron Strands',
      'Green Cardamom Seeds',
      'Roasted Melon Seeds & Iranian Pistachio',
    ],
    origin: 'Bikaner & Gir Pastures',
    tastingNotes: ['Warm Clarified Butter', 'Floral Saffron Honey', 'Crisp-Melting Pearls'],
    craftDuration: '9 Hours',
    shelfNote: 'Hand-rolled daily; enjoy within 6 days.',
    pedestalOffset: 'low',
    featuredBadge: 'Ceremonial Classic',
  },
  {
    id: 'saffron-rasmalai',
    archiveNo: 'RG — 03',
    name: 'Saffron Rasmalai',
    subtitle: 'Chhena Medallions in Kesar Rabri',
    category: 'Milk & Khoya',
    shortDesc:
      'Cloud-soft poached artisanal chhena discs resting in slow-reduced saffron milk with crushed pistachios and damask rose.',
    editorialStory:
      'Fresh morning milk is curdled with lime blossom water, kneaded by palm for forty minutes until feather-light, and poached in light syrup before resting overnight in thickened copper-kadhai kesar rabri.',
    price: 1380,
    weightOptions: [
      { label: '4 Pieces Porcelain Tin', grams: 350, price: 1380 },
      { label: '8 Pieces Royal Vessel', grams: 700, price: 2620 },
    ],
    image: '/images/mithai-saffron-rasmalai.jpg',
    ingredients: [
      'A2 Full-Cream Heritage Milk',
      'Pampore Saffron Infusion',
      'Damask Rose Petals',
      'Blanched Iranian Pistachios',
      'Malabar Cardamom',
    ],
    origin: 'Pampore & Pushkar',
    tastingNotes: ['Velvet Saffron Cream', 'Spongy Milk Curd', 'Aromatic Rose & Cardamom'],
    craftDuration: '18 Hours (Chilled Steep)',
    shelfNote: 'Served chilled; consume within 48 hours.',
    pedestalOffset: 'medium',
  },
  {
    id: 'royal-pista-barfi',
    archiveNo: 'RG — 04',
    name: 'Royal Pista Barfi',
    subtitle: 'Emerald Iranian Pistachio & Silver Leaf',
    category: 'Pista & Dry Fruit',
    shortDesc:
      'Unbleached emerald green pistachios slow-folded with artisanal mawa and crowned with delicate silver varq.',
    editorialStory:
      'Made exclusively from young harvest Iranian kernels picked for their natural jade hue and intense aroma. Never tinted with artificial colour, each square delivers pure roasted pistachio depth.',
    price: 2250,
    weightOptions: [
      { label: '250g Jewel Coffret', grams: 250, price: 2250 },
      { label: '500g Sovereign Box', grams: 500, price: 4300 },
      { label: '1kg Darbar Chest', grams: 1000, price: 8200 },
    ],
    image: '/images/mithai-pista-barfi.jpg',
    ingredients: [
      'Roasted Iranian Emerald Pistachios (68%)',
      'Slow-Reduced Artisanal Khoya',
      'Pure Cane Syrup',
      'Green Cardamom Heart',
      'Edible Silver Varq',
    ],
    origin: 'Kerman Harvest & Jaipur',
    tastingNotes: ['Intense Roasted Pistachio', 'Silky Mawa Richness', 'Clean Mineral Finish'],
    craftDuration: '11 Hours',
    shelfNote: 'Keep sealed; enjoy within 10 days.',
    pedestalOffset: 'tall',
    featuredBadge: 'Rare Harvest',
  },
  {
    id: 'traditional-gulab-jamun',
    archiveNo: 'RG — 05',
    name: 'Traditional Gulab Jamun',
    subtitle: 'Caramelized Khoya Spheres in Rose Nectar',
    category: 'Milk & Khoya',
    shortDesc:
      'Deep mahogany hand-rolled khoya spheres infused with pistachio hearts, steeped in warm Kannauj rose & cardamom syrup.',
    editorialStory:
      'Slowly bronzed in pure ghee at calibrated low heat to form a gossamer caramelized crust around an impossibly tender, saffron-speckled core.',
    price: 1290,
    weightOptions: [
      { label: '6 Pieces Brass Tin', grams: 400, price: 1290 },
      { label: '12 Pieces Feast Tin', grams: 800, price: 2420 },
    ],
    image: '/images/mithai-gulab-jamun.jpg',
    ingredients: [
      'Fresh Copper-Kadhai Khoya',
      'Kannauj Damask Rose Water',
      'Saffron & Green Cardamom Syrup',
      'Whole Pistachio Core',
      'Pure Desi Ghee',
    ],
    origin: 'Kannauj & Old Delhi Lineage',
    tastingNotes: ['Caramelized Milk Crust', 'Warm Spiced Syrup', 'Lingering Rose Mist'],
    craftDuration: '7 Hours',
    shelfNote: 'Best served slightly warmed; enjoy within 5 days.',
    pedestalOffset: 'low',
  },
  {
    id: 'kesar-peda',
    archiveNo: 'RG — 06',
    name: 'Kesar Peda',
    subtitle: 'Hand-Stamped Saffron Mawa Medallions',
    category: 'Milk & Khoya',
    shortDesc:
      'Four-hour copper-reduced golden milk fudge embossed with antique brass rosette dies and crowned with saffron strands.',
    editorialStory:
      'Every medallion carries the crest of an heirloom carved brass stamp. The milk solids are simmered over gentle embers until naturally amber and nutty before being steeped with Kashmiri kesar.',
    price: 1350,
    weightOptions: [
      { label: '250g Jewel Coffret', grams: 250, price: 1350 },
      { label: '500g Sovereign Box', grams: 500, price: 2580 },
    ],
    image: '/images/mithai-kesar-peda.jpg',
    ingredients: [
      '4-Hour Slow-Simmered Milk Solids',
      'Grade-A Kashmiri Saffron',
      'Raw Unrefined Sugar',
      'Freshly Cracked Cardamom',
      'Crushed Pistachio Garnish',
    ],
    origin: 'Mathura Tradition · Jaipur Kitchen',
    tastingNotes: ['Caramelized Dairy', 'Golden Saffron Earthiness', 'Velvet Crumb'],
    craftDuration: '10 Hours',
    shelfNote: 'Enjoy within 8 days in cool storage.',
    pedestalOffset: 'medium',
  },
  {
    id: 'premium-soan-papdi',
    archiveNo: 'RG — 07',
    name: 'Premium Soan Papdi',
    subtitle: 'Hand-Pulled Spun Ghee Gossamer Flakes',
    category: 'Ghee & Ladoo',
    shortDesc:
      'Thousand-layer gossamer sugar and gram-flour filaments hand-pulled on marble, melting instantly upon the tongue.',
    editorialStory:
      'An endurance ritual of temperature and rhythm: two master halwais stretch golden caramelized syrup and ghee-roasted besan across copper trays until thousands of micro-thin silk strands form.',
    price: 1180,
    weightOptions: [
      { label: '250g Jewel Coffret', grams: 250, price: 1180 },
      { label: '500g Sovereign Box', grams: 500, price: 2200 },
    ],
    image: '/images/mithai-soan-papdi.jpg',
    ingredients: [
      'Pure Clarified Ghee',
      'Fine Besan & Stone-Milled Flour',
      'Toasted Mamra Almond Flakes',
      'Pistachio & Cardamom Dust',
      'Saffron Threads',
    ],
    origin: 'Jaipur Royal Halwai Guild',
    tastingNotes: ['Weightless Silk Threads', 'Nutty Toasted Ghee', 'Delicate Crisp Melt'],
    craftDuration: '8 Hours',
    shelfNote: 'Hermetically sealed; stays crisp for 21 days.',
    pedestalOffset: 'tall',
  },
  {
    id: 'dry-fruit-mithai',
    archiveNo: 'RG — 08',
    name: 'Dry Fruit Mithai',
    subtitle: 'Anjeer, Mamra Badam & Roasted Pecan Jewel Roll',
    category: 'Pista & Dry Fruit',
    shortDesc:
      'Zero refined sugar confection of sun-dried Afghan figs, roasted Mamra almonds, pistachios, and edible 24K gold leaf.',
    editorialStory:
      'Sweetened solely by sun-cured Kandahari figs and wild forest honey, rolled tight with slow-toasted whole nuts in pure ghee and gilded for royal gifting.',
    price: 2100,
    weightOptions: [
      { label: '250g Jewel Coffret', grams: 250, price: 2100 },
      { label: '500g Sovereign Box', grams: 500, price: 3980 },
      { label: '1kg Darbar Chest', grams: 1000, price: 7600 },
    ],
    image: '/images/mithai-dry-fruit.jpg',
    ingredients: [
      'Sun-Cured Afghan Anjeer (Figs)',
      'Kashmiri Mamra Almonds',
      'Roasted Pistachios & Cashews',
      '24K Edible Gold Leaf',
      'Nutmeg & Green Cardamom',
    ],
    origin: 'Kabul Valley & Kashmir',
    tastingNotes: ['Rich Fig Caramel', 'Crunchy Roasted Nuts', 'Warm Spice Note'],
    craftDuration: '12 Hours',
    shelfNote: 'Naturally preserved; enjoy within 18 days.',
    pedestalOffset: 'low',
    featuredBadge: 'No Refined Sugar',
  },
  {
    id: 'seasonal-specialities',
    archiveNo: 'RG — 09',
    name: 'Seasonal Specialities',
    subtitle: 'Shahi Rose Gujiya & Winter Saffron Gond Paak',
    category: 'Seasonal Specialities',
    shortDesc:
      'Limited-edition festive creations pairing crisp ghee-layered rose gujiyas with warming winter saffron-gum paak.',
    editorialStory:
      'Composed solely during auspicious moons and harvest transitions. Our winter-festive edition unites hand-pleated gujiya filled with roasted mawa and damask gulkand alongside royal acacia-gond saffron paak.',
    price: 1890,
    weightOptions: [
      { label: '350g Festive Vault', grams: 350, price: 1890 },
      { label: '700g Maharaja Trunk', grams: 700, price: 3600 },
    ],
    image: '/images/mithai-seasonal.jpg',
    ingredients: [
      'Pushkar Damask Gulkand',
      'Edible Acacia Gond Crystals',
      'Pure Desi Ghee & Mawa',
      'Saffron & Silver Varq',
      'Slivered Pistachios & Charoli',
    ],
    origin: 'Pushkar & Udaipur',
    tastingNotes: ['Crisp Flaky Pastry', 'Warming Winter Spices', 'Floral Rose Preserves'],
    craftDuration: '16 Hours',
    shelfNote: 'Limited seasonal batch; 100 coffrets daily.',
    pedestalOffset: 'medium',
    featuredBadge: 'Limited Edition',
  },
];
