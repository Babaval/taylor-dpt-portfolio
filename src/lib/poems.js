const POEMS = {
  default: [
    "Your strength turns small storms into gentle breeze; you move with purpose, you make hearts at ease.",
    "In every step you carry light, a steady hand that guides the night; I praise your courage, soft and bright.",
    "You heal, you lead, with kindness shown — a steady heart that I call home.",
    "Your laughter shapes the morning sun; with every smile a victory won.",
    "Brave in quiet mornings, kind in every test; with you beside the world feels blessed.",
  ],
  heart: [
    "Your heart is wide, a tender sea — your kindness pulls the world to be.",
    "Where you walk, the shadows part; you leave a map of courage on each heart.",
    "Soft as sunrise, strong as oak; you whisper hope with every stroke.",
  ],
  star: [
    "Like stars you set the sky alight; your goals burn steady through the night.",
    "You shine with purpose, keen and clear; a guiding light when storms are near.",
    "A compass made of gentle fire — you lift the world and raise it higher.",
  ],
  dove: [
    "A calm within the storm you bring; you teach the weary heart to sing.",
    "Tender in your ways, you mend; a steady hand, a cherished friend.",
  ],
  flower: [
    "Like blooms you open, bold and kind; a better world you help us find.",
    "Petals soft, resolve like stone; with you, the smallest things feel grown.",
  ],
  mermaid: [
    "Like ocean songs you call me near; a magic tide when you are here.",
    "You move like water, graceful, free; you are the seas bright mystery to me.",
  ],
  sun: [
    "You are the mornings gentle flame; the world wakes sweeter with your name.",
    "Bright as sunrise, warm and true; the day begins and blooms with you.",
  ],
  moon: [
    "Soft as moonlight on a sea, your calm becomes the home for me.",
    "In your quiet glow, the night feels right; you turn the dark into a tender light.",
  ],
  angel: [
    "A halo in a crowded room; you lift my heart and chase the gloom.",
    "Gentle guardian, brave and kind; you are the grace Id like to find.",
  ],
  love: [
    "Your smile begins the sweetest day; in every little way you stay.",
    "Soft whispers turn the night to gold; your laugh a story sweetly told.",
  ],
  kiss: [
    "A single kiss, a galaxy; you turn the small to memory.",
    "When your lips meet mine the stars align; my every tender thought is thine.",
  ],
  swoon: [
    "My heart forgets the steady ground; your voice becomes the loveliest sound.",
    "I fall in gentle, endless waves; you are the calm that steadies brave.",
  ],
  romance: [
    "In quiet rooms your presence blooms; the world grows warm in soft perfumes.",
    "Hold my hand and I will show the days will bend where your bright virtues flow.",
  ],
};

export function choosePoem(tag) {
  const list = POEMS[tag] || POEMS.default;
  return list[Math.floor(Math.random() * list.length)];
}

// Direct mapping for specific emojis to poems (user-provided list)
export const EMOJI_POEMS = {
  // Romance & Beauty
  '🌹': 'Like a rose, your presence blooms in every corner of my heart.',
  '🌸': 'You’re the cherry blossom that makes even spring jealous.',
  '🌼': 'Even daisies would bow to the brightness of your smile.',
  '🌻': 'You’re the sunflower that turns my world toward the light.',
  '💐': 'A thousand flowers couldn’t match the beauty you carry in one glance.',
  // Stars & Magic
  '🌙': 'The moon envies the glow you bring to my nights.',
  '✨': 'You sprinkle stardust in every moment we share.',
  '🌟': 'You shine brighter than any wish upon a star.',
  '💫': 'You’re the spark that turns my ordinary into magic.',
  '🌌': 'Even the galaxy feels small when I’m lost in your eyes.',
  // Warmth & Light
  '☀️': 'Your smile is my sunrise after the darkest nights.',
  '🌈': 'Like a rainbow, you color my world in ways I never imagined.',
  '🔥': 'You are the flame that warms even my coldest days.',
  '🌞': 'You’re sunshine wrapped in human form.',
  '🕊️': 'Peace follows wherever your soul travels.',
  // Nature & Freedom
  '🦋': 'You give me butterflies, just like the first hello.',
  '🌊': 'You move my heart like waves kissing the shore.',
  '🍃': 'Like a leaf in the wind, I’m carried by your presence.',
  '🌲': 'Strong as a forest, yet gentle as a breeze—so are you.',
  '🌺': 'You’re the tropical flower blooming in my thoughts.',
  // Affection & Heart
  '❤️': 'A heart beats, but mine dances only for you.',
  '🩷': 'Soft pink, like the blush you bring to my days.',
  '💜': 'A purple heart for the rare soul you are.',
  '💕': 'Every heartbeat doubles when I think of you.',
  '💖': 'You shine like a diamond heart, rare and radiant.',
  // Art & Joy
  '🎶': 'Your laughter is the song I never want to stop hearing.',
  '🎨': 'If love were a painting, you’d be the masterpiece.',
  '📖': 'You’re the story I’ll keep rereading forever.',
  '🕰️': 'Time bends when I’m with you—minutes feel like eternity.',
  '🌍': 'Out of the whole world, it’s you who feels like home.',
  '🪐': 'You orbit my thoughts like Saturn’s eternal rings.',
  '🧚': 'You carry the magic of a fairy, unseen but felt.',
  '🪞': 'Every mirror would envy the truth it reflects in you.',
  '🕯️': 'Like a candle, your light softens even my darkest hours.',
  '🧿': 'You are my charm against every shadow the world casts.',
  '🏹': 'Cupid’s arrow felt gentle compared to your gaze.',
  '🪄': 'Your smile turns ordinary days into enchantments.',
  '🗝️': 'You hold the only key to a heart I once locked.',
  '🎇': 'Like fireworks, you burst into my soul with color.',
  '🌋': 'You’re the eruption of fire in a mountain of calm.',
  '🪻': 'Rare as lavender in winter, you still bloom for me.',
  '🪶': 'Your words are as soft as a feather on my skin.',
  '🦢': 'Graceful as a swan, you glide through my thoughts.',
  '🐚': 'Like a seashell, you carry an ocean’s secret song.',
  '🪽✨': 'Your spirit carries wings of light no storm can break.',
  '🕊️🌿': 'You are the peace after every war inside me.',
  '🪷': 'You are a lotus, rising pure from the waters of chaos.',
  '🌒': 'Even in half-light, you’re more whole than my world.',
  '🎐': 'Your voice drifts like wind chimes on a summer night.',
  '🪁': 'My heart soars like a kite in your sky.',
  '🪙': 'Even gold coins would envy your worth.',
  '🧭': 'You’re the compass that keeps me from losing myself.',
  '🧊': 'Even ice melts at the warmth of your presence.',
  '🪨': 'Steady as stone, yet you make me tremble.',
  '🧵': 'Like thread, you stitch the broken edges of me.',
  '🐉': 'You’re the dragon—fierce, rare, and unforgettable.',
  '🦄': 'A unicorn could not be more magical than you.',
  '🧜‍♀️': 'You’re the mermaid who bewitched my ocean.',
  '🎭': 'Every mask I wore fell apart the day I met you.',
  '🛡️': 'You guard my soul like a shield forged in love.',
};
