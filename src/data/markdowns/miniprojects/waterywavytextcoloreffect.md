# Watery Text Color Effect

**Watery Text Color Effect** is a custom text animation built entirely with **Jetpack Compose Canvas**, simulating water gradually filling a piece of text while animated waves continuously ripple across its surface. The effect is achieved without shaders or external graphics libraries, combining **procedural wave generation**, **Canvas path rendering**, and **blend modes** to create a realistic liquid fill animation.

The project demonstrates how mathematical functions, graphics compositing, and Compose's low-level drawing APIs can be combined to create visually rich UI effects.

---

# Features

## Animated Water Fill

The water level gradually rises inside the text, simulating a filling container.

```kotlin
flowAnimationProgress.animateTo(
    targetValue = 1f,
    animationSpec = tween(
        durationMillis = 10000
    )
)
```

As the animation progresses, the water level increases smoothly until the text is completely filled before restarting.

---

# Dynamic Text Content

The displayed value changes continuously based on the animation progress.

```kotlin
val amount by derivedStateOf {
    (1200 * flowAnimationProgress.value)
        .roundToInt()
}
```

The text updates in real time, making the animation suitable for progress indicators, hydration trackers, or dashboard widgets.

---

# Procedural Wave Generation

Rather than drawing static curves, the project generates multiple sine waves with randomized properties.

Each wave has its own:

- Amplitude
- Period
- Phase

```kotlin
Wave(
    amplitude = Random.nextFloat(...),
    period = Random.nextFloat(...),
    phase = Random.nextFloat(...)
)
```

Combining several waves produces a much more natural water surface than using a single sine wave.

---

# Mathematical Wave Simulation

Each wave is represented using the sine function.

```kotlin
fun evaluate(x: Float): Float {
    return (
        sin(
            phase + 2 * PI * x / period
        ) * amplitude
    ).toFloat()
}
```

Sampling these functions across the Canvas generates a continuously animated wave profile.

---

# Wave Animation

Instead of recreating waves every frame, the animation updates each wave's phase.

```kotlin
wave.addPhase(
    0.5f * waveAnimationProgress.value
)
```

Changing only the phase causes the waves to move horizontally while preserving their overall shape.

---

# Custom Path Rendering

The water surface is constructed as a custom `Path`.

```kotlin
moveTo(...)

lineTo(...)

close()
```

The path follows the animated wave points before extending to the bottom of the Canvas, producing a fully enclosed water shape.

---

# Blend Mode Text Filling

One of the key techniques used in this project is **Canvas layer compositing**.

```kotlin
withSaveLayer(...) {

    drawText(...)

    drawPath(
        blendMode = BlendMode.SrcAtop
    )
}
```

Using `BlendMode.SrcAtop` clips the animated water path to the text, creating the illusion that the text itself is filling with water.

---

# Canvas Rendering

Both the water surface and the text are rendered entirely using Compose Canvas.

```kotlin
drawPath(
    path = path,
    color = waterColor
)

drawText(
    textLayoutResult,
    color = Color.White
)
```

This low-level rendering approach provides complete control over every visual element.

---

# Reactive Animation Architecture

Two independent animations work together:

- Wave movement.
- Water level progression.

```kotlin
val waveAnimationProgress = remember {
    Animatable(0f)
}

val flowAnimationProgress = remember {
    Animatable(0f)
}
```

Compose automatically redraws the Canvas whenever either animation updates, resulting in smooth and synchronized motion.

---

# Technical Highlights

This project combines mathematics, graphics rendering, and Compose animations to build an advanced visual effect.

Highlights include:

- Procedural wave generation.
- Sine wave mathematics.
- Multiple wave composition.
- Custom Path construction.
- Blend mode compositing.
- Canvas layer rendering.
- Dynamic text rendering.
- Infinite animations.
- Mathematical interpolation.
- Declarative animation architecture.
- Real-time graphics rendering.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- Canvas Path APIs
- Blend Modes
- Custom Drawing APIs
- Mathematical Animations
- Sine Wave Simulation
- Procedural Graphics
- Compose Animation APIs
- Animatable
- Reactive State Management
- Real-Time Rendering
- Motion Design