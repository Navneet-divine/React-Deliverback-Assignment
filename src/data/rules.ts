export interface RuleStep {
  step: number
  title: string
  shortDesc: string
  details: string[]
  iconName: string
  proTip: string
}

export const OFFICIAL_RULES: RuleStep[] = [
  {
    step: 1,
    title: 'The Gift Setup & Contribution',
    shortDesc: 'Each participant brings one wrapped, unmarked gift adhering to the budget limit (usually $20 - $25).',
    details: [
      'Gifts must be wrapped or bagged identically so nobody knows what is inside or who brought it.',
      'Place all gifts in a central table or pile in plain view.',
      'Establish ground rules beforehand: whether gag gifts, alcohol, or gift cards are allowed.'
    ],
    iconName: 'Gift',
    proTip: 'A $20-$25 limit hits the sweet spot between decent gadgets and hilarious high-quality gags.'
  },
  {
    step: 2,
    title: 'Draw Numbers to Determine Turn Order',
    shortDesc: 'Place numbers 1 through N (where N is the number of players) into a hat. Everyone draws one.',
    details: [
      'Player #1 goes first, Player #2 goes second, up to Player #N.',
      'Keep your number visible or announce it to the group.',
      'Hold tight if you drew #1: you get the ultimate special advantage at the very end of the game!'
    ],
    iconName: 'ListOrdered',
    proTip: 'Use our built-in Digital Number Drawer below if you forgot paper slips!'
  },
  {
    step: 3,
    title: 'Player 1 Opens the First Gift',
    shortDesc: 'The first player selects any wrapped gift from the pile, unwraps it, and shows it to everyone.',
    details: [
      'No stealing is possible in turn 1 because only one gift has been revealed.',
      'Hold up the gift and read what it is so everyone can see.',
      'The gift now enters the "active open pool".'
    ],
    iconName: 'Sparkles',
    proTip: 'React enthusiastically even if you opened a weird pair of socks—it builds the party energy!'
  },
  {
    step: 4,
    title: 'Player 2 & Subsequent Turns: Unbox or Steal!',
    shortDesc: 'Starting with Player 2, each player has a big choice: steal an already-opened gift or unwrap a fresh one.',
    details: [
      'Choice A: Steal any opened gift from another player.',
      'Choice B: Pick an unknown wrapped gift from the pile and unwrap it.',
      'If your gift is stolen: you immediately get to either steal another eligible open gift, or open a fresh gift from the pile.',
      'No Immediate Steal-Back Rule: You cannot immediately steal back the exact gift that was just taken from you in that same turn.'
    ],
    iconName: 'Repeat',
    proTip: 'A chain of steals makes the game exciting, but can take time—keep the pace moving briskly!'
  },
  {
    step: 5,
    title: 'The 3-Steal Limit ("Frozen" Gift Rule)',
    shortDesc: 'To avoid infinite stealing loops, a gift becomes permanently "locked" or "frozen" after 3 steals.',
    details: [
      'Each time a gift changes owners, add 1 steal tick.',
      'Once a gift has been stolen 3 times, the third thief keeps it permanently. It cannot be stolen again.',
      'This keeps the game competitive while preventing arguments.'
    ],
    iconName: 'ShieldCheck',
    proTip: 'Count aloud: "That is steal number two on the YETI mug!" Everyone will know it has one steal left.'
  },
  {
    step: 6,
    title: 'The Player #1 Finale Advantage',
    shortDesc: 'After the final player takes their turn, Player #1 has the ultimate right to steal any unlocked gift!',
    details: [
      'Because Player #1 had no option to steal at the start of the game, they get the final move.',
      'Player #1 can choose to keep their current gift, or swap it with ANY open, unlocked gift in the room.',
      'If Player #1 steals, the displaced person gets Player #1\'s discarded gift (or can steal an unlocked one depending on house rules).',
      'The game ends immediately after this resolution.'
    ],
    iconName: 'Trophy',
    proTip: 'Drawing #1 seemed bad at first, but with this rule, Player #1 often walks away with the best item in the room!'
  }
]

export const POPULAR_VARIATIONS = [
  {
    name: 'Dirty Santa',
    difference: 'Identical to White Elephant, but with stronger emphasis on competitive stealing and funny or cheeky gifts.'
  },
  {
    name: 'Yankee Swap',
    difference: 'Typically requires gifts to be practical and genuinely useful rather than purely comedic gag items.'
  },
  {
    name: 'The Grinch Rule',
    difference: 'Every time the word "Christmas" or "Holiday" is said, everyone must pass their gift one person to the left!'
  },
  {
    name: 'Wrapped Mystery Boxes',
    difference: 'Gifts can only be stolen wrapped based on external weight and shape; unboxing happens at the very end.'
  }
]
