import { Vector3 } from "three";

export const DEFAULT_Z_RANGE: [number, number] = [-2, 2];

export function lerpZ(
  zNorm: number,
  range: [number, number] = DEFAULT_Z_RANGE
): number {
  return range[0] + (range[1] - range[0]) * zNorm;
}

export type SkillItem = {
  name: string;
  z: number;
  basePos?: Vector3;
};

export type SkillBalloonConfig = {
  category: string;
  boxColor: string;
  textColor: string;
  ropeColor: string;
  zRange?: [number, number]; // Configurable depth range, defaults to DEFAULT_Z_RANGE [-2, 2]
  skills: Array<SkillItem>;
  speedMultiplier: number;
  phaseOffset: number;
};


// x=0.07..0.92, y=0.17..0.92
export const SKILLS_BALLOON_CONFIGS: Array<SkillBalloonConfig> = [
  {
    category: 'Mobile',
    zRange: [-2, 2],
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    skills: [
      {
        name: 'Kotlin Multiplatform',
        z: getRandom()
      },
      {
        name: 'Jetpack Compose',
        z: getRandom()
      },
      {
        name: 'Compose Multiplatform',
        z: getRandom()
      },
      {
        name: 'Jetpack\nNavigation Compose',
        z: getRandom()
      },
      {
        name: 'Jetpack\nNavigation 3',
        z: getRandom()
      },
      {
        name: 'Jetpack\nRoom (2.x,3.x)',
        z: getRandom()
      },
      {
        name: 'Jetpack Paging 3',
        z: getRandom()
      },
      {
        name: 'Jetpack WorkManager',
        z: getRandom()
      },
      {
        name: 'Jetpack DataStore',
        z: getRandom()
      },
      {
        name: 'Jetpack Glance',
        z: getRandom()
      },
      {
        name: 'Koin',
        z: getRandom()
      },
      {
        name: 'Koin Annotations',
        z: getRandom()
      },
      {
        name: 'Dagger Hilt',
        z: getRandom()
      },
      {
        name: 'Ktor Client',
        z: getRandom()
      },
      {
        name: 'Retrofit',
        z: getRandom()
      },
      {
        name: 'Coil 3.0',
        z: getRandom()
      },
      {
        name: 'Firebase Integrations',
        z: getRandom()
      },
      {
        name: 'Google Maps Compose',
        z: getRandom()
      },
    ],
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
  },

  {
    category: 'DevOps',
    zRange: [-2, 2],
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'Docker',
        z: getRandom()
      },
      {
        name: 'Docker Compose',
        z: getRandom()
      },
      {
        name: 'Kubernetes',
        z: getRandom()
      },
      {
        name: 'Helm Charts\n& Templates',
        z: getRandom()
      },
      {
        name: 'Terraform',
        z: getRandom()
      },
      {
        name: 'ArgoCD',
        z: getRandom()
      },
      {
        name: 'Cloud\n(AWS & GCP)',
        z: getRandom()
      },
      {
        name: 'Jenkins',
        z: getRandom()
      },
      {
        name: 'GitHub Actions',
        z: getRandom()
      },
      {
        name: 'Prometheus',
        z: getRandom()
      },
      {
        name: 'Grafana\n(Alloy, Loki, Tempo)',
        z: getRandom()
      },
      {
        name: 'OpenTelemetry',
        z: getRandom()
      },
      {
        name: 'ELK Stack',
        z: getRandom()
      },
      {
        name: 'Splunk',
        z: getRandom()
      },
      {
        name: 'Consul',
        z: getRandom()
      },
      {
        name: 'Vault',
        z: getRandom()
      },
    ]
  },

  {
    category: 'Backend',
    zRange: [-2, 2],
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#fe5d26',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'Spring Boot',
        z: getRandom()
      },
      {
        name: 'Java',
        z: getRandom()
      },
      {
        name: 'Kotlin',
        z: getRandom()
      },
      {
        name: 'Ktor Server',
        z: getRandom()
      },
      {
        name: 'NodeJs',
        z: getRandom()
      },
      {
        name: 'Spring Cloud',
        z: getRandom()
      },
      {
        name: 'Kafka',
        z: getRandom()
      },
      {
        name: 'RabbitMQ',
        z: getRandom()
      },
      {
        name: 'Redis',
        z: getRandom()
      },
      {
        name: 'Caffeine Cache',
        z: getRandom()
      },
      {
        name: 'SQL',
        z: getRandom()
      },
      {
        name: 'MySQL',
        z: getRandom()
      },
      {
        name: 'PostgreSQL',
        z: getRandom()
      },
      {
        name: 'H2',
        z: getRandom()
      },
      {
        name: 'MongoDB',
        z: getRandom()
      },
      {
        name: 'Cassandra',
        z: getRandom()
      },
      {
        name: 'Neo4j',
        z: getRandom()
      },
      {
        name: 'Stripe SDK',
        z: getRandom()
      },
      {
        name: 'Firebase\nAdmin SDK',
        z: getRandom()
      },
      {
        name: 'GCP/AWS SDK',
        z: getRandom()
      },
      {
        name: 'JUnit Testing',
        z: getRandom()
      },
    ]
  },

  {
    category: 'Spring',
    zRange: [-2, 2],
    boxColor: "#9e0059",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'Spring Boot\n/w Java & Kotlin',
        z: getRandom()
      },
      {
        name: 'Spring Boot\nWeb & Webflux (Kotlin)',
        z: getRandom()
      },
      {
        name: 'Spring Security',
        z: getRandom()
      },
      {
        name: 'Spring OAuth\nAuthorization Server',
        z: getRandom()
      },
      {
        name: 'Spring OAuth\nClient',
        z: getRandom()
      },
      {
        name: 'Spring OAuth\nResource Server',
        z: getRandom()
      },
      {
        name: 'Spring Data\n(JPA & JDBC)',
        z: getRandom()
      },
      {
        name: 'Spring Data MongoDB',
        z: getRandom()
      },
      {
        name: 'Spring Data Neo4J',
        z: getRandom()
      },
      {
        name: 'Spring Data Cassandra',
        z: getRandom()
      },
      {
        name: 'Spring Boot Actuator',
        z: getRandom()
      },
      {
        name: 'Spring Boot Micrometer',
        z: getRandom()
      },
      {
        name: 'Spring AOP',
        z: getRandom()
      },
      {
        name: 'Spring Cloud\nGateway',
        z: getRandom()
      },
      {
        name: 'Spring Cloud\nConfig Server',
        z: getRandom()
      },
      {
        name: 'Spring Cloud\nConfig Client',
        z: getRandom()
      },
      {
        name: 'Spring Cloud\nConfig Client (Vault)',
        z: getRandom()
      },
      {
        name: 'Spring Cloud\nStreams (Kafka)',
        z: getRandom()
      },
      {
        name: 'Spring Cloud\nBus',
        z: getRandom()
      },
      {
        name: 'Spring Cloud\nConsul',
        z: getRandom()
      },
    ]
  },

  {
    category: 'Testing',
    zRange: [-2, 2],
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'JUnit 4 & 5',
        z: getRandom()
      },
      {
        name: 'KoTest',
        z: getRandom()
      },
      {
        name: 'TestBalloons',
        z: getRandom()
      },
      {
        name: 'Konsist',
        z: getRandom()
      },
      {
        name: 'Spring Boot\nTesting',
        z: getRandom()
      },
      {
        name: 'Spring Testing\n(Web/WebFlux)',
        z: getRandom()
      },
      {
        name: 'Spring Security Testing',
        z: getRandom()
      },
      {
        name: 'TestContainers',
        z: getRandom()
      },
      {
        name: 'WireMock',
        z: getRandom()
      },
      {
        name: 'ToxiProxy',
        z: getRandom()
      },
      {
        name: 'UIAutomator Tests',
        z: getRandom()
      },
      {
        name: 'Compose UI /\nUnit Tests',
        z: getRandom()
      },
      {
        name: 'Robolectric\nRoborazzi',
        z: getRandom()
      },
      {
        name: 'Screenshot Testing',
        z: getRandom()
      },
      {
        name: 'Benchmark Testing',
        z: getRandom()
      },
      {
        name: 'Unit / Integration\nTests',
        z: getRandom()
      },
      {
        name: 'E2E & UI Tests',
        z: getRandom()
      },
      {
        name: 'ViTest',
        z: getRandom()
      },
      {
        name: 'Playwright Test',
        z: getRandom()
      },
    ]
  },

  {
    category: 'Web',
    zRange: [-2, 2],
    boxColor: "#02c3bd",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'React.js',
        z: getRandom()
      },
      {
        name: 'Next.js',
        z: getRandom()
      },
      {
        name: 'TypeScript',
        z: getRandom()
      },
      {
        name: 'JavaScript',
        z: getRandom()
      },
      {
        name: 'Tailwind CSS',
        z: getRandom()
      },
      {
        name: 'TanStack Query',
        z: getRandom()
      },
      {
        name: 'TanStack Router',
        z: getRandom()
      },
      {
        name: 'Zustand',
        z: getRandom()
      },
      {
        name: 'Redux',
        z: getRandom()
      },
      {
        name: 'React Router',
        z: getRandom()
      },
      {
        name: 'GSAP Animations',
        z: getRandom()
      },
      {
        name: 'React Motion\n(Framer)',
        z: getRandom()
      },
      {
        name: 'Three.js',
        z: getRandom()
      },
      {
        name: 'React Three Fiber',
        z: getRandom()
      },
      {
        name: 'React Three Drei',
        z: getRandom()
      },
      {
        name: 'React Three Rapier',
        z: getRandom()
      },
      {
        name: 'p5.js',
        z: getRandom()
      },
      {
        name: 'ViTest',
        z: getRandom()
      },
      {
        name: 'Playwright Test',
        z: getRandom()
      },
    ],
  },

  {
    category: 'Cloud',
    zRange: [-2, 2],
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'AWS EC2',
        z: getRandom()
      },
      {
        name: 'AWS VPC',
        z: getRandom()
      },
      {
        name: 'AWS S3',
        z: getRandom()
      },
      {
        name: 'AWS Lambda',
        z: getRandom()
      },
      {
        name: 'AWS RDS',
        z: getRandom()
      },
      {
        name: 'AWS SNS',
        z: getRandom()
      },
      {
        name: 'AWS EKS',
        z: getRandom()
      },
      {
        name: 'GCP Compute Engine',
        z: getRandom()
      },
      {
        name: 'GCP VPC',
        z: getRandom()
      },
      {
        name: 'GCP Cloud Storage',
        z: getRandom()
      },
      {
        name: 'GCP Cloud Run',
        z: getRandom()
      },
      {
        name: 'GCP Cloud SQL',
        z: getRandom()
      },
      {
        name: 'GCP Pub / Sub',
        z: getRandom()
      },
      {
        name: 'GCP GKE',
        z: getRandom()
      },
      {
        name: 'Firebase Auth',
        z: getRandom()
      },
      {
        name: 'Firebase Storage',
        z: getRandom()
      },
      {
        name: 'Firebase\nReal-time Database',
        z: getRandom()
      },
      {
        name: 'Firebase\nPush Notification',
        z: getRandom()
      },
      {
        name: 'Firebase Crashlytics',
        z: getRandom()
      },
      {
        name: 'Firebase Analytics',
        z: getRandom()
      },
      {
        name: 'Firebase App Distribution',
        z: getRandom()
      },
    ],
  }
];

export function getRandomX() {
  return Math.min(Math.max(getRandom(), 0.07), 0.92);
}

export function getRandomY() {
  return Math.min(Math.max(getRandom(), 0.17), 0.92);
}

export function getRandomZ() {
  return getRandom();
}

export function getRandom() { return Math.random() }