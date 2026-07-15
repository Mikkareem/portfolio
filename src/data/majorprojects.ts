import { MajorProject } from '../types';
import codehornMD from './markdowns/majorprojects/codehorn.md?raw';
import notemyshowMD from './markdowns/majorprojects/notemyshow.md?raw';
import howzappMD from './markdowns/majorprojects/howzapp.md?raw';
import sudokuMD from './markdowns/majorprojects/sudoku.md?raw';
import memecutMD from './markdowns/majorprojects/memecut.md?raw';
import apiclientkMD from './markdowns/majorprojects/apiclientk.md?raw';
import rubikscubeMD from './markdowns/majorprojects/rubikscube.md?raw';
import duberdolaMD from './markdowns/majorprojects/duberdola.md?raw';

export const majorProjectsData: MajorProject[] = [
  {
    id: 'codehorn',
    name: 'CodeHorn',
    slug: 'codehorn',
    type: 'major',
    description: 'A cloud-native online coding judge platform inspired by LeetCode, featuring secure containerized code execution, microservices, Kubernetes, and modern React frontend technologies.',
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
    description: 'A cross-platform movie ticket booking application inspired by BookMyShow, featuring interactive seat selection, Stripe payments, and a production-ready cloud-native backend.',
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
    description: 'A cloud-native WhatsApp-inspired messaging platform with real-time chats, media sharing, communities, status updates, and a scalable Kotlin microservices backend.',
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
    screenshots: []
  },
  {
    id: 'memecut',
    name: 'MemeCut',
    slug: 'memecut',
    type: 'major',
    description: 'A cross-platform meme generator that lets users create, customize, and export memes using a shared Kotlin Multiplatform codebase.',
    overview: memecutMD,
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
    description: "A modern cross-platform REST API client inspired by Postman, featuring HTTP request testing, a custom JSON viewer, and responsive developer-focused UI.",
    overview: apiclientkMD,
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
    description: 'A cross-platform Sudoku game and solver built with Kotlin Multiplatform and Compose Multiplatform, featuring an interactive gameplay experience and an intelligent solving engine.',
    overview: sudokuMD,
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
    name: 'Rubiks Cube 3D Simulation',
    slug: 'rubikscube',
    type: 'major',
    description: "A native Android 3D Rubik's Cube simulator powered by a custom OpenGL ES rendering engine with smooth animations and interactive controls.",
    overview: rubikscubeMD,
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
    description: 'A cross-platform ride-booking application inspired by Uber and Ola, featuring native Google Maps integration and a responsive Compose Multiplatform interface.',
    overview: duberdolaMD,
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
