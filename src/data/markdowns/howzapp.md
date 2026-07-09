### FitPulse Mobile Hub

Native health tracking app utilizing Kotlin Multiplatform (KMP) shared state machines.

#### Engineering Details
- **Shared Architecture**: Offline database persistence and HTTP telemetry clients defined once in KMP.
- **Compose Multiplatform UI**: Fully shared user interfaces targeting iOS and Android native draw loops.
- **Custom Canvas Rendering**: Real-time heart rate graphs drawn via low-overhead canvas draw operations.
