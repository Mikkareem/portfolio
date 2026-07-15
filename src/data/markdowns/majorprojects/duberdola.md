# Duber-Dola

**Duber-Dola** is a cross-platform ride-hailing application inspired by services like Uber and Ola, built using **Kotlin Multiplatform** and **Compose Multiplatform**. The project simulates the core ride-booking experience, including interactive maps, location selection, route visualization, and trip management across **Android** and **iOS**.

The application demonstrates how a shared Kotlin codebase can be combined with native mapping capabilities to build a responsive, location-aware mobile experience while maintaining platform-specific integrations where required.

---

# Features

## Ride Booking

- Select pickup and destination locations.
- Interactive map-based location selection.
- Simulated ride booking workflow.
- Trip confirmation and ride details.
- Estimated travel route visualization.

---

## Maps Integration

Native Google Maps integration provides an interactive mapping experience.

Features include:

- Interactive map navigation.
- Pickup and destination markers.
- Route visualization.
- Camera movement and zoom controls.
- User location display.

---

## Cross-Platform Experience

- Shared business logic across Android and iOS.
- Consistent UI built with Compose Multiplatform.
- Platform-specific integrations for native mapping capabilities.
- Responsive layouts optimized for different device sizes.

---

# Architecture

The project follows a clean, modular architecture that separates presentation, domain logic, and platform-specific implementations.

## Core Technologies

### Kotlin Multiplatform (KMP)

- Shared business logic.
- Shared domain and data layers.
- Platform-specific implementations only where necessary.

### Compose Multiplatform (CMP)

- Declarative UI shared across Android and iOS.
- State-driven interface.
- Responsive layouts.

### Google Maps

- Native Google Maps SDK integration.
- Interactive map rendering.
- Location markers and camera controls.

### CocoaPods

- Native iOS dependency management.
- Integration of platform-specific libraries into the shared KMP project.

---

# Technical Focus

The project demonstrates how to integrate native platform SDKs into a Kotlin Multiplatform application while maintaining a unified architecture.

Key areas include:

- Cross-platform mobile development.
- Native Google Maps integration.
- Platform interoperability.
- Shared UI with Compose Multiplatform.
- Responsive interface design.
- State-driven navigation and user interactions.
- Modular architecture for maintainability.

---

# Skills Demonstrated

- Kotlin Multiplatform Development
- Compose Multiplatform UI
- Android Development
- iOS Development
- Google Maps SDK Integration
- CocoaPods Integration
- Location-Based Applications
- Responsive UI Design
- State Management
- Platform Interoperability
- Clean Architecture
- Modular Project Structure