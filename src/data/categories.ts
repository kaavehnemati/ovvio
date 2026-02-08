import type { Category, CategoryId } from '../types'

export const CATEGORIES: readonly Category[] = [
  {
    id: 1,
    title: 'World of Overlays',
    previewImage: '/categories/world-of-overlays.png',
    description: [
      '"World of Overlays" explores a relational approach to space. It traces images where layers of meaning are revealed through interaction, disruption, and overlap with other elements that are often unseen, but profoundly affect what is made visible in a situation. This work touches on immaterial aspects of zones, rooms, architecture, and non-architecture.',
      '"World of Overlays" functions as a territory of an event within which layers exist. In this perspective of overlays, we are interested in spaces that are built when the observer is present, and when they are not. Every layer, when viewed from another perspective, provides a different stage of the unfolding of the event.'
    ],
    images: [
      { src: '/categories/category-1-image-1.png', blockType: 'full', offsetTop: 0, offsetRight: 0 },
      { src: '/categories/category-1-image-2.png', blockType: 'half', offsetTop: -20, offsetRight: 10 },
      { src: '/categories/category-1-image-3.png', blockType: 'half', offsetTop: 15, offsetRight: -15 },
      { src: '/categories/category-1-image-4.png', blockType: 'full', offsetTop: -30, offsetRight: 0 }
    ] as const
  },
  {
    id: 2,
    title: 'Pacing with Time',
    previewImage: '/categories/pacing-with-time.png',
    description: [
      'Time is not uniform. It stretches, compresses, and fragments according to our attention and experience. This category examines our relationship with temporal flow.',
      'The rhythms we establish—daily, seasonal, lifetime—create patterns that both constrain and liberate our understanding of duration and change.',
      'By pacing with time rather than against it, we find new modes of presence and awareness.'
    ],
    images: [
      { src: '/categories/category-2-image-1.png', blockType: 'half', offsetTop: 0, offsetRight: 20 },
      { src: '/categories/category-2-image-2.png', blockType: 'half', offsetTop: -10, offsetRight: 0 },
      { src: '/categories/category-2-image-3.png', blockType: 'full', offsetTop: 10, offsetRight: -25 },
      { src: '/categories/category-2-image-4.png', blockType: 'half', offsetTop: -15, offsetRight: 5 },
      { src: '/categories/category-2-image-5.png', blockType: 'half', offsetTop: 0, offsetRight: -10 }
    ] as const
  },
  {
    id: 3,
    title: 'Movements of Feeling',
    previewImage: '/categories/movements-of-feeling.png',
    description: [
      'Emotion is not static. It flows, shifts, and transforms through our physical and mental landscapes. This category tracks the trajectories of feeling.',
      'The language of movement—gesture, posture, rhythm—reveals emotional states that words cannot capture.',
      'Understanding feeling as movement rather than fixed state opens new possibilities for emotional literacy and expression.'
    ],
    images: [
      { src: '/categories/category-3-image-1.png', blockType: 'full', offsetTop: -20, offsetRight: 15 },
      { src: '/categories/category-3-image-2.png', blockType: 'half', offsetTop: 10, offsetRight: 0 },
      { src: '/categories/category-3-image-3.png', blockType: 'half', offsetTop: 0, offsetRight: -20 },
      { src: '/categories/category-3-image-4.png', blockType: 'full', offsetTop: 5, offsetRight: 10 }
    ] as const
  },
  {
    id: 4,
    title: 'Geometrical Obsession',
    previewImage: '/categories/geometrical-obsession.png',
    description: [
      'Geometry is the fundamental language of space and form. This category delves into the compulsive desire to find pattern, symmetry, and mathematical order.',
      'The circle, triangle, and rectangle are not mere shapes but archetypes of thought—frameworks through which we organize reality.',
      'Obsession with geometry reveals the human need to impose structure on chaos, to find certainty in the uncertain.'
    ],
    images: [
      { src: '/categories/category-4-image-1.png', blockType: 'half', offsetTop: -25, offsetRight: 0 },
      { src: '/categories/category-4-image-2.png', blockType: 'half', offsetTop: 0, offsetRight: 15 },
      { src: '/categories/category-4-image-3.png', blockType: 'full', offsetTop: 20, offsetRight: -10 }
    ] as const
  }
] as const

export const getCategoryById = (id: CategoryId): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id)
}
