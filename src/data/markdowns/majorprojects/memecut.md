# MemeCut

**MemeCut** is a cross-platform meme creation application built with **Kotlin Multiplatform** and **Compose Multiplatform**, enabling users to create and share memes seamlessly on **Android** and **iOS**. The app provides a simple yet powerful editing experience, allowing users to transform their photos into memes with customizable text overlays and export the final result as a high-quality image.

The project demonstrates a modern multiplatform architecture by sharing business logic and UI across platforms while leveraging native capabilities for image selection and file system access.

---

## Highlights

- **Cross-Platform Experience**
  - Single codebase targeting Android and iOS.
  - Shared UI and business logic using Kotlin Multiplatform.

- **Meme Creation**
  - Import images from the device.
  - Add customizable top and bottom captions.
  - Real-time preview while editing.
  - Edit, reposition, and style meme text.

- **Image Export**
  - Render the edited meme into a new image.
  - Save the generated image to the device's shared storage or photo library.
  - Ready for sharing through any supported application.

- **Modern User Interface**
  - Built entirely with Compose Multiplatform.
  - Responsive layouts optimized for different device sizes.
  - State-driven UI with smooth interactions.

---

## Architecture

The application follows a clean, modular architecture that separates presentation, business logic, and platform-specific implementations, making it maintainable and easy to extend.

### Core Technologies

- **Kotlin Multiplatform (KMP)**
  - Shared business logic across Android and iOS.
  - Platform-specific integrations only where required.

- **Compose Multiplatform (CMP)**
  - Declarative UI shared between platforms.
  - Consistent look and feel with minimal duplicated code.

- **Koin**
  - Dependency Injection for shared and platform modules.
  - Simplifies dependency management and improves testability.

- **Jetpack Navigation 3**
  - Type-safe navigation between screens.
  - Predictable navigation state.
  - Modular navigation architecture.

---

## Technical Focus

This project explores modern cross-platform mobile development while integrating native platform capabilities for media handling.

Key areas include:

- Shared UI and business logic with Kotlin Multiplatform.
- Declarative user interfaces using Compose Multiplatform.
- Image processing and rendering.
- Native image picker integration.
- Exporting generated images to the device's shared file system or photo library.
- State management for an interactive editing experience.
- Modular architecture with dependency injection.
- Navigation using the latest Navigation 3 APIs.

---

## Skills Demonstrated

- Kotlin Multiplatform Development
- Compose Multiplatform UI
- Android Development
- iOS Development
- Image Processing & Rendering
- Canvas-Based Graphics
- File System Integration
- Media Sharing
- Dependency Injection with Koin
- Navigation Architecture
- State Management
- Clean Architecture
- Modular Project Structure