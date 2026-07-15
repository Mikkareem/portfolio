# Sudoku Game & Solver

A modern, cross-platform Sudoku application built with **Kotlin Multiplatform** and **Compose Multiplatform**, delivering a consistent user experience across **Android**, **iOS**, and **Desktop**. The application combines an intuitive Sudoku gameplay experience with a powerful solving engine, allowing users to play, analyze, validate, and solve puzzles efficiently.

Designed with a modular and scalable architecture, the project demonstrates how a single Kotlin codebase can power multiple platforms while maintaining native performance and platform-specific integrations.

---

## Highlights

- **Cross-Platform Application**
  - Shared business logic across Android, iOS, and Desktop.
  - Platform-specific implementations only where required.

- **Sudoku Gameplay**
  - Interactive Sudoku board.
  - Multiple puzzle difficulty levels.
  - Input validation and mistake detection.
  - Notes (pencil marks) support.
  - Undo and redo functionality.
  - Puzzle reset and restart.

- **Sudoku Solver**
  - Automatically solves valid Sudoku puzzles.
  - Step-by-step solving logic.
  - Board validation before solving.
  - Handles partially completed puzzles.

- **Modern UI**
  - Built entirely with Compose Multiplatform.
  - Responsive layouts for different screen sizes.
  - Smooth animations and state-driven UI.

---

## Architecture

The project follows a clean, modular architecture that separates presentation, business logic, and platform-specific implementations.

### Core Technologies

- **Kotlin Multiplatform (KMP)**
  - Shared domain and business logic.
  - Platform-specific implementations where necessary.

- **Compose Multiplatform (CMP)**
  - Declarative UI shared across Android, iOS, and Desktop.
  - Consistent user experience with minimal duplicated code.

- **Koin**
  - Dependency Injection for shared and platform modules.
  - Simplifies dependency management and improves testability.

- **Jetpack Navigation 3**
  - Type-safe navigation.
  - Modular navigation graph.
  - Predictable navigation state.

- **Android Gradle Plugin (AGP) 9+**
  - Modern Android build configuration.
  - Improved build performance and tooling support.

---

## Technical Focus

This project focuses on building a production-ready multiplatform application by emphasizing:

- Clean architecture principles.
- Shared business logic across platforms.
- Reactive UI with state management.
- Dependency Injection using Koin.
- Modular project organization.
- Navigation using the latest Navigation 3 APIs.
- Maintainable and scalable codebase.

---

## Skills Demonstrated

- Kotlin Multiplatform Development
- Compose Multiplatform UI
- Android Application Development
- iOS Application Development
- Desktop Application Development
- Dependency Injection with Koin
- Navigation Architecture
- State Management
- Clean Architecture
- Modular Project Structure
- Algorithm Implementation
- Cross-Platform Software Engineering