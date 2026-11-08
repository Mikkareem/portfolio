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

  {
    category: 'DevOps',
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'Docker',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Docker Compose',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Kubernetes',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Helm Charts\n& Templates',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Terraform',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'ArgoCD',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Cloud\n(AWS & GCP)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Jenkins',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GitHub Actions',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Prometheus',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Grafana\n(Alloy, Loki, Tempo)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'OpenTelemetry',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'ELK Stack',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Splunk',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Consul',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Vault',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
    ]
  },

  {
    category: 'Backend',
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'Spring Boot',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Java',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Kotlin',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Ktor Server',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'NodeJs',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Kafka',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'RabbitMQ',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Redis',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Caffeine Cache',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'SQL',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'MySQL',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'PostgreSQL',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'H2',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'MongoDB',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Cassandra',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Neo4j',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Stripe SDK',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase\nAdmin SDK',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP/AWS SDK',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'JUnit Testing',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
    ]
  },

  {
    category: 'Spring',
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'Spring Boot\n/w Java & Kotlin',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Boot\nWeb & Webflux (Kotlin)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Security',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring OAuth\nAuthorization Server',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring OAuth\nClient',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring OAuth\nResource Server',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Data\n(JPA & JDBC)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Data MongoDB',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Data Neo4J',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Data Cassandra',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Boot Actuator',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Boot Micrometer',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring AOP',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud\nGateway',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud\nConfig Server',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud\nConfig Client',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud\nConfig Client (Vault)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud\nStreams (Kafka)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud\nBus',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Cloud\nConsul',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
    ]
  },

  {
    category: 'Testing',
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'JUnit 4 & 5',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'KoTest',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'TestBalloons',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Konsist',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Boot\nTesting',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Testing\n(Web/WebFlux)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Spring Security Testing',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'TestContainers',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'WireMock',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'ToxiProxy',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'UIAutomator Tests',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Compose UI /\nUnit Tests',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Robolectric\nRoborazzi',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Screenshot Testing',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Benchmark Testing',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Unit / Integration\nTests',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'E2E & UI Tests',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'ViTest',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Playwright Test',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
    ]
  },

  {
    category: 'Web',
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'React.js',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Next.js',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'TypeScript',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'JavaScript',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Tailwind CSS',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'TanStack Query',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'TanStack Router',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Zustand',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Redux',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'React Router',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GSAP Animations',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'React Motion\n(Framer)',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Three.js',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'React Three Fiber',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'React Three Drei',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'React Three Rapier',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'p5.js',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'ViTest',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Playwright Test',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
    ],
  },

  {
    category: 'Cloud',
    boxColor: "#150578",
    textColor: '#fff',
    ropeColor: '#150578',
    speedMultiplier: getRandom(),
    phaseOffset: getRandom(),
    skills: [
      {
        name: 'AWS EC2',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'AWS VPC',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'AWS S3',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'AWS Lambda',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'AWS RDS',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'AWS SNS',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'AWS EKS',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP Compute Engine',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP VPC',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP Cloud Storage',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP Cloud Run',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP Cloud SQL',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP Pub / Sub',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'GCP GKE',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase Auth',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase Storage',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase\nReal-time Database',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase\nPush Notification',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase Crashlytics',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase Analytics',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
      {
        name: 'Firebase App Distribution',
        basePos: new Vector3(getRandomX(), getRandomY(), getRandomZ())
      },
    ],
  }
];

function getRandomX() {
  return Math.min(Math.max(getRandom(), 0.07), 0.92);
}

function getRandomY() {
  return Math.min(Math.max(getRandom(), 0.17), 0.92);
}

function getRandomZ() {
  return getRandom();
}

function getRandom() { return Math.random() }