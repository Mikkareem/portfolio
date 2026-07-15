# Oscillating Heart Animation

**Oscillating Heart Animation** is a custom animation built entirely with **Jetpack Compose**, demonstrating how multiple animation techniques can be combined to create expressive UI interactions. The animation synchronizes **position**, **scale**, **color interpolation**, and **custom Canvas drawing** to simulate a heart oscillating vertically with a dynamic stretching effect.

The project showcases Compose's declarative animation system, graphics transformations, and mathematical interpolation to create fluid motion without relying on traditional animation frameworks.

---

# Features

## Oscillating Motion

The heart continuously moves up and down using an infinite repeating animation.

```kotlin
translationValue.animateTo(
    targetValue = -100f,
    animationSpec = InfiniteRepeatableSpec(
        animation = tween(800),
        repeatMode = RepeatMode.Reverse
    )
)
```

The animation reverses automatically, creating a smooth oscillating movement.

---

# Translation Animation

The vertical position of the heart is controlled using a single animated value.

```kotlin
graphicsLayer {
    translationY = translationValue.value * 8
}
```

As the animation progresses, the heart moves upward and then returns to its original position, producing a floating effect.

---

# Dynamic Scaling

The heart changes its size based on the animation progress.

```kotlin
val scaleFactor = map(
    translationValue.value,
    -100f,
    0f,
    3f,
    1f
)

scaleX = scaleFactor
scaleY = scaleFactor
```

Scaling the icon while it moves creates a sense of depth and elasticity, making the animation feel more organic.

---

# Color Interpolation

The heart smoothly transitions between two colors throughout the animation.

```kotlin
val animatedColor = lerp(
    Color.White,
    Color.Black,
    animationProgress
)
```

Using linear color interpolation provides a gradual visual transition instead of abrupt color changes.

---

# Mathematical Mapping

The project uses value mapping to synchronize multiple animation properties from a single animated value.

```kotlin
val animationProgress = map(
    translationValue.value,
    -100f,
    0f,
    0f,
    1f
)
```

This normalized progress drives:

- Color transitions
- Scaling
- Decorative line animation

Keeping all effects synchronized with one animation state.

---

# Custom Canvas Drawing

A decorative line is drawn beneath the heart using `drawBehind`.

```kotlin
drawLine(
    color = Color.White,
    start = startOffset,
    end = endOffset,
    strokeWidth = 3.dp.toPx()
)
```

The line dynamically expands and contracts as the heart moves, reinforcing the oscillating motion.

---

# Graphics Layer Transformations

Compose's `graphicsLayer` API is used to combine multiple transformations efficiently.

```kotlin
graphicsLayer {
    scaleX = scaleFactor
    scaleY = scaleFactor
    translationY = translationValue.value * 8
}
```

Grouping transformations within a single graphics layer improves readability while allowing the GPU to optimize rendering.

---

# Declarative Animation Architecture

The animation is entirely state-driven.

An `Animatable` exposes the current animation value, while Compose automatically recomposes affected UI elements as the value changes.

```kotlin
val translationValue = remember {
    Animatable(0f)
}
```

This declarative approach eliminates manual animation management and keeps the implementation concise.

---

# Technical Highlights

The project demonstrates several animation and rendering techniques available in Jetpack Compose.

Highlights include:

- Declarative animations.
- Infinite repeating animations.
- Translation transforms.
- Scale animations.
- Color interpolation.
- Mathematical value mapping.
- Canvas drawing with `drawBehind`.
- Graphics layer transformations.
- Reactive state-driven rendering.
- Motion synchronization using a single animation value.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Animation APIs
- Animatable
- Graphics Layer Transformations
- Canvas Drawing
- drawBehind
- Mathematical Interpolation
- Color Interpolation
- Motion Design
- Declarative UI
- Reactive State Management
- Custom UI Animations