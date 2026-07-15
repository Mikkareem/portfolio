# Animated Go Button (Minimal)

**Animated Go Button (Minimal)** is a lightweight micro-interaction built with **Jetpack Compose Canvas**, focusing on simplicity and clarity. The button progressively draws its circular outline before smoothly revealing a directional arrow through scale and opacity animations. Unlike the rotating variant, this version keeps the arrow fixed, resulting in a cleaner and more subtle interaction suitable for productivity applications and modern design systems.

The project demonstrates how expressive animations can be created with only a few drawing primitives while maintaining excellent readability and performance.

---

# Features

## Progressive Circle Drawing

The animation begins by drawing the circular border around the button.

```kotlin
drawArc(
    color = color,
    sweepAngle = 359.99f * animationProgress.value,
    useCenter = false
)
```

The expanding arc provides visual feedback that naturally introduces the button.

---

# Smooth Arrow Reveal

Once the outline begins to complete, the directional arrow gradually appears.

```kotlin
scale(
    scale = animationProgress.value
) {
    drawPath(...)
}
```

Scaling the arrow creates a smooth appearance without overwhelming the user.

---

# Static Direction Indicator

Unlike the first version, the arrow remains fixed throughout the animation.

```kotlin
rotate(0f) {

    drawPath(...)
}
```

This restrained motion results in a cleaner aesthetic that works well for professional interfaces where subtle animations are preferred.

---

# Custom Vector Graphics

The arrow is generated procedurally using a custom path.

```kotlin
val path = Path().apply {

    moveTo(...)

    lineTo(...)

    lineTo(...)
}
```

Drawing the icon manually demonstrates fine-grained control over vector graphics without relying on external assets.

---

# Opacity Animation

The arrow gradually fades into view as it scales.

```kotlin
color.copy(
    alpha = animationProgress.value
)
```

Combining opacity with scaling creates a polished entrance animation.

---

# Interactive Canvas Button

The entire component remains fully interactive.

```kotlin
Canvas(
    modifier = Modifier
        .clickable {
            onClick()
        }
)
```

Rendering and interaction are handled within a single reusable component.

---

# Declarative Animation

The entire animation is driven by a single `Animatable`.

```kotlin
val animationProgress = remember {

    Animatable(0f)

}
```

Compose automatically redraws the component whenever the animation state changes.

---

# Reusable Component

The button exposes several customization options.

```kotlin
AnimatedGoButton(

    color = ...

    strokeWidth = ...

    modifier = ...

)
```

This allows the component to adapt easily to different branding and UI themes.

---

# Potential Use Cases

This animation is well suited for:

- Continue buttons
- Next actions
- Navigation controls
- Onboarding flows
- Search actions
- Workflow applications
- Productivity tools
- Dashboard interfaces

---

# Technical Highlights

The project demonstrates several Jetpack Compose graphics and animation techniques.

Highlights include:

- Custom Canvas rendering.
- Animated arc drawing.
- Procedural vector graphics.
- Scale transformations.
- Opacity animations.
- Declarative animations.
- Interactive Canvas components.
- Reusable UI architecture.
- Motion design.
- State-driven rendering.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- DrawScope APIs
- Canvas Path APIs
- Animatable
- Compose Animation APIs
- Vector Graphics
- Scale Animations
- Opacity Animations
- Custom Drawing APIs
- Interactive UI Components
- Motion Design
- Declarative UI