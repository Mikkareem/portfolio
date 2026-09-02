# ChessK — Online Real-Time Room-Based Chess Game

A modern, cross-platform **real-time multiplayer Chess application** built with **Kotlin Multiplatform** and **Compose Multiplatform**, delivering a consistent user experience across **Android**, **iOS**, and **Desktop**.

**ChessK** is designed around online room-based chess gameplay, allowing players to create or join private game rooms and compete against each other in real time. The application handles chess rules, legal move validation, turn management, synchronized game state, player sessions, and complete game lifecycle management.

Designed with a **modular and scalable architecture**, the project demonstrates how a shared Kotlin codebase can power multiple platforms while maintaining responsive UI, reusable business logic, and platform-specific integrations where required.

---

## Highlights

* **Cross-Platform Application**

  * Shared application and business logic across Android, iOS, and Desktop.
  * Platform-specific implementations only where required.
  * Consistent UI and behavior across supported platforms.

* **Real-Time Multiplayer Chess**

  * Online player-versus-player chess.
  * Real-time move synchronization between players.
  * Automatic turn management.
  * Synchronized board and game state.
  * Handles player connection and disconnection states.

* **Room-Based Gameplay**

  * Create a new chess room.
  * Join an existing room using a room code.
  * Support for private multiplayer matches.
  * Player and room state management.
  * Game starts when the required players are connected.

* **Chess Game Engine**

  * Legal chess move validation.
  * Turn-based gameplay.
  * Check and checkmate detection.
  * Stalemate and draw detection.
  * Castling support.
  * En passant support.
  * Pawn promotion.
  * Resignation and game completion handling.

* **Interactive Chessboard**

  * Tap/click-based piece selection and movement.
  * Visual indication of selected pieces.
  * Legal move highlighting.
  * Last-move indication.
  * Captured piece handling.
  * Responsive board layout across different screen sizes.

* **Game State & Synchronization**

  * Centralized chess game state.
  * Real-time updates between connected players.
  * Move history tracking.
  * Player color assignment.
  * Reliable synchronization of turns and board positions.

* **Modern UI**

  * Built with **Compose Multiplatform**.
  * Responsive layouts for mobile and desktop.
  * State-driven UI architecture.
  * Smooth transitions and animations.
  * Modern chess-focused user experience.

---

## Architecture

The project follows a **clean, modular, and scalable architecture** that separates presentation, domain logic, data/networking, and platform-specific implementations.

### Core Technologies

* **Kotlin Multiplatform (KMP)**

  * Shared chess domain and business logic.
  * Shared models and game-state management.
  * Common networking abstractions.
  * Platform-specific implementations where necessary.

* **Compose Multiplatform (CMP)**

  * Declarative UI shared across Android, iOS, and Desktop.
  * Reusable chessboard and game components.
  * Responsive layouts for multiple screen sizes.
  * Consistent visual experience across platforms.

* **Koin**

  * Dependency Injection for shared and platform modules.
  * Centralized dependency configuration.
  * Improves modularity and testability.

* **Jetpack Navigation 3**

  * Type-safe application navigation.
  * Modular navigation structure.
  * Predictable navigation and back-stack management.

* **Real-Time Communication**

  * Room and player synchronization.
  * Real-time chess move exchange.
  * Server/client game-state synchronization.
  * Connection and session management.

* **Android Gradle Plugin (AGP) 9+**

  * Modern Android build configuration.
  * Improved build tooling and performance.

---

## Technical Focus

This project focuses on building a **production-ready multiplatform real-time multiplayer application** with an emphasis on:

* Clean Architecture principles.
* Kotlin Multiplatform development.
* Real-time multiplayer communication.
* Room-based game management.
* Shared chess game logic.
* Legal chess move validation.
* Reactive UI and state management.
* Dependency Injection using Koin.
* Navigation using modern Navigation 3 APIs.
* Modular project organization.
* Cross-platform networking abstractions.
* Connection and session management.
* Maintainable and scalable codebase.
* Consistent user experience across platforms.

---

## Skills Demonstrated

* Kotlin Multiplatform Development
* Compose Multiplatform UI
* Real-Time Multiplayer Application Development
* Online Room-Based Game Architecture
* Android Application Development
* iOS Application Development
* Desktop Application Development
* Chess Engine & Rule Implementation
* Chess Move Validation
* Real-Time State Synchronization
* Networking & Session Management
* Dependency Injection with Koin
* Navigation Architecture
* Reactive State Management
* Clean Architecture
* Modular Project Structure
* Kotlin Coroutines & Flow
* Algorithm Implementation
* Cross-Platform Software Engineering
