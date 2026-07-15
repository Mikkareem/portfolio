# Star Rating Fill Animation

**Star Rating Fill Animation** is a custom UI animation built with **Jetpack Compose Canvas**, demonstrating how vector graphics, blend modes, and declarative animations can be combined to create an animated rating indicator. Instead of relying on image assets or icon libraries, every star is constructed procedurally using a custom `Path`, while the fill animation is achieved through GPU-accelerated compositing.

The project explores modern graphics techniques available in Compose, making it suitable for review systems, product ratings, achievements, and gamification interfaces.

---

# Features

## Animated Rating Progress

The rating gradually fills from left to right before reversing and repeating.

```kotlin
animation.animateTo(
    targetValue = 1f,
    animationSpec = infiniteRepeatable(
        animation = tween(3000),
        repeatMode = RepeatMode.Reverse
    )
)
```

The continuous animation creates a smooth demonstration of rating progression.

---

# Custom Star Geometry

Rather than displaying predefined icons, each star is generated using a custom vector path.

```kotlin
val path = Path().apply {
    moveTo(...)
    lineTo(...)
    lineTo(...)
    close()
}
```

Constructing the star manually demonstrates how complex vector shapes can be built using Compose's drawing APIs.

---

# Multiple Star Layout

The component dynamically renders five stars across the available width.

```kotlin
repeat(totalStars) {

    translate(left = it * starWidth) {

        drawPath(
            path = path,
            color = Color.Gray
        )
    }
}
```

Using translation avoids duplicating drawing logic while keeping the implementation scalable.

---

# Progressive Fill Animation

Instead of filling each star individually, a single animated rectangle grows across the entire rating view.

```kotlin
drawRect(
    size = Size(
        width = size.width * animation.value,
        height = size.height
    )
)
```

The rectangle represents the current rating progress and drives the visual fill effect.

---

# Blend Mode Compositing

One of the key techniques used in this project is **Canvas compositing**.

```kotlin
drawRect(
    color = Color(0xFFFFD700),
    blendMode = BlendMode.SrcAtop
)
```

Using `BlendMode.SrcAtop` ensures the animated fill only appears inside the star shapes, creating a clean and efficient masking effect.

---

# Canvas Rendering

The entire component is rendered using Compose Canvas.

Rendering includes:

- Star geometry
- Layout positioning
- Animated fill
- Blend mode masking

No image resources or external vector assets are required.

---

# Declarative Animation

Animation is driven by Compose's `Animatable`.

```kotlin
val animation = remember {
    Animatable(0f)
}
```

As the animated value changes, Compose automatically redraws the Canvas, keeping the implementation concise and reactive.

---

# Responsive Layout

The star size is calculated dynamically based on the available Canvas dimensions.

```kotlin
val starWidth = size.width / totalStars
```

This allows the component to scale naturally across different screen sizes without hardcoded dimensions.

---

# Technical Highlights

The project demonstrates several graphics and animation techniques available in Jetpack Compose.

Highlights include:

- Custom vector path construction.
- Canvas rendering.
- Blend mode compositing.
- Progressive masking animations.
- Declarative animations.
- Responsive graphics layout.
- GPU-accelerated rendering.
- Infinite repeating animations.
- Procedural UI components.
- State-driven rendering.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- Canvas Path APIs
- Blend Modes
- Custom Drawing APIs
- Vector Graphics
- Compose Animation APIs
- Animatable
- Declarative UI
- Motion Design
- Responsive UI Components
- Real-Time Graphics Rendering