# Gesture Indication Particles

**Gesture Indication Particles** is a custom interaction effect built with **Jetpack Compose**, replacing the default Material ripple with a fully animated particle system. The project demonstrates how Compose's **Indication API** can be extended to create rich, interactive visual feedback for user gestures such as presses and hover events.

Instead of displaying a simple ripple animation, interacting with a composable overlays a dynamic particle simulation, providing a unique and engaging user experience while showcasing low-level graphics programming with Compose Canvas.

---

# Features

## Custom Interaction Feedback

The project replaces the standard ripple indication with a completely custom animation.

Supported interactions include:

- Press
- Release
- Cancel
- Hover Enter
- Hover Exit

```kotlin
.clickable(
    interactionSource = interactionSource,
    indication = MyIndication
)
```

This allows any clickable composable to display a custom particle-based indication instead of the default Material effect.

---

# Listening to User Interactions

The indication observes interaction events emitted by the `InteractionSource`.

```kotlin
interactionSource.interactions.collectLatest { interaction ->
    when (interaction) {
        is PressInteraction.Press -> instance.show(true)
        is PressInteraction.Release -> instance.show(false)
        is HoverInteraction.Enter -> instance.show(true)
        is HoverInteraction.Exit -> instance.show(false)
    }
}
```

Whenever a gesture begins or ends, the particle effect is shown or hidden automatically.

---

# Procedural Particle Generation

Particles are generated only when the indication is first displayed.

```kotlin
repeat(50) {
    randomParticles += IndicationParticle().apply {
        setInitialPosition(
            Offset.random(
                xMax = size.width,
                yMax = size.height
            )
        )
    }
}
```

Each particle is initialized with:

- Random position
- Random direction
- Random size
- Random color

This ensures every interaction produces a visually unique effect.

---

# Particle Motion

Each particle moves independently using a randomized velocity vector.

```kotlin
private var velocity =
    Offset.randomMirror(10f, 10f)

private fun update() {
    position += velocity
}
```

The independent movement creates an energetic animation that fills the interaction area.

---

# Boundary Collision

Particles remain inside the indication region by bouncing off the edges.

```kotlin
if (position.x < 0f || position.x > size.width) {
    velocity = velocity.xTimes(-1f)
}

if (position.y < 0f || position.y > size.height) {
    velocity = velocity.yTimes(-1f)
}
```

This simple collision response allows particles to continuously move within the available drawing space.

---

# Custom Canvas Rendering

Every particle is rendered directly using Compose's low-level drawing APIs.

```kotlin
drawCircle(
    color = color,
    radius = radius,
    center = position
)
```

The indication overlays these particles on top of the composable while preserving its original content.

---

# Overlay Rendering

When the indication becomes active, an overlay is drawn before rendering the particle animation.

```kotlin
drawContent()

drawRect(
    color = Color.Red.copy(alpha = 0.33f)
)

drawMovers()
```

This layered rendering approach demonstrates how Compose allows custom visual effects to be composed with existing UI components.

---

# Custom Indication Architecture

The project implements Compose's `Indication` and `IndicationInstance` interfaces to create reusable interaction effects.

```kotlin
object MyIndication : Indication {

    @Composable
    override fun rememberUpdatedInstance(
        interactionSource: InteractionSource
    ): IndicationInstance {
        ...
    }
}
```

This architecture makes the particle indication reusable across any clickable component in the application.

---

# Technical Highlights

The project explores advanced customization of Jetpack Compose interaction feedback.

Highlights include:

- Custom Compose Indication implementation.
- InteractionSource event handling.
- Press and hover gesture detection.
- Procedural particle generation.
- Physics-inspired particle movement.
- Boundary collision detection.
- Custom Canvas rendering.
- Layered drawing with `drawContent()`.
- Reactive state-driven animations.
- Reusable interaction effects.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Indication API
- InteractionSource
- Compose Canvas
- Custom Drawing APIs
- Particle System Development
- Gesture Handling
- Reactive State Management
- Real-Time Graphics Rendering
- UI Animation
- Custom UI Components
- Performance Optimization