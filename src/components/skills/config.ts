import { Vector3 } from "three";

export type SkillBalloonConfig = {
  category: string,
  boxColor: string,
  textColor: string,
  ropeColor: string,
  skills: {
    name: string,
    basePos: Vector3
  }[],
  speedMultiplier: number,
  phaseOffset: number,
}


// x=0.07..0.92, y=0.17..0.92
export const SKILLS_BALLOON_CONFIGS: Array<SkillBalloonConfig> = [
  {
    category: 'Mobile',
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    skills: [
      {
        name: 'Kotlin Multiplatform',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack Compose',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Compose Multiplatform',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack\nNavigation Compose',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack\nNavigation 3',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack\nRoom (2.x,3.x)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack Paging 3',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack WorkManager',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack DataStore',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jetpack Glance',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Koin',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Koin Annotations',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Dagger Hilt',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Ktor Client',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Retrofit',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Coil 3.0',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase Integrations',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Google Maps Compose',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
    ],
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
  },






  // {
  //   color: "#ff3366",
  //   basePos: new Vector3(getRandomX(), getRandomY(), 0),
  //   speedMultiplier: 1.0,
  //   phaseOffset: 0.0,
  // },
  // {
  //   color: "#33ccff",
  //   basePos: new Vector3(getRandomX(), getRandomY(), 0),
  //   speedMultiplier: 1.2,
  //   phaseOffset: 1.5,
  // },
  // {
  //   color: "#ffcc00",
  //   basePos: new Vector3(getRandomX(), getRandomY(), 0),
  //   speedMultiplier: 0.9,
  //   phaseOffset: 2.8,
  // },
  // {
  //   color: "#9933ff",
  //   basePos: new Vector3(getRandomX(), getRandomY(), 0),
  //   speedMultiplier: 1.1,
  //   phaseOffset: 4.2,
  // },
  // {
  //   color: "#33ff99",
  //   basePos: new Vector3(getRandomX(), getRandomY(), 0),
  //   speedMultiplier: 1.3,
  //   phaseOffset: 5.5,
  // },
];

function getRandom() { return Math.random() }

function getRandomX() {
  return Math.min(Math.max(getRandom(), 0.07), 0.92);
}

function getRandomY() {
  return Math.min(Math.max(getRandom(), 0.17), 0.92);
}

function getRandomZ() {
  return getRandom();
}