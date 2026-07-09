import { MajorProject } from '../types';
import codehornMD from './markdowns/codehorn.md?raw';
import notemyshowMD from './markdowns/notemyshow.md?raw';
import howzappMD from './markdowns/howzapp.md?raw';

export const majorProjectsData: MajorProject[] = [
  {
    id: 'codehorn',
    name: 'CodeHorn',
    slug: 'codehorn',
    type: 'major',
    description: 'A distributed message broker and notifications pipeline designed for low latency client sync and containerized fallback clusters.',
    overview: codehornMD,
    thumbnailImage: '/images/projects/thumbnails/Thumbnail_Codehorn.png',
    platforms: ['web', 'backend'],
    source: 'https://github.com/Mikkareem/cloud-messenger',
    technologies: [
      'Spring Boot w/Kotlin',
      'Spring Webflux',
      'Spring Cloud Gateway',
      'Docker',
      'Kubernetes',
      'TestContainers',
      'WireMock'
    ],
    tags: [
      { color: ['#3b82f6', '#1d4ed8'], label: 'DinD' },
      { color: ['#10b981'], label: 'Leetcode Clone' }
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'notemyshow',
    name: 'NoteMyShow',
    slug: 'notemyshow',
    type: 'major',
    description: 'Multi-tenant payment billing ledger and microservice gateway with active transaction lock concurrency and distributed configs.',
    overview: notemyshowMD,
    thumbnailImage: '/images/projects/thumbnails/Thumbnail_NoteMyShow.png',
    platforms: ['web', 'android', 'ios'],
    source: 'https://github.com/Mikkareem/payflow-banking',
    technologies: [
      'Spring Boot w/Kotlin',
      'Spring Security',
      'Spring Data JPA',
      'Docker Compose',
      'Amazon Web Services (AWS)',
      'JUnit 4/5',
      'Mockito'
    ],
    tags: [
      { color: ['#8b5cf6', '#ec4899'], label: 'Stripe' },
      { color: ['#8b5cf6', '#ec4899'], label: 'Hashicorp Vault' },
      { color: ['#f59e0b'], label: 'BookMyShow Clone' }
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'howzapp',
    name: 'Howzapp',
    slug: 'howzapp',
    type: 'major',
    description: 'A native health synchronization mobile app utilizing custom canvas charts, multiplatform state, and mock telemetry streaming.',
    overview: howzappMD,
    thumbnailImage: '/images/projects/thumbnails/Thumbnail_Howzapp.png',
    platforms: ['backend', 'android', 'ios', 'desktop'],
    source: 'https://github.com/Mikkareem/fitpulse-kmp',
    technologies: [
      'Kotlin Multiplatform',
      'Compose Multiplatform',
      'Koin',
      'Ktor Client',
      'Kotlinx Coroutines',
      'MockK',
      'Compose UI Testing'
    ],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Social Media' },
      { color: ['#6366f1'], label: 'Whatsapp Clone' }
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1510017808638-a59b57144825?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522881195387-3970343a5899?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'memecut',
    name: 'MemeCut',
    slug: 'memecut',
    type: 'major',
    description: 'Experimental laboratory testing Navigation 3 and custom gesture transitions in multiplatform container views.',
    overview: 'A showcase of Android/iOS navigation animations, state hoisting, and custom UI transitions on top of Compose Multiplatform.',
    thumbnailImage: '/images/projects/thumbnails/Thumbnail_MemeCut.png',
    platforms: ['android', 'ios'],
    source: 'https://github.com/Mikkareem/navigation-lab',
    technologies: [
      'Compose Multiplatform',
      'Navigation 3',
      'Kotlinx Coroutines',
      'Compose Unit Testing'
    ],
    tags: [
      { color: ['#14b8a6', '#0d9488'], label: 'Meme Creation' }
    ],
    screenshots: []
  },
  {
    id: 'apiclientk',
    name: 'ApiClientK',
    slug: 'apiclientk',
    type: 'major',
    description: 'Spring GraphQL API service testing query complexity, schema structures, and data fetchers.',
    overview: 'A reference API service built with Spring GraphQL and Spring Data JDBC, demonstrating micro-optimizations and query complexity rules.',
    thumbnailImage: '/images/projects/thumbnails/Thumbnail_ApiClientK.png',
    platforms: ['android', 'ios', 'desktop'],
    source: 'https://github.com/Mikkareem/graphql-core',
    technologies: [
      'Spring GraphQL',
      'Spring Data JDBC',
      'Docker',
      'KoTest'
    ],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'RestApi Client' },
      { color: ['#ef4444', '#f43f5e'], label: 'JSON Viewer' },
      { color: ['#6366f1'], label: 'Postman Clone' }
    ],
    screenshots: []
  },
  {
    id: 'sudoku',
    name: 'Sudoku Game / Solver',
    slug: 'sudoku',
    type: 'major',
    description: 'Spring GraphQL API service testing query complexity, schema structures, and data fetchers.',
    overview: 'A reference API service built with Spring GraphQL and Spring Data JDBC, demonstrating micro-optimizations and query complexity rules.',
    thumbnailImage: '/images/projects/thumbnails/Thumbnail_Sudoku.png',
    platforms: ['android', 'ios', 'desktop'],
    source: 'https://github.com/Mikkareem/graphql-core',
    technologies: [
      'Spring GraphQL',
      'Spring Data JDBC',
      'Docker',
      'KoTest'
    ],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Sudoku Game' },
      { color: ['#ef4444', '#f43f5e'], label: 'Sudoku Solver' },
    ],
    screenshots: []
  },
  {
    id: 'rubikscube',
    name: 'RubiksCube3D',
    slug: 'rubikscube',
    type: 'major',
    description: 'Spring GraphQL API service testing query complexity, schema structures, and data fetchers.',
    overview: 'A reference API service built with Spring GraphQL and Spring Data JDBC, demonstrating micro-optimizations and query complexity rules.',
    thumbnailImage: '/images/projects/thumbnails/Gemini_Generated_Image_Codehorn_Thumbnail.png',
    platforms: ['android', 'ios', 'desktop'],
    source: 'https://github.com/Mikkareem/graphql-core',
    technologies: [
      'Spring GraphQL',
      'Spring Data JDBC',
      'Docker',
      'KoTest'
    ],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'OpenGL ES' },
      { color: ['#ef4444', '#f43f5e'], label: '3D Game' }
    ],
    screenshots: []
  },
  {
    id: 'duberdola',
    name: 'DuberDola',
    slug: 'duberdola',
    type: 'major',
    description: 'Spring GraphQL API service testing query complexity, schema structures, and data fetchers.',
    overview: 'A reference API service built with Spring GraphQL and Spring Data JDBC, demonstrating micro-optimizations and query complexity rules.',
    thumbnailImage: '/images/projects/thumbnails/Gemini_Generated_Image_Codehorn_Thumbnail.png',
    platforms: ['android', 'ios'],
    source: 'https://github.com/Mikkareem/graphql-core',
    technologies: [
      'Spring GraphQL',
      'Spring Data JDBC',
      'Docker',
      'KoTest'
    ],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Google Maps' },
      { color: ['#ef4444', '#f43f5e'], label: 'Uber/Ola Clone' }
    ],
    screenshots: []
  }
];
