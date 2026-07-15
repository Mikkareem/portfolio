# Random Mover Effect

**Random Mover Effect** is a real-time particle simulation built entirely with **Jetpack Compose Canvas**, demonstrating force-based movement, collision detection, and procedural animation. Hundreds of independently moving particles are simulated simultaneously, each with unique colors, sizes, positions, and velocities.

The project explores the fundamentals of motion simulation and real-time graphics programming by implementing a lightweight physics engine from scratch using Kotlin and Compose's low-level drawing APIs.

---

# Features

## Procedural Particle Generation

The simulation creates hundreds of particles, each initialized with random visual properties.

Every particle receives:

- Random color
- Random radius
- Random starting position
- Random initial force

```kotlin
val particles = Array(500) {
    RandomMover()
}
```

This produces a dynamic scene where no two particles behave exactly alike.

---

# Physics-Based Motion

Each particle follows a simple physics model based on acceleration, velocity, and position.

```kotlin
fun applyForce(force: Offset) {
    acceleration += force
}

fun update() {
    velocity += acceleration
    position += velocity
    acceleration *= 0f
}
```

This mirrors the core update loop commonly found in physics engines and game development.

---

# Random Force Generation

Instead of assigning identical movement, every particle begins with a unique force vector.

```kotlin
particle.applyForce(
    Offset(
        Random.nextFloat(-15f, 15f),
        Random.nextFloat(-15f, 25f)
    )
)
```

The randomized forces create unpredictable and visually engaging movement patterns.

---

# Boundary Collision Detection

Particles remain inside the drawing area by detecting collisions with the Canvas boundaries.

When a particle reaches an edge, its corresponding velocity component is inverted, producing a bounce effect.

```kotlin
if (position.x < 0f || position.x > size.width) {
    velocity = velocity.xTimes(-1f)
}

if (position.y < 0f || position.y > size.height) {
    velocity = velocity.yTimes(-1f)
}
```

This simple collision response allows particles to continuously move around the screen without leaving the visible area.

---

# Rendering with Compose Canvas

Each particle is rendered as a colored circle using Compose's low-level drawing APIs.

```kotlin
drawCircle(
    color = color,
    radius = radius,
    center = position
)
```

Since every particle maintains its own state, Compose automatically redraws the animation whenever positions change.

---

# Animation Loop

The simulation runs continuously using Kotlin Coroutines.

```kotlin
LaunchedEffect(Unit) {
    while (true) {
        delay(10)

        particles.forEach {
            it.update()
        }
    }
}
```

This lightweight update loop drives the entire animation while Compose handles rendering reactively.

---

# Reactive State Management

Each particle exposes its position as observable state.

```kotlin
private var position by mutableStateOf(Offset.Zero)
```

Whenever the position changes during an update, Compose automatically schedules a redraw, removing the need for manual rendering invalidation.

---

# Technical Highlights

The project demonstrates several core concepts used in graphics programming and interactive simulations.

Highlights include:

- Force-based motion simulation.
- Velocity and acceleration calculations.
- Randomized particle initialization.
- Boundary collision detection.
- Physics-inspired animation.
- Reactive Canvas rendering.
- State-driven graphics updates.
- Coroutine-based animation loops.
- Efficient rendering of hundreds of animated particles.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- Particle System Development
- Physics Simulation
- Force-Based Motion
- Collision Detection
- Mathematical Animation
- Custom Drawing APIs
- Reactive State Management
- Kotlin Coroutines
- Real-Time Graphics Rendering
- Performance Optimization