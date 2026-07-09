import { Blog } from '../types';

export const blogsData: Blog[] = [
  {
    id: 'kmp-architecture',
    title: 'Architecting Kotlin Multiplatform Apps with Jetpack Compose',
    slug: 'kmp-architecture-jetpack-compose',
    summary: 'A deep dive into clean architecture in cross-platform mobile setups. Discussing dependency injection, local data caches, and seamless UI sharing across Android and iOS.',
    tags: ['Kotlin', 'Compose', 'Mobile Development', 'KMP'],
    date: 'June 05, 2026',
    readTime: '8 min read',
    isExternal: false,
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=600',
    content: `
# Architecting Kotlin Multiplatform Apps with Jetpack Compose

In the rapidly evolving world of mobile development, **Kotlin Multiplatform (KMP)** has emerged as a premier framework for sharing business logic across iOS and Android without sacrificing native performance or platform fidelity. Together with **Compose Multiplatform** (Jetpack Compose for cross-platform), we can now write our entire application—from network calls down to button clicks—in a single, unified codebase.

This article shares a proven clean architecture system used in production apps, highlighting how to manage sharing logic, state models, and custom canvas-based transitions.

---

## The Layered Architecture

To achieve clean, maintainable code, we segment our shared module (under the \`shared/\` directory) into three immutable layers:

1. **Domain Layer**: Contains raw business models, high-order use cases, and repository interfaces. It is written in pure Kotlin with absolute zero external dependencies.
2. **Data Layer**: Implements those repository interfaces. It integrates **Ktor** for networking, **Room** for queryable cache indices, and **Koin** to manage dependency injection pipelines.
3. **UI Layer**: Manages the screen state and views using **Compose Multiplatform**. Common navigation and custom composables are handled entirely in the shared source sets.

### Architecture Topology Look

\`\`\`
  [ UI Layer (Compose Multiplatform) ]
                  ↓
       [ Use Cases / Interactors ]
                  ↓
  [ Repositories (Domain Interfaces) ]
                  ↓
 [ Data Sources (Room, Ktor HTTP Client) ]
\`\`\`

---

## Concrete Example: Network Request with Ktor

Here is a snippet showing how we coordinate a high-performance network query using Ktor inside the shared data repository:

\`\`\`kotlin
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

class ProfileRepositoryImpl(
    private val httpClient: HttpClient,
    private val localDatabase: RoomLocalStore
) : ProfileRepository {

    override fun fetchProfile(userId: String): Flow<Resource<Profile>> = flow {
        emit(Resource.Loading())
        try {
            // Fetching remote data safely
            val remoteProfile: RemoteProfileDto = httpClient.get("https://api.kareem.dev/users/$userId").body()
            
            // Persist locally
            localDatabase.saveProfile(remoteProfile.toLocalEntity())
            
            emit(Resource.Success(remoteProfile.toDomainModel()))
        } catch (e: Exception) {
            val cachedValue = localDatabase.getProfile(userId)
            if (cachedValue != null) {
                emit(Resource.Success(cachedValue.toDomainModel()))
            } else {
                emit(Resource.Error("Network failure and no offline logs found", e))
            }
        }
    }
}
\`\`\`

## Key Takeaways

Using Jetpack Compose alongside Kotlin Multiplatform gives you unmatched speed of execution. By locking in our repositories in pure shared Kotlin, we avoid the drift in business logic that invariably plagues dual-platform development teams.

What are your thoughts on sharing UI using Compose Multiplatform? Let me know in the comments!
    `
  },
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
    content: `
# Building Resilient Microservices with Spring Cloud and Kubernetes

Modern enterprise architectures demand highly resilient, horizontally scalable service meshes. If you are developing with **Spring Boot** and deploying into **Kubernetes**, you should evaluate where Spring Cloud's features overlap with Kubernetes native abstractions.

Traditionally, we relied on Eureka, Spring Cloud Config, and Zuul. Today, Kubernetes handles load balancing, DNS routing, and config maps natively. This guide describes how to achieve the absolute best of both worlds.

---

## Synchronizing Configurations

Instead of managing an independent Spring Cloud Config Server, configure your applications to watch Kubernetes \`ConfigMap\` and \`Secret\` resources directly.

Add the following starter dependency:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-kubernetes-fabric8-config</artifactId>
</dependency>
\`\`\`

Then configure your bootstrap lifecycle:

\`\`\`yaml
# bootstrap.yml
spring:
  cloud:
    kubernetes:
      config:
        name: account-service-config
        namespace: production
        sources:
          - name: common-shared-properties
\`\`\`

---

## Circuit Breaking & Resilience

In a highly distributed network, failures are inevitable. Use **Resilience4j** mapped with Spring’s declaration APIs to prevent cascade failures.

\`\`\`java
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;

@Service
public class ShowInventoryService {

    @CircuitBreaker(name = "ticketService", fallbackMethod = "retrieveCachedShows")
    public List<ShowDetails> getActiveShows() {
        // Query external NoteMyShow catalog API
        return restTemplate.getForObject("http://ticket-service/api/shows", List.class);
    }

    public List<ShowDetails> retrieveCachedShows(Exception exception) {
        // Safe fallback logic - local mock or offline records
        return List.of(new ShowDetails("Offline Placeholder", "Classic Retro Collection"));
    }
}
\`\`\`

---

## Kubernetes Probe Integrations

Spring Boot Actuator integrates flawlessly with Kubernetes liveness and readiness states. Kubernetes will query the \`/actuator/health/liveness\` and \`/actuator/health/readiness\` ports before routing high-volume live traffic to your container.

This simple coupling protects users from zero-downtime rolling upgrades because cold Java VMs are kept out of active service routes.
    `
  },
  {
    id: 'medium-compose-multiplatform',
    title: 'How Compose Multiplatform is Changing Mobile Development Forever',
    slug: 'medium-compose-multiplatform-future',
    summary: 'An depth industry exploration published on Medium. Analyzing runtime benchmarks, memory footprints across platforms, and developer velocity analytics.',
    tags: ['Compose', 'Medium', 'Kotlin', 'Mobile'],
    date: 'April 20, 2026',
    readTime: '6 min read',
    isExternal: true,
    externalUrl: 'https://medium.com/@irsathkareem/compose-multiplatform-future-of-mobile-ui',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'medium-argocd-gitops',
    title: 'Declarative GitOps Pipelines with ArgoCD and Helm on AWS EKS',
    slug: 'medium-gitops-argocd-helm-eks',
    summary: 'Step-by-step masterclass published on Medium. Deploying high-availability infrastructure using Terraform, configuring cluster ingress, and automating continuous delivery triggers.',
    tags: ['ArgoCD', 'GitOps', 'DevOps', 'AWS'],
    date: 'March 11, 2026',
    readTime: '10 min read',
    isExternal: true,
    externalUrl: 'https://medium.com/@irsathkareem/declarative-gitops-aws-eks-helm',
    thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=600'
  }
];
