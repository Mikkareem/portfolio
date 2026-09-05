import { Blog } from '../types';

export const blogsData: Blog[] = [
  {
    id: 'metaball-gooey-effect-in-jetpack-compose-using-rendereffect',
    title: 'Metaball / Gooey Effect in Jetpack Compose using RenderEffect',
    slug: 'metaball-gooey-effect-in-jetpack-compose-using-rendereffect',
    summary: 'In this article, we will explore how a metaball effect works, why the combination of blur and alpha thresholding creates the characteristic gooey appearance, and how to implement the effect in Jetpack Compose using RenderEffect and ColorMatrix transformations. Along the way, we will break down the rendering pipeline and examine the role each component plays in creating smooth, fluid interactions.',
    tags: ['Gooey Effect', 'MetaBall', 'Animations', 'Jetpack Compose', 'RenderEffect'],
    date: 'May 30, 2026',
    readTime: '7 min read',
    isExternal: true,
    externalUrl: 'https://medium.com/@irsathkareem/metaball-gooey-effect-in-jetpack-compose-using-rendereffect-97919d30948d',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*sWi_3X-maMcVwrD9inMmdg.png'
  },
  {
    id: 'particle-emitters-using-jetpack-compose-physics-simulation-using-targetbasedanimation',
    title: 'Particle Emitters using Jetpack Compose — Physics simulation using TargetBasedAnimation<T>',
    slug: 'particle-emitters-using-jetpack-compose-physics-simulation-using-targetbasedanimation',
    summary: 'In this article, we will explore how to create particle emitters in Jetpack Compose using TargetBasedAnimation<T>. Although this API is commonly used for driving animations between states, it can also serve as the foundation for custom physics simulations. By combining animation specifications with particle lifecycle management, we can create visually rich effects that are both efficient and highly customizable',
    tags: ['Particle Emitters', 'Physics', 'Jetpack Compose', 'Animations', 'Kotlin'],
    date: 'May 27, 2026',
    readTime: '11 min read',
    isExternal: true,
    externalUrl: 'https://medium.com/@irsathkareem/particle-emitters-using-jetpack-compose-physics-simulation-using-targetbasedanimation-t-5c67083a23cf',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Wa-JCo1Kbju2rZXOqYy8fw.png'
  },
  {
    id: 'android-realtime-firebase-firestore-data-with-kotlin-coroutines-and-callbackflow',
    title: 'Android: Realtime Firebase FireStore data with Kotlin coroutines and callbackFlow',
    slug: 'android-realtime-firebase-firestore-data-with-kotlin-coroutines-and-callbackflow',
    summary: 'When building modern Android applications, real-time data updates are often essential — especially when working with cloud databases like Firebase Firestore. Instead of polling for data, Firestore provides snapshot listeners that push changes to your app whenever the underlying data changes. In Kotlin, we can take this a step further by wrapping these listeners in coroutines and flows, giving us a clean, reactive API.',
    tags: ['Firebase', 'Firestore', 'Coroutines', 'Kotlin', 'CallbackFlow', 'Android'],
    date: 'Sep 01, 2025',
    readTime: '3 min read',
    isExternal: true,
    externalUrl: 'https://medium.com/@irsathkareem/android-realtime-firebase-firestore-data-with-kotlin-coroutines-and-callbackflow-0f6772d07fde',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*R1rqLKRjKWL-Zd9263c8lA.png'
  },
  {
    id: 'google-maps-compose-custom-marker-icon-with-dynamic-images',
    title: 'Google Maps Compose: Custom Marker Icon with dynamic images',
    slug: 'google-maps-compose-custom-marker-icon-with-dynamic-images',
    summary: 'In Jetpack Compose, Google Maps are the one which I want to explore more. In that note, Today, I like to write about the concept of Custom Marker icons in Google maps',
    tags: ['Android', 'Jetpack Compose', 'Google Maps', 'Kotlin', 'Custom Marker'],
    date: 'Aug 30, 2025',
    readTime: '3 min read',
    isExternal: true,
    externalUrl: 'https://medium.com/@irsathkareem/google-maps-compose-custom-marker-icon-with-dynamic-images-df85dfa4d9d8',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hn1QNEt_Dhq6ochU7s5JTw.png'
  }
];

/*
Internal Blog Structure

{
    id: 'spring-cloud-kubernetes',
    title: 'Building Resilient Microservices with Spring Cloud and Kubernetes',
    slug: 'spring-cloud-k8s-resilience',
    summary: 'Bridging the cloud-native gap. How to harmonize Spring Boot microservices with Kubernetes native services, configs, and live secret rotation matrices.',
    tags: ['Spring Cloud', 'Kubernetes', 'DevOps', 'Java'],
    date: 'May 18, 2026',
    readTime: '12 min read',
    isExternal: false,
    thumbnail: 'https://images.unsplash.com/photo-1667372393086-9d4001d51417?auto=format&fit=crop&q=80&w=600',
    content: `Markdown Raw Content`
}

*/