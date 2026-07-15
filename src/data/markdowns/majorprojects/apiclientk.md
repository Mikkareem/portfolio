# ApiClientK

**ApiClientK** is a modern, cross-platform REST API client built with **Kotlin Multiplatform** and **Compose Multiplatform**, providing a fast and intuitive way to test, debug, and interact with HTTP APIs across **Android**, **iOS**, and **Desktop**. Inspired by tools like Postman, the application focuses on delivering a native, lightweight experience while sharing a single codebase across multiple platforms.

The project showcases modern Kotlin development practices, combining declarative UI, scalable architecture, and cross-platform networking into a production-ready application.

---

## Highlights

- **Cross-Platform Application**
  - Single codebase targeting Android, iOS, and Desktop.
  - Shared business logic and user interface across all platforms.

- **REST API Testing**
  - Send HTTP requests using common methods such as `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
  - Configure request URLs, headers, query parameters, and request bodies.
  - View response status, headers, and payload.

- **Custom JSON Viewer**
  - Beautifully formatted and syntax-highlighted JSON responses.
  - Expandable and collapsible JSON tree.
  - Improved readability for large and deeply nested payloads.

- **Responsive User Experience**
  - Adaptive layouts optimized for phones, tablets, and desktop screens.
  - Smooth animations and transitions for an intuitive workflow.

---

## Architecture

The application follows a modular, clean architecture that separates presentation, networking, and shared business logic, enabling maintainability and scalability.

### Core Technologies

- **Kotlin Multiplatform (KMP)**
  - Shared business logic across Android, iOS, and Desktop.
  - Platform-specific implementations only where necessary.

- **Compose Multiplatform (CMP)**
  - Declarative UI shared across all supported platforms.
  - Responsive layouts with a consistent user experience.

- **Ktor Client**
  - Cross-platform HTTP client for executing REST API requests.
  - Supports configurable requests, headers, authentication, and response handling.

- **Koin**
  - Dependency Injection for shared and platform modules.
  - Simplifies dependency management and improves testability.

- **Jetpack Navigation 3**
  - Type-safe navigation.
  - Predictable navigation state.
  - Modular navigation architecture.

---

## Technical Focus

ApiClientK demonstrates how to build a sophisticated developer tool using modern Kotlin technologies while maintaining a shared codebase across multiple platforms.

Key areas include:

- Cross-platform networking with Ktor Client.
- Declarative UI using Compose Multiplatform.
- Responsive layouts for mobile and desktop.
- Custom JSON parsing and visualization.
- State-driven UI with reactive updates.
- Dependency Injection using Koin.
- Navigation using the latest Navigation 3 APIs.
- Modular architecture for scalability and maintainability.

---

## Skills Demonstrated

- Kotlin Multiplatform Development
- Compose Multiplatform UI
- Android Development
- iOS Development
- Desktop Application Development
- REST API Client Development
- HTTP Networking with Ktor Client
- JSON Parsing & Visualization
- Responsive UI Design
- Animated User Interfaces
- Dependency Injection with Koin
- Navigation Architecture
- State Management
- Clean Architecture
- Modular Project Structure