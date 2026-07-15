# Smoke Particle Effect

**Smoke Particle Effect** is a lightweight particle system built entirely with **Jetpack Compose Canvas**, simulating continuously rising smoke using procedural animation techniques. Instead of relying on external graphics engines or animation libraries, every smoke particle is individually generated, updated, rendered, and removed using Compose's declarative rendering model.

The project demonstrates how simple mathematical rules and state-driven rendering can create smooth, natural-looking visual effects suitable for games, simulations, and interactive user interfaces.

---

# Features

## Procedural Particle Generation

The smoke effect continuously generates new particles from a fixed source, creating the illusion of an endless stream of smoke.

```kotlin
repeat(5) {
    smokeParticles += SmokeParticle(
        Offset(
            x = size.width / 2f,
            y = size.height * 0.6f
        )
    )
}
```

As older particles disappear, new ones are spawned, maintaining a consistent smoke effect.

---

# Randomized Motion

Each particle is assigned a random initial velocity, allowing the smoke to spread naturally while moving upward.

```kotlin
private var velocity = Offset(
    x = Random.nextFloat(-2f, 2f),
    y = Random.nextFloat(-7f, -2f)
)
```

Random horizontal movement prevents particles from following identical paths, resulting in a more organic animation.

---

# Particle Animation

Every particle updates its position and transparency during each frame.

```kotlin
private fun update() {
    alpha -= 0.00875f
    position += velocity
}
```

The animation consists of two simultaneous effects:

- Upward movement
- Gradual fading

Together, they recreate the appearance of dissipating smoke.

---

# Rendering with Compose Canvas

Each smoke particle is rendered directly onto the Compose Canvas as a semi-transparent circle.

```kotlin
drawCircle(
    color = Color.White.copy(alpha = alpha),
    radius = 20f,
    center = position
)
```

The use of alpha blending produces soft edges and smooth transitions between particles, giving the smoke a natural appearance.

---

# Continuous Animation

Unlike traditional frame-based game engines, the animation relies on Compose's reactive rendering.

Each particle updates its own state whenever it is drawn.

```kotlin
fun show(drawScope: DrawScope) {
    update()
    drawScope.showParticle()
}
```

As particle properties change, Compose automatically redraws the Canvas without requiring explicit rendering loops.

---

# Automatic Particle Cleanup

To keep memory usage stable, particles are removed once they have completely faded away.

```kotlin
fun canRemove(): Boolean = alpha < 0f
```

The particle collection is continuously filtered before rendering.

```kotlin
smokeParticles =
    smokeParticles
        .filter { !it.canRemove() }
        .toMutableStateList()
```

This ensures that only active particles remain in memory, allowing the effect to run continuously.

---

# Technical Highlights

The project demonstrates several graphics programming concepts using only Kotlin and Jetpack Compose.

Highlights include:

- Procedural particle generation.
- Continuous particle emission.
- Randomized motion simulation.
- Alpha-based fade animations.
- Reactive Canvas rendering.
- State-driven graphics updates.
- Automatic particle lifecycle management.
- Lightweight real-time animation.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- Particle System Development
- Procedural Animation
- Mathematical Motion Simulation
- Custom Drawing APIs
- Reactive State Management
- Real-Time Graphics Rendering
- Performance Optimization