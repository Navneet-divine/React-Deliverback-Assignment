export interface GiftItem {
  id: string
  title: string
  price: number
  rating: number
  reviewCount: number
  category: 'funny' | 'best' | 'secret-santa' | 'under-15' | 'under-25'
  badge: string
  description: string
  whyItSteals: string
  emoji: string
  tags: string[]
  affiliateUrl?: string
  imageUrl?: string
}

export const GIFTS_DATA: GiftItem[] = [
  {
    id: 'burrito-blanket',
    title: 'Giant 71-Inch Realistic Tortilla Burrito Blanket',
    price: 18.99,
    rating: 4.8,
    reviewCount: 42300,
    category: 'funny',
    badge: '🔥 Viral Favorite',
    description: 'Double-sided giant flour tortilla fleece blanket. Roll yourself or a coworker into a human burrito for ultimate cozy laughs.',
    whyItSteals: 'Always gets stolen at least twice because it looks hilarious but is surprisingly soft and warm.',
    emoji: '🌯',
    tags: ['funny', 'under-25', 'cozy', 'coworker-safe']
  },
  {
    id: 'desktop-vacuum',
    title: 'Mini Portable Mushroom Desktop Vacuum Cleaner',
    price: 13.99,
    rating: 4.6,
    reviewCount: 18500,
    category: 'under-15',
    badge: '⭐ Office Hit',
    description: 'Battery-powered desktop vacuum that quickly sweeps cookie crumbs, eraser shavings, and dust off any desk in seconds.',
    whyItSteals: 'Actually practical for any office worker or snack enthusiast—super cute on a desk.',
    emoji: '🍄',
    tags: ['best', 'under-15', 'office', 'practical']
  },
  {
    id: 'bob-ross-toaster',
    title: 'Bob Ross "Happy Little Trees" 2-Slice Toaster',
    price: 24.99,
    rating: 4.9,
    reviewCount: 11200,
    category: 'funny',
    badge: '😂 Top Gag',
    description: 'Burns Bob Ross\'s iconic smiling face and afro onto every piece of toast you make in the morning.',
    whyItSteals: 'Immediate laughter when unwrapped; people will fight over who gets to make happy toast.',
    emoji: '🍞',
    tags: ['funny', 'under-25', 'best']
  },
  {
    id: 'yeti-rambler-mug',
    title: 'YETI Rambler 14 oz Insulated Camp Mug with MagSlider',
    price: 24.95,
    rating: 4.9,
    reviewCount: 68000,
    category: 'best',
    badge: '👑 Most Stolen',
    description: 'Double-wall vacuum-insulated stainless steel mug that keeps coffee piping hot for hours or cocktails ice cold.',
    whyItSteals: 'The undisputed king of White Elephant exchanges. It almost always hits the maximum 3-steal limit.',
    emoji: '☕',
    tags: ['best', 'under-25', 'crowd-pleaser', 'practical']
  },
  {
    id: 'screaming-goat',
    title: 'The Screaming Goat Desktop Figurine with Book',
    price: 11.95,
    rating: 4.7,
    reviewCount: 35400,
    category: 'under-15',
    badge: '🐐 Classic Gag',
    description: 'Press the tree stump to hear the viral high-pitched human scream. Comes with a 32-page illustrated goat fact booklet.',
    whyItSteals: 'The quintessential $12 party gift that gets pressed 50 times during the party.',
    emoji: '🐐',
    tags: ['funny', 'under-15', 'gag']
  },
  {
    id: 'fidget-pen',
    title: 'Magnetic Polar Fidget Pen with Stylus & Beads',
    price: 16.99,
    rating: 4.5,
    reviewCount: 9400,
    category: 'secret-santa',
    badge: '🎯 Secret Santa Pick',
    description: 'Deconstructable magnetic pen that transforms into geometric sculptures, swords, robots, and fidget toys.',
    whyItSteals: 'Great for anyone who taps pens or gets bored in long Zoom meetings.',
    emoji: '🖊️',
    tags: ['secret-santa', 'under-25', 'gadget']
  },
  {
    id: 'waffle-maker',
    title: 'Dash Mini Waffle Maker for Quick 4-Inch Waffles',
    price: 12.99,
    rating: 4.8,
    reviewCount: 215000,
    category: 'best',
    badge: '🧇 Best Value',
    description: 'Compact non-stick mini waffle iron that makes waffles, paninis, hash browns, and biscuit pizzas in 3 minutes.',
    whyItSteals: 'Over 200,000 5-star reviews on Amazon. Everyone loves breakfast food.',
    emoji: '🧇',
    tags: ['best', 'under-15', 'under-25', 'food']
  },
  {
    id: 'bacon-scented-candle',
    title: 'Sizzling Crispy Maple Bacon Soy Wax Candle',
    price: 15.99,
    rating: 4.4,
    reviewCount: 6200,
    category: 'funny',
    badge: '🥓 Quirky Choice',
    description: '100% natural soy wax candle that fills the entire living room with the mouthwatering smell of Sunday morning skillet bacon.',
    whyItSteals: 'Hilarious to open, but bacon lovers will genuinely conspire to steal it.',
    emoji: '🥓',
    tags: ['funny', 'under-25', 'quirky']
  },
  {
    id: 'aeropress-go',
    title: 'AeroPress Go Portable Travel Coffee Press',
    price: 24.95,
    rating: 4.9,
    reviewCount: 31000,
    category: 'best',
    badge: '⭐ Coffee Snob Winner',
    description: 'Brews smooth, rich, grit-free espresso-style coffee in 1 minute. Packs into its own drinking mug.',
    whyItSteals: 'Coffee lovers in the room will aggressively steal this from whoever opened it.',
    emoji: '☕',
    tags: ['best', 'under-25', 'coffee', 'secret-santa', 'practical']
  },
  {
    id: 'baguette-slippers',
    title: 'Memory Foam French Bread Baguette Plush Slippers',
    price: 19.99,
    rating: 4.7,
    reviewCount: 14800,
    category: 'funny',
    badge: '🥖 Cozy & Funny',
    description: 'Slip your feet into warm, ultra-padded golden baked baguettes. Anti-skid rubber sole with memory foam cushion.',
    whyItSteals: 'Equal parts ridiculous and undeniably comfortable. Everyone wants to try them on.',
    emoji: '🥖',
    tags: ['funny', 'under-25', 'cozy']
  },
  {
    id: 'gourmet-hot-sauce',
    title: 'TRUFF Original Black Truffle Infused Hot Sauce',
    price: 17.98,
    rating: 4.6,
    reviewCount: 29500,
    category: 'secret-santa',
    badge: '🌶️ Luxe Pick',
    description: 'A curated blend of ripe chili peppers, real black winter truffle, and organic agave nectar. Beautiful matte bottle.',
    whyItSteals: 'High perceived value—feels luxurious and makes everyday pizza or eggs taste like high-end dining.',
    emoji: '🌶️',
    tags: ['secret-santa', 'best', 'under-25', 'food']
  },
  {
    id: 'bluetooth-shower-speaker',
    title: 'IPX7 Waterproof Bluetooth Speaker with Suction Cup',
    price: 21.99,
    rating: 4.7,
    reviewCount: 48000,
    category: 'best',
    badge: '🎵 Shower Singer',
    description: '100% waterproof speaker with rich bass, hands-free mic, LED mood lights, and 12-hour playtime.',
    whyItSteals: 'Universal appeal across all ages—who doesn’t like listening to podcasts or music in the shower?',
    emoji: '🚿',
    tags: ['best', 'under-25', 'tech']
  }
]

export interface KeywordStat {
  keyword: string
  volume: string
  highlight: string
  path: string
}

export const SEARCH_KEYWORD_STATS: KeywordStat[] = [
  { keyword: 'white elephant gift ideas', volume: '1.22M', highlight: 'Most Searched Query', path: '/' },
  { keyword: 'white elephant rules', volume: '450K', highlight: 'Top Game Question', path: '/rules' },
  { keyword: 'white elephant gifts', volume: '246K', highlight: 'Shopper Intent', path: '/?category=all#gifts' },
  { keyword: 'funny white elephant gifts', volume: '201K', highlight: 'Gag & Laughs', path: '/?category=funny#gifts' },
  { keyword: 'best white elephant gifts', volume: '201K', highlight: 'Crowd Pleasers', path: '/?category=best#gifts' },
  { keyword: 'secret santa gift ideas', volume: '135K', highlight: 'Holiday Classic', path: '/secret-santa' },
]
