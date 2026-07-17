import { MiniProject } from '../types';
import fireworkeffectMD from './markdowns/miniprojects/fireworkeffect.md?raw';
import smokeparticleseffectMD from './markdowns/miniprojects/smokeparticleseffect.md?raw';
import randommovereffectMD from './markdowns/miniprojects/randommovereffect.md?raw';
import gestureindicationparticleseffectMD from './markdowns/miniprojects/gestureindicationparticleseffect.md?raw';
import deckcardsrevealinganimationMD from './markdowns/miniprojects/deckcardsrevealinganimation.md?raw';
import oscillatingheartanimationMD from './markdowns/miniprojects/oscillatingheartanimation.md?raw';
import waterywavytextcolorMD from './markdowns/miniprojects/waterywavytextcoloreffect.md?raw';
import glassyimageeffectMD from './markdowns/miniprojects/glassyimageeffect.md?raw';
import starratingfillanimationMD from './markdowns/miniprojects/starratingfillanimation.md?raw';
import boxdropshadoweffectMD from './markdowns/miniprojects/boxdropshadoweffect.md?raw';
import expandablemenuanimationMD from './markdowns/miniprojects/expandablemenuanimation.md?raw';
import animatedgobutton1MD from './markdowns/miniprojects/animatedgobutton1.md?raw';
import animatedgobutton2MD from './markdowns/miniprojects/animatedgobutton2.md?raw';
import clockviewMD from './markdowns/miniprojects/clockview.md?raw';
import customgradienttextfieldMD from './markdowns/miniprojects/customgradienttextfield.md?raw';
import fooddeliveryappuiMD from './markdowns/miniprojects/fooddeliveryappui.md?raw';
import chatappuiwithtypingindicationsMD from './markdowns/miniprojects/chatappuiwithtypingindications.md?raw';
import instagrammultiprofilecontainerMD from './markdowns/miniprojects/instagrammultiprofilecontainer.md?raw';
import instagrampostuiMD from './markdowns/miniprojects/instagrampostui.md?raw';
import instagramprofilescreenMD from './markdowns/miniprojects/instagramprofilescreen.md?raw';
import spotifymd from './markdowns/miniprojects/spotifyui.md?raw';
import kanbanboardviewMD from './markdowns/miniprojects/kanbanboardview.md?raw';


export const miniProjectsData: MiniProject[] = [
  {
    id: 'firework-effect',
    name: 'Firework Effect',
    slug: 'firework-effect',
    type: 'mini',
    description: 'A custom particle system built with Jetpack Compose Canvas, simulating realistic fireworks using physics-based animations, coroutine-driven rendering, and low-level graphics APIs.',
    overview: fireworkeffectMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/e87924e81e39a9e1be70c2f9165fe011',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://user-images.githubusercontent.com/56153409/285583440-2e7061ac-5b7a-49c6-8fc7-086be6e3b304.mp4'
    ],
    thumbnail: {
      video: 'https://user-images.githubusercontent.com/56153409/285583440-2e7061ac-5b7a-49c6-8fc7-086be6e3b304.mp4'
    }
  },
  {
    id: 'smoke-particles-effect',
    name: 'Smoke Particles Effect',
    slug: 'smoke-particles-effect',
    type: 'mini',
    description: 'A real-time smoke particle simulation built with Jetpack Compose Canvas, demonstrating custom particle systems, procedural animations, and low-level graphics rendering using physics-inspired motion.',
    overview: smokeparticleseffectMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/f834aae3be19dcdabae37f31a186d224',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/2b64711d-7ed0-4e30-928d-88e28f786f9c'
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/2b64711d-7ed0-4e30-928d-88e28f786f9c'
    }
  },
  {
    id: 'random-movers-effect',
    name: 'Random Movers Effect',
    slug: 'random-movers-effect',
    type: 'mini',
    description: 'A physics-inspired particle simulation built with Jetpack Compose Canvas, showcasing force-based motion, boundary collision detection, and real-time rendering of hundreds of independently animated particles.',
    overview: randommovereffectMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/3cb6a1fa91d476a2b6016ed8e9c768c5',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/07b89a19-1c8f-4ceb-b826-c61e4919c8de',
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/07b89a19-1c8f-4ceb-b826-c61e4919c8de'
    }
  },
  {
    id: 'gesture-indication-particles-effect',
    name: 'Gesture Indication Particles Effect',
    slug: 'gesture-indication-particles-effect',
    type: 'mini',
    description: "A custom Jetpack Compose indication that replaces the default ripple effect with an animated particle system, showcasing custom interaction feedback, real-time graphics, and Compose's indication APIs.",
    overview: gestureindicationparticleseffectMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/e7c8b2bddb6f2af333c9fa244832ee00',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/fc79540b-3d89-4087-82c1-ad32086a1b31'
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/fc79540b-3d89-4087-82c1-ad32086a1b31'
    }
  },
  {
    id: 'deck-cards-revealing-animation',
    name: 'Deck Cards Revealing Animation',
    slug: 'deck-cards-revealing-animation',
    type: 'mini',
    description: 'A Jetpack Compose animation showcasing a smooth deck-of-cards reveal using custom transformations, pivot-based rotations, and declarative animations to create an engaging card spreading effect.',
    overview: deckcardsrevealinganimationMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/4bec6b37ba1042a705a414cc8f1bec6f',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://user-images.githubusercontent.com/56153409/285597968-c9b1b4aa-42c7-4ba6-a00f-ac87f544aa56.mp4',
    ],
    thumbnail: {
      video: 'https://user-images.githubusercontent.com/56153409/285597968-c9b1b4aa-42c7-4ba6-a00f-ac87f544aa56.mp4'
    }
  },
  {
    id: 'oscillating-heart-animation',
    name: 'Oscillating Heart Animation',
    slug: 'oscillating-heart-animation',
    type: 'mini',
    description: 'A Jetpack Compose animation that combines translation, scaling, color interpolation, and custom drawing to create a dynamic oscillating heart effect driven entirely by declarative animations.',
    overview: oscillatingheartanimationMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/afeb78254b89db20404efbd93c1d291f',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/2f756db3-dcca-4194-bae3-2010e96d0b2c',
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/2f756db3-dcca-4194-bae3-2010e96d0b2c'
    }
  },
  {
    id: 'watery-wavy-text-color-effect',
    name: 'Watery/Wavy Text Color Effect',
    slug: 'watery-wavy-text-color-effect',
    type: 'mini',
    description: 'A Jetpack Compose Canvas animation that simulates rising water with animated sine waves, dynamically filling text using blend modes, custom path rendering, and mathematical wave functions.',
    overview: waterywavytextcolorMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/ac9fb5ca6d041effd68addf5bfde4b72',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://user-images.githubusercontent.com/56153409/278866038-94d87ce2-0b9b-4a37-8476-b7291aeb9b20.png'
    ],
    videos: [
      'https://user-images.githubusercontent.com/56153409/278870766-6dbfbfdc-4064-49d8-a6c2-c478dce92b07.mp4'
    ],
    thumbnail: {
      video: 'https://user-images.githubusercontent.com/56153409/278870766-6dbfbfdc-4064-49d8-a6c2-c478dce92b07.mp4',
      image: 'https://user-images.githubusercontent.com/56153409/278866038-94d87ce2-0b9b-4a37-8476-b7291aeb9b20.png'
    }
  },
  {
    id: 'glassy-image-effect',
    name: 'Glassy Image Effect',
    slug: 'glassy-image-effect',
    type: 'mini',
    description: 'A modern glassmorphism-inspired image effect built with Jetpack Compose, combining blur rendering, clipping, shadows, and layered composables to create a frosted glass appearance.',
    overview: glassyimageeffectMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/f7fc3f7e8cb967f69007f9a779367459',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://user-images.githubusercontent.com/56153409/278818511-c4fbc0bb-5b21-448f-aa43-b0b5ee1ce132.png'
    ],
    thumbnail: {
      image: 'https://user-images.githubusercontent.com/56153409/278818511-c4fbc0bb-5b21-448f-aa43-b0b5ee1ce132.png'
    }
  },
  {
    id: 'star-rating-fill-animation',
    name: 'Star Rating Fill Animation',
    slug: 'star-rating-fill-animation',
    type: 'mini',
    description: 'A Jetpack Compose Canvas animation that progressively fills a custom-drawn five-star rating using blend modes, path rendering, and declarative animations to create a smooth rating transition.',
    overview: starratingfillanimationMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/c17e9388ea92784c730f52ae944f4510',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/22460e20-7a48-4c92-b8ce-33cf48fc6f82',
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/22460e20-7a48-4c92-b8ce-33cf48fc6f82'
    }
  },
  {
    id: 'box-drop-shadow-effect',
    name: 'Box/Drop Shadow Effect',
    slug: 'box-drop-shadow-effect',
    type: 'mini',
    description: 'A custom Jetpack Compose shadow implementation that recreates CSS-like box shadows using low-level Canvas APIs, configurable blur, spread, offsets, and custom rendering logic.',
    overview: boxdropshadoweffectMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/45c8feb28f993f92293777c44812b8d1',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://user-images.githubusercontent.com/56153409/278876486-3c798b3d-4fbc-4923-97e7-1c8dedc2e2ef.png'
    ],
    thumbnail: {
      image: 'https://user-images.githubusercontent.com/56153409/278876486-3c798b3d-4fbc-4923-97e7-1c8dedc2e2ef.png'
    }
  },
  {
    id: 'expandable-menu-animation',
    name: 'Expandable Menu Animation',
    slug: 'expandable-menu-animation',
    type: 'mini',
    description: 'A custom expandable grid menu built with Jetpack Compose, featuring staggered animations, custom layout measurement, adaptive positioning, and smooth morphing transitions without using Lazy layouts.',
    overview: expandablemenuanimationMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/05874502ec6e922744827d9a6cd02ebe',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/ee879c3a-8b9f-431e-80a8-e4bee24d4ec0'
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/ee879c3a-8b9f-431e-80a8-e4bee24d4ec0'
    }
  },
  {
    id: 'animated-go-button-1',
    name: 'Animated Go Button 1',
    slug: 'animated-go-button-1',
    type: 'mini',
    description: 'A custom Jetpack Compose button animation that progressively draws a circular outline and transforms an arrow into view using Canvas, path rendering, scaling, and rotation animations.',
    overview: animatedgobutton1MD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/841fe7f4ef21a9457544af68cee235c1',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://user-images.githubusercontent.com/56153409/278941310-3f9a68f1-bca2-4fc4-aca4-2142574cc0d3.mp4'
    ],
    thumbnail: {
      video: 'https://user-images.githubusercontent.com/56153409/278941310-3f9a68f1-bca2-4fc4-aca4-2142574cc0d3.mp4'
    }
  },
  {
    id: 'animated-go-button-2',
    name: 'Animated Go Button 2',
    slug: 'animated-go-button-2',
    type: 'mini',
    description: 'A minimalist Jetpack Compose action button that animates a circular outline and smoothly reveals a directional arrow using Canvas rendering, progressive scaling, and fade-in transitions.',
    overview: animatedgobutton2MD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/1731bc3e33583fdb9f01c6e363a75594',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://user-images.githubusercontent.com/56153409/279030620-1cd652f2-ea89-4e40-9b56-e6605f5a153b.mp4'
    ],
    thumbnail: {
      video: 'https://user-images.githubusercontent.com/56153409/279030620-1cd652f2-ea89-4e40-9b56-e6605f5a153b.mp4'
    }
  },
  {
    id: 'clock-view',
    name: 'Clock View',
    slug: 'clock-view',
    type: 'mini',
    description: 'A custom analog clock built with Jetpack Compose Canvas, featuring procedurally drawn clock hands, dynamic time calculations, rotated tick marks, and responsive vector rendering without image assets.',
    overview: clockviewMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/e71631b07d9c93b5978f6da50f6419fc',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://gist.github.com/assets/56153409/bb27a871-c7af-4034-85c3-8404fc77b9ce'
    ],
    thumbnail: {
      image: 'https://gist.github.com/assets/56153409/bb27a871-c7af-4034-85c3-8404fc77b9ce'
    }
  },
  {
    id: 'custom-gradient-textfield',
    name: 'Custom Gradient TextField',
    slug: 'custom-gradient-textfield',
    type: 'mini',
    description: 'A fully custom Jetpack Compose TextField built from the ground up using `BasicTextField` and a custom `Layout`. It supports gradient backgrounds, configurable borders, leading/trailing content, custom focus handling, multi-line input, and advanced measurement logic for creating highly customizable input components.',
    overview: customgradienttextfieldMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/ae06599b968720b8320d435dbda71080',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/9a524900-e102-4b86-8c3d-fa49830e066b'
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/9a524900-e102-4b86-8c3d-fa49830e066b'
    }
  },
  {
    id: 'food-delivery-app-ui',
    name: 'Food Delivery App UI',
    slug: 'food-delivery-app-ui',
    type: 'mini',
    description: 'A modern Food Delivery application UI built entirely with Jetpack Compose, showcasing advanced custom layouts, handcrafted drawing APIs, reusable composables, and responsive UI design. The project demonstrates creating production-quality interfaces using custom measurement and placement logic instead of relying solely on standard layouts.',
    overview: fooddeliveryappuiMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/62f431f34174c1e20cc5e6addeb54586',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: []
  },
  {
    id: 'chat-app-ui-with-typing-indications',
    name: 'Chat App UI with Typing Indications',
    slug: 'chat-app-ui-with-typing-indications',
    type: 'mini',
    description: 'A modern Chat Application UI built entirely with Jetpack Compose, featuring conversation lists, chat details, animated typing indicators, custom message bubbles, responsive layouts, and state-driven interactions. The project showcases advanced Compose concepts including custom arrangements, animated transitions, reusable composables, and dynamic chat interfaces.',
    overview: chatappuiwithtypingindicationsMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/8a58bc9a3a5518ff0c612395d90206e5',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [],
    videos: [
      'https://gist.github.com/assets/56153409/5b697ad6-fcae-4eef-a29e-07cd37a803a3'
    ],
    thumbnail: {
      video: 'https://gist.github.com/assets/56153409/5b697ad6-fcae-4eef-a29e-07cd37a803a3'
    }
  },
  {
    id: 'instagram-multi-profile-container',
    name: 'Instagram Multi Profile Container',
    slug: 'instagram-multi-profile-container',
    type: 'mini',
    description: "A custom Instagram-style Multi Profile Container built using Jetpack Compose's low-level Layout API. The component dynamically overlaps multiple profile images while maintaining flexible spacing and supporting any number of profiles through custom measurement and placement.",
    overview: instagrammultiprofilecontainerMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/ef73fd202a0ce82173f765b1304e7b44',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://gist.github.com/assets/56153409/0f90ad95-eee7-420f-abf1-ba107cc641e0'
    ],
    thumbnail: {
      image: 'https://gist.github.com/assets/56153409/0f90ad95-eee7-420f-abf1-ba107cc641e0'
    }
  },
  {
    id: 'instagram-post-card-ui',
    name: 'Instagram Post Card UI',
    slug: 'instagram-post-card-ui',
    type: 'mini',
    description: 'A modern Instagram-inspired Post Card UI built entirely with Jetpack Compose, showcasing custom arrangements, reusable composables, rich text styling, carousel indicators, and responsive layouts. The project recreates the core Instagram post experience while demonstrating advanced Compose layout techniques and declarative UI design.',
    overview: instagrampostuiMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/b783efd34c7fe3bd28aeb447ac6023ff',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://gist.github.com/assets/56153409/fa28ceda-5f25-48ce-91fb-59a9655df039'
    ],
    thumbnail: {
      image: 'https://gist.github.com/assets/56153409/fa28ceda-5f25-48ce-91fb-59a9655df039'
    }
  },
  {
    id: 'instagram-profile-screen',
    name: 'Instagram Profile Screen',
    slug: 'instagram-profile-screen',
    type: 'mini',
    description: 'A modern Instagram-inspired Profile Screen built entirely with Jetpack Compose, featuring a handcrafted verification badge, responsive profile statistics, reusable follower cards, and custom Canvas drawing. The project demonstrates advanced Compose graphics, custom shapes, and component-driven UI design.',
    overview: instagramprofilescreenMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/a0df7c2ed5ee5dcda4a42786beecf287',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://gist.github.com/assets/56153409/0faba3fb-e5bb-4549-9b97-f62473e7eb25'
    ],
    thumbnail: {
      image: 'https://gist.github.com/assets/56153409/0faba3fb-e5bb-4549-9b97-f62473e7eb25'
    }
  },
  {
    id: 'spotify-ui',
    name: 'Spotify UI',
    slug: 'spotify-ui',
    type: 'mini',
    description: 'A modern Spotify-inspired music streaming interface built with Jetpack Compose, featuring a personalized home feed, recently played collections, horizontally scrolling recommendation sections, reusable music cards, custom chips, and a bottom navigation experience. The project focuses on creating scalable, component-driven UI architecture using declarative Compose APIs while closely following modern streaming application design principles.',
    overview: spotifymd,
    platforms: ['android', 'ios'],
    createdAt: "2023-12-12", // yyyy-mm-dd
    source: 'https://gist.github.com/Mikkareem/1995b7467d65e9da79e91fa35d3627df',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: [
      'https://gist.github.com/assets/56153409/a162268d-db1d-4c91-a7ca-3d66481a74e6'
    ],
    thumbnail: {
      image: 'https://gist.github.com/assets/56153409/a162268d-db1d-4c91-a7ca-3d66481a74e6'
    }
  },
  {
    id: 'kanban-board-ui',
    name: 'Kanban Board UI',
    slug: 'kanban-board-ui',
    type: 'mini',
    description: 'Description',
    overview: kanbanboardviewMD,
    platforms: ['android', 'ios'],
    source: 'https://gist.github.com/Mikkareem/',
    technologies: [],
    tags: [
      { color: ['#ef4444', '#f43f5e'], label: 'Jetpack Compose' },
      { color: ['#ef4444', '#f43f5e'], label: 'Animations' }
    ],
    screenshots: []
  }
];
