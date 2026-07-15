# Firework Effect

**Firework Effect** is a custom particle system built entirely with **Jetpack Compose Canvas**, recreating a realistic fireworks animation without relying on any external graphics or game engine. The project demonstrates how fundamental physics concepts such as **gravity**, **velocity**, **acceleration**, and **particle lifecycles** can be combined with Compose's declarative rendering model to produce smooth, visually appealing animations.

Rather than using a traditional game framework, every particle is simulated manually and rendered using Compose's low-level drawing APIs. This project serves as an exploration of real-time rendering, mathematical animations, and state-driven graphics programming.

---

# Features

## Physics-Based Fireworks

Each firework consists of two distinct phases:

### Launch Phase

A single particle is launched upward with an initial velocity.

Gravity continuously slows the particle until its upward velocity becomes zero.

```kotlin
private var velocity = Offset(
    x = 0f,
    y = Random.nextFloat(-88f, -58f)
)
```

Once gravity overcomes the initial velocity, the rocket reaches its highest point.

---

### Explosion Phase

At the peak of its flight, the rocket explodes into hundreds of independent particles.

```kotlin
private fun explode() {
    repeat(100) {
        particles += Particle(
            initialPosition = firework.position,
            hu = hu
        )
    }
}
```

Each particle receives its own randomized direction and speed, creating a unique explosion every time.

---

# Particle Physics

Every particle maintains its own physics state.

- Position
- Velocity
- Acceleration
- Lifespan

For every animation frame:

1. Gravity is applied.
2. Velocity is updated.
3. Position is recalculated.
4. Acceleration is reset.

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

This simple physics loop is responsible for all movement within the particle system.

---

# Gravity Simulation

Gravity is modeled as a constant downward force applied every frame.

```kotlin
private val gravity = Offset(
    x = 0f,
    y = 2f
)
```

Each particle receives the same gravitational force, causing the explosion to naturally spread before gradually falling back down.

---

# Randomized Particle Motion

Instead of moving every particle in the same direction, a random 2D vector is generated.

```kotlin
private var velocity =
    Offset.random2D() *
    Random.nextFloat(2f, 15f)
```

This produces natural-looking explosions where every particle follows a different trajectory.

---

# Rendering with Compose Canvas

Rendering is performed entirely using **Jetpack Compose Canvas**.

Each particle is drawn as a single point with rounded caps to create glowing circular particles.

```kotlin
drawPoints(
    points = listOf(position),
    pointMode = PointMode.Points,
    color = drawColor,
    strokeWidth = 4.dp.toPx(),
    cap = StrokeCap.Round
)
```

Because rendering occurs directly on the Canvas, thousands of particles can be displayed efficiently.

---

# Lifetime & Alpha Fading

Particles don't disappear instantly.

Instead, their opacity gradually decreases based on their remaining lifespan.

```kotlin
val alpha = map(
    lifespan.toFloat(),
    0f,
    255f,
    0f,
    1f
)

val drawColor = color.copy(alpha = alpha)
```

This creates a smooth fade-out effect that closely resembles real fireworks.

---

# Animation Loop

The animation is driven entirely using Kotlin Coroutines.

Every 30 milliseconds:

- Physics are updated.
- Positions are recalculated.
- Compose automatically redraws the Canvas.

```kotlin
LaunchedEffect(Unit) {
    while (true) {
        delay(30)

        fireworks.forEach {
            it.update()
        }
    }
}
```

A second coroutine periodically launches new fireworks.

```kotlin
LaunchedEffect(size) {
    while (true) {
        delay(100)

        fireworks += Firework(
            size.width.toFloat(),
            size.height.toFloat()
        )
    }
}
```

The result is a continuous stream of fireworks without requiring a dedicated game loop.

---

# State-Driven Rendering

The particle system leverages Compose's reactive state model.

Each particle exposes its position as observable state.

```kotlin
var position by mutableStateOf(initialPosition)
    private set
```

Whenever a particle's position changes, Compose automatically schedules a redraw, eliminating the need for manual invalidation logic.

---

# Automatic Cleanup

To prevent unnecessary memory usage, expired particles are removed automatically.

```kotlin
particles.removeIf {
    it.done()
}
```

Similarly, completed fireworks are discarded once all of their particles have faded away.

```kotlin
fireworks.removeIf {
    it.done()
}
```

This keeps the animation performant even after running continuously.

---

# Technical Highlights

This project demonstrates several graphics programming concepts using nothing more than Kotlin and Jetpack Compose.

Highlights include:

- Custom particle system implementation.
- Physics-based animations.
- Gravity simulation.
- Velocity and acceleration calculations.
- Random vector generation.
- Lifecycle-driven particle management.
- Alpha-based fade animations.
- Low-level Canvas rendering.
- Coroutine-driven animation loops.
- Efficient state-driven rendering.
- Real-time graphics programming.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- Custom Graphics Rendering
- Particle System Development
- Physics Simulation
- Mathematical Animations
- Kotlin Coroutines
- State Management
- Reactive UI
- Custom Drawing APIs
- Real-Time Rendering
- Performance Optimization