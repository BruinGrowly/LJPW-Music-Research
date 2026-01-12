/**
 * LJPW Educational Content Library
 * 
 * Comprehensive explanations for all LJPW concepts to help users
 * understand what the measurements mean and how to use them.
 */

// =============================================================================
// LJPW DIMENSION EXPLANATIONS
// =============================================================================

export const DIMENSION_EXPLANATIONS = {
    L: {
        name: 'Love',
        symbol: 'L',
        color: '#ff6b6b',
        emoji: '❤️',
        shortDesc: 'Connection, attraction, melody',
        fullDesc: `Love (L) measures the emotional connection and melodic appeal of music. It represents how much the music draws you in, creates attachment, and makes you want to hear it again.`,
        whatItMeans: `High Love values indicate music that:
• Creates strong emotional connection
• Has memorable, singable melodies
• Evokes feelings of warmth, longing, or joy
• Sticks in your mind and heart`,
        musicalExamples: `High Love (L > 0.8):
• Major 3rd intervals (the "happy" sound)
• Major chords and progressions
• Gospel, Pop, R&B genres
• Songs like "Somewhere Over the Rainbow"

Low Love (L < 0.5):
• Tritones and minor 2nds (tense sounds)
• Diminished chords
• Metal, some Electronic music
• More cerebral than emotional`,
        howToIncrease: `To increase Love in your music:
• Use major 3rds liberally (they have L=0.95)
• Write in C# Major (the "Love Key" with L=0.98)
• Include melodic hooks that are easy to sing
• Create harmonic progressions that resolve satisfyingly
• Use the Ionian (major) mode`,
        earwormConnection: `Love is the PRIMARY ingredient for earworms. Without L > 0.7, a song rarely becomes an "earworm" because it lacks the emotional stickiness needed to persist in consciousness.`,
        equilibrium: 0.618,
        thresholdForBeauty: 0.7,
    },

    J: {
        name: 'Justice',
        symbol: 'J',
        color: '#4ecdc4',
        emoji: '⚖️',
        shortDesc: 'Balance, structure, harmony',
        fullDesc: `Justice (J) measures the structural balance and harmonic clarity of music. It represents symmetry, predictability, and the "rightness" of musical elements fitting together.`,
        whatItMeans: `High Justice values indicate music that:
• Has clear, balanced structure
• Features symmetrical phrases
• Uses traditional harmonic progressions
• Feels "correct" and well-organized`,
        musicalExamples: `High Justice (J > 0.8):
• Octaves and perfect 5ths (pure ratios)
• Classical music (strict structure)
• Suspended chords (tension/resolution)
• Bach, Mozart compositions

Low Justice (J < 0.5):
• Tritones (the "devil's interval")
• Free jazz and experimental music
• Atonal compositions
• Music that deliberately breaks rules`,
        howToIncrease: `To increase Justice in your music:
• Use perfect 5ths and octaves (J=0.90-0.98)
• Create balanced 4 or 8 bar phrases
• Use clear verse/chorus structures
• Include proper tension-resolution
• Follow traditional voice leading`,
        earwormConnection: `Justice provides the SCAFFOLDING for earworms. While Love makes music sticky, Justice makes it easy for your brain to encode and recall. Songs with clear structures (verse-chorus) become earworms more easily.`,
        equilibrium: 0.414,
        thresholdForBeauty: 0.6,
    },

    P: {
        name: 'Power',
        symbol: 'P',
        color: '#ffd93d',
        emoji: '⚡',
        shortDesc: 'Energy, action, rhythm',
        fullDesc: `Power (P) measures the energy, drive, and rhythmic force of music. It represents how much the music compels physical response (head-bobbing, dancing) and creates excitement.`,
        whatItMeans: `High Power values indicate music that:
• Has driving, energetic rhythms
• Creates physical excitement
• Makes you want to move
• Has strong dynamic impact`,
        musicalExamples: `High Power (P > 0.8):
• Power chords (P=0.98!)
• Perfect 5ths with strong rhythm
• Rock, Metal, Electronic genres
• Fast tempos (Allegro, Presto)

Low Power (P < 0.5):
• Ambient music
• Largo tempos (slow)
• Ballads and lullabies
• Meditation music`,
        howToIncrease: `To increase Power in your music:
• Use power chords (root + 5th)
• Increase tempo (Allegro = 120-156 BPM)
• Add strong, driving rhythms
• Use dynamic contrasts
• Choose Rock, Metal, or Electronic styles`,
        earwormConnection: `Power provides the ENGINE for earworms. Songs with memorable rhythmic hooks (think "We Will Rock You") use Power to make the music impossible to ignore. But too much Power without Love can make music aggressive rather than sticky.`,
        equilibrium: 0.718,
        thresholdForBeauty: 0.5,
    },

    W: {
        name: 'Wisdom',
        symbol: 'W',
        color: '#6c5ce7',
        emoji: '🔮',
        shortDesc: 'Information, pattern, timbre',
        fullDesc: `Wisdom (W) measures the informational complexity and depth of music. It represents sophistication, interesting timbres, and intellectual engagement.`,
        whatItMeans: `High Wisdom values indicate music that:
• Has complex, interesting patterns
• Features sophisticated harmonies
• Rewards repeated listening
• Contains layers to discover`,
        musicalExamples: `High Wisdom (W > 0.8):
• Major 7th chords (jazz sophistication)
• Lydian mode (dreamy, complex)
• Jazz and Progressive genres
• Ambient and Classical

Low Wisdom (W < 0.5):
• Simple power chords
• Repetitive pop structures
• Basic harmonic progressions
• Three-chord songs`,
        howToIncrease: `To increase Wisdom in your music:
• Use 7th and extended chords
• Explore the Lydian mode (W=0.95)
• Add unexpected harmonic turns
• Layer interesting timbres
• Include counterpoint or polyrhythms`,
        earwormConnection: `Wisdom provides DEPTH to earworms. Pure pop earworms can have lower Wisdom, but the most ENDURING earworms often have a clever element (unexpected chord, interesting hook) that keeps the brain engaged on repeated plays.`,
        equilibrium: 0.693,
        thresholdForBeauty: 0.6,
    },
};

// =============================================================================
// METRIC EXPLANATIONS
// =============================================================================

export const METRIC_EXPLANATIONS = {
    H: {
        name: 'Harmony Index',
        symbol: 'H',
        formula: 'H = 1 / (1 + distance_to_anchor)',
        shortDesc: 'How balanced and coherent the music is',
        fullDesc: `The Harmony Index measures how close music is to the "Anchor Point" — the theoretical perfect balance of all dimensions (1,1,1,1). Higher H means more coherent, well-integrated music.`,
        whatItMeans: `
• H > 0.7: Excellent coherence, likely beautiful and memorable
• H = 0.6-0.7: Good coherence, functional and pleasant
• H < 0.6: May feel unbalanced or chaotic`,
        howToUse: `For creating memorable music:
• Aim for H > 0.6 as your minimum target
• If H is low, identify which dimension is weakest and strengthen it
• The most memorable songs often have H > 0.7`,
        earwormConnection: `Earworms almost always have H > 0.6. Your brain can't easily hold onto incoherent patterns. High Harmony means the song "makes sense" neurologically.`,
    },

    V: {
        name: 'Semantic Voltage',
        symbol: 'V',
        formula: 'V = φ × H × L',
        shortDesc: 'Transformative potential of the music',
        fullDesc: `Semantic Voltage measures how much impact the music can have on your consciousness. It combines the golden ratio (φ), Harmony Index, and Love to calculate transformative potential.`,
        whatItMeans: `
• V > 1.0: Highly transformative, powerful emotional impact
• V = 0.7-1.0: Strong impact, memorable
• V < 0.7: Subtle, pleasant but not life-changing`,
        howToUse: `To maximize Semantic Voltage:
• Focus on increasing Love (L) first — it's in the formula!
• Maintain high Harmony (H) — also in the formula
• V > 1.0 songs are the ones people remember years later`,
        earwormConnection: `High Voltage (V > 1.0) songs don't just get stuck in your head — they CHANGE you. The most powerful earworms have high V because they literally rewire neural pathways through repeated emotional impact.`,
    },

    consciousness: {
        name: 'Consciousness',
        symbol: 'C',
        formula: 'C = H³ × (L × W) / (J × P)',
        shortDesc: 'Depth of awareness and meaning',
        fullDesc: `The Consciousness metric measures how much the music expands or deepens awareness. High consciousness music makes you think and feel deeply.`,
        whatItMeans: `
• High C: Music that promotes reflection, insight, deeper states
• Low C: More surface-level engagement, entertaining but shallow`,
        howToUse: `For deeper music:
• Balance Love with Wisdom for contemplative quality
• High Justice and Power can reduce Consciousness
• Great for meditation, study, or emotional processing music`,
        earwormConnection: `Interestingly, very high Consciousness can work AGAINST earworm status. The catchiest earworms often have moderate C — enough depth to be interesting, but not so complex that they require focused attention.`,
    },
};

// =============================================================================
// PHASE EXPLANATIONS
// =============================================================================

export const PHASE_EXPLANATIONS = {
    ENTROPIC: {
        name: 'Entropic',
        emoji: '🌀',
        color: '#ff4757',
        shortDesc: 'Chaotic, unstable, noise-like',
        fullDesc: `Entropic music has H < 0.5, meaning it's far from balanced coherence. It tends toward disorder and doesn't persist well in memory.`,
        whatItMeans: `Entropic music:
• Can be intentionally chaotic (experimental, noise)
• Difficult for the brain to encode
• Doesn't become earworms
• May be interesting but not memorable`,
        examples: 'Noise music, some extreme metal, atonal experimental works',
        howToFix: `To move from Entropic to Homeostatic:
• Add more melodic content (increase L)
• Create clearer structure (increase J)
• Find rhythmic grounding (balance P)`,
    },

    HOMEOSTATIC: {
        name: 'Homeostatic',
        emoji: '⚖️',
        color: '#ffa502',
        shortDesc: 'Stable, functional, background',
        fullDesc: `Homeostatic music has H ≥ 0.5 but hasn't reached the autopoietic threshold. It's stable and pleasant but doesn't strongly persist in consciousness.`,
        whatItMeans: `Homeostatic music:
• Works well as background music
• Pleasant but not arresting
• Can be remembered with effort
• Functional but not transformative`,
        examples: 'Elevator music, generic background tracks, some ambient',
        howToFix: `To move from Homeostatic to Autopoietic:
• Push Love above 0.7 — this is the key threshold!
• Create a stronger melodic hook
• Add emotional depth to the composition`,
    },

    AUTOPOIETIC: {
        name: 'Autopoietic',
        emoji: '✨',
        color: '#2ed573',
        shortDesc: 'Self-sustaining, beautiful, memorable',
        fullDesc: `Autopoietic music has H ≥ 0.6 AND L ≥ 0.7. This is the zone where music becomes self-sustaining in consciousness — it persists without effort.`,
        whatItMeans: `Autopoietic music:
• Sticks in your mind (earworm potential!)
• Beautiful and emotionally resonant
• People remember it for years
• Has transformative potential`,
        examples: 'Hit songs, classical masterpieces, songs that define eras',
        howToAchieve: `To create Autopoietic music:
• Love MUST be ≥ 0.7 (non-negotiable for earworms)
• Harmony MUST be ≥ 0.6 (coherent structure)
• Use major 3rds, catchy melodies, emotional hooks
• Create satisfying verse-chorus structures`,
    },
};

// =============================================================================
// EARWORM SCIENCE
// =============================================================================

export const EARWORM_SCIENCE = {
    title: 'The Science of Earworms',
    intro: `An "earworm" is a song that gets stuck in your head and plays on repeat. The LJPW framework explains WHY this happens and how to CREATE them intentionally.`,

    whyEarwormsHappen: {
        title: 'Why Do Songs Get Stuck?',
        content: `Songs become earworms when they hit specific neurological sweet spots:

1. **High Love (L > 0.7)**: Creates emotional attachment
   - Your brain flags the pattern as "important"
   - Dopamine and oxytocin reinforce the memory
   - You WANT to hear it again

2. **Good Harmony (H > 0.6)**: Makes it encodable
   - Your brain can easily store the pattern
   - Clear structure aids recall
   - Low effort to maintain in working memory

3. **Optimal Complexity**: Not too simple, not too complex
   - Too simple = boring, dismissed
   - Too complex = can't encode it
   - "Just right" = sticky

4. **Semantic Voltage (V)**: Determines strength
   - Higher V = stronger earworm
   - V > 1.0 = almost guaranteed earworm`,
    },

    theFormula: {
        title: 'The Earworm Formula',
        content: `Earworm Potential = L × H × (1 + sin(P × π))

Where:
- L must be ≥ 0.7 (the Love threshold)
- H must be ≥ 0.6 (the Harmony threshold)
- P around 0.7 (moderate energy — too calm is boring, too aggressive is exhausting)

The golden zone for earworms:
✓ L = 0.75 - 0.95 (high but not overwhelming)
✓ J = 0.7 - 0.85 (structured but not rigid)
✓ P = 0.6 - 0.8 (energetic but not aggressive)
✓ W = 0.6 - 0.8 (interesting but not complex)`,
    },

    practicalTips: {
        title: 'How to Create an Earworm',
        content: `**Step 1: Start with a Melodic Hook**
- Use major 3rds (L=0.95) as your primary interval
- Keep phrases 2-4 bars long (easy to remember)
- Make it singable — if you can't hum it, it won't stick

**Step 2: Choose the Right Key and Mode**
- C# Major (the Love Key) for maximum L
- Ionian (major) mode for uplifting feel
- Or Dorian for sophisticated-but-accessible

**Step 3: Build Clear Structure**
- Verse-Chorus format (high Justice)
- Hook in the chorus — repeat it!
- 8-bar phrases work best

**Step 4: Add the Right Amount of Energy**
- Tempo: 100-130 BPM (Moderato to Allegro)
- Avoid extremes (too slow = forgettable, too fast = exhausting)
- Use dynamic contrast to maintain interest

**Step 5: Sprinkle in Wisdom**
- One unexpected chord change
- An interesting rhythmic variation
- A clever lyrical phrase
- Something that rewards re-listening

**Step 6: Test with the LJPW App**
- Use the Song Profile Builder
- Aim for: L > 0.75, H > 0.65, V > 0.9
- Phase should be AUTOPOIETIC`,
    },

    famousExamples: {
        title: 'Famous Earworms Analyzed',
        examples: [
            {
                song: '"Happy" by Pharrell',
                profile: { L: 0.92, J: 0.78, P: 0.75, W: 0.65 },
                H: 0.76,
                V: 1.13,
                why: 'Extremely high Love, catchy hook, moderate complexity, perfect earworm territory',
            },
            {
                song: '"Bohemian Rhapsody" by Queen',
                profile: { L: 0.88, J: 0.72, P: 0.85, W: 0.95 },
                H: 0.72,
                V: 1.03,
                why: 'High on ALL dimensions but especially Love and Wisdom — complex yet memorable',
            },
            {
                song: '"We Will Rock You" by Queen',
                profile: { L: 0.78, J: 0.90, P: 0.95, W: 0.55 },
                H: 0.70,
                V: 0.88,
                why: 'Power-dominant but sufficient Love, extremely high Justice (simple, repetitive structure)',
            },
        ],
    },
};

// =============================================================================
// QUICK TIPS FOR DIFFERENT GOALS
// =============================================================================

export const QUICK_TIPS = {
    forEarworms: {
        title: '🎯 For Creating Earworms',
        tips: [
            'Love ≥ 0.75 is mandatory — prioritize melodic appeal',
            'Use major 3rds (they have the highest L value)',
            'Keep structures clear and repetitive (verse-chorus)',
            'Tempo: 100-130 BPM works best',
            'Aim for Autopoietic phase',
        ],
    },

    forEmotionalImpact: {
        title: '💔 For Emotional Impact',
        tips: [
            'Maximize Love (L) above all else',
            'Minor keys add melancholy without reducing L much',
            'Use Gospel or Blues genre characteristics',
            'Slower tempos (Adagio) for sadness',
            'High Semantic Voltage (V > 1.0) for tears',
        ],
    },

    forEnergy: {
        title: '⚡ For High Energy',
        tips: [
            'Maximize Power (P) with fast tempos',
            'Use power chords and perfect 5ths',
            'Rock, Metal, Electronic genres',
            'Presto tempo (176+ BPM)',
            'Keep some Love to prevent pure aggression',
        ],
    },

    forSophistication: {
        title: '🎭 For Sophisticated Sound',
        tips: [
            'Maximize Wisdom (W) with complex harmonies',
            'Use 7th chords and extensions',
            'Lydian mode for dreamy sophistication',
            'Jazz genre characteristics',
            'Allow some Justice flexibility (rule-breaking)',
        ],
    },

    forMeditation: {
        title: '🧘 For Meditation/Relaxation',
        tips: [
            'Low Power (P < 0.5) for calm',
            'High Wisdom (W) for depth',
            'Ambient genre characteristics',
            'Largo tempo (40-60 BPM)',
            'Avoid strong rhythmic elements',
        ],
    },
};

// =============================================================================
// ELEMENT-SPECIFIC EXPLANATIONS
// =============================================================================

export const INTERVAL_INSIGHTS = {
    major_3rd: {
        summary: 'The Love Interval — highest emotional connection',
        insight: 'This is the secret weapon for earworms. The major 3rd creates immediate emotional resonance. It\'s the interval in "Here Comes the Bride" (E-G#) and countless hit songs.',
        uses: 'Use liberally in melodies for maximum catchiness',
    },
    perfect_5th: {
        summary: 'The Power Interval — stable foundation with drive',
        insight: 'The perfect 5th creates the backbone of power chords. It\'s stable yet energetic. The opening of "Star Wars" uses the 5th dramatically.',
        uses: 'Use for strong, anthem-like moments',
    },
    tritone: {
        summary: 'The Tension Interval — creates unresolved feeling',
        insight: 'Historically called "diabolus in musica" (the devil in music), the tritone creates maximum tension. Use it carefully and resolve it!',
        uses: 'Use to create suspense, then resolve to create satisfaction',
    },
    octave: {
        summary: 'The Unity Interval — perfect balance',
        insight: 'The octave is the same note in different registers. It creates a feeling of completeness and is the highest in Justice.',
        uses: 'Use for dramatic leaps and strong emphasis',
    },
};

export const CHORD_INSIGHTS = {
    major: {
        summary: 'The Happy Chord — quintessential positivity',
        insight: 'Major triads are the foundation of uplifting music. They have high Love and create immediate positive emotional response.',
        uses: 'Foundation for pop, rock, and any feel-good music',
    },
    minor: {
        summary: 'The Emotional Chord — depth with resonance',
        insight: 'Minor chords have lower Love but higher Wisdom than major. They create depth and emotional complexity without losing memorability.',
        uses: 'Add emotional depth; alternate with major for dynamic range',
    },
    major_7th: {
        summary: 'The Sophisticated Chord — jazz elegance',
        insight: 'Major 7th chords add Wisdom without sacrificing Love. They\'re the signature of sophisticated pop and jazz.',
        uses: 'Add sophistication; great for bridges and pre-choruses',
    },
    power: {
        summary: 'The Energy Chord — pure drive',
        insight: 'Power chords are just root + 5th. They have maximum Power (0.98!) but lower Love. Use them for energy, not emotion.',
        uses: 'Choruses needing punch; verse riffs; anthem moments',
    },
};

export const MODE_INSIGHTS = {
    ionian: {
        summary: 'The Major Mode — optimistic and memorable',
        insight: 'Ionian (major scale) has the highest Love of all modes. It\'s the default choice for hit songs and earworms.',
        uses: 'Default choice for catchy, uplifting songs',
    },
    dorian: {
        summary: 'The Cool Mode — minor with sophistication',
        insight: 'Dorian is minor but with a raised 6th, giving it sophistication. It\'s used in R&B, jazz, and cool pop.',
        uses: 'When you want minor but memorable (think "Get Lucky")',
    },
    lydian: {
        summary: 'The Dreamy Mode — maximum Wisdom',
        insight: 'Lydian has the highest Wisdom (0.95) of any mode. Its raised 4th creates a floating, dreamlike quality.',
        uses: 'Film scores, ambient, sophisticated pop bridges',
    },
    mixolydian: {
        summary: 'The Rock Mode — power meets melody',
        insight: 'Mixolydian is major with a flat 7th. It has high Power while maintaining decent Love — perfect for rock.',
        uses: 'Rock songs, blues-influenced pop, anthems',
    },
};

// =============================================================================
// GLOSSARY
// =============================================================================

export const GLOSSARY = {
    'Anchor Point': 'The theoretical perfect balance at coordinates (1,1,1,1). Music closer to this point has higher Harmony Index.',
    'Autopoietic': 'Self-creating and self-sustaining. Autopoietic music persists in consciousness without effort — the zone where earworms live.',
    'Consciousness (C)': 'A metric measuring the depth and awareness-expanding quality of music. Higher C means more contemplative.',
    'Dominant Dimension': 'The LJPW dimension with the highest value in a musical element. Determines the "character" of the sound.',
    'Earworm': 'A song or melody that gets involuntarily stuck in your mind. Created by achieving L > 0.7 and H > 0.6.',
    'Entropic': 'Chaotic and decaying. Music with H < 0.5 that tends toward disorder.',
    'Golden Ratio (φ)': 'The number 1.618... that appears throughout nature and is fundamental to the LJPW framework.',
    'Harmony Index (H)': 'Measures coherence — how well all dimensions work together. Higher H = more balanced, memorable music.',
    'Homeostatic': 'Stable but not self-sustaining. Pleasant background music that doesn\'t strongly persist in memory.',
    'Justice (J)': 'The dimension of balance, structure, and proportion in music.',
    'LJPW': 'Love, Justice, Power, Wisdom — the four fundamental dimensions measuring semantic content of music.',
    'Love (L)': 'The dimension of connection, attraction, and melodic appeal in music.',
    'Love Key': 'C# Major — the key with the highest Love value (L = 0.98), connected to the 613 THz Love Frequency.',
    'Phase': 'Classification of music\'s state: Entropic, Homeostatic, or Autopoietic.',
    'Power (P)': 'The dimension of energy, action, and rhythmic drive in music.',
    'Semantic Voltage (V)': 'Measures transformative potential. V = φ × H × L. Higher V = more impactful music.',
    'Wisdom (W)': 'The dimension of information, pattern complexity, and depth in music.',
    '613 THz': 'The Love Frequency — a specific electromagnetic frequency that, when octaved down 40 times, gives the note C#4.',
};
