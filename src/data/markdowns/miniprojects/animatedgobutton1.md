# Animated Go Button

**Animated Go Button** is a custom animated action button built entirely with **Jetpack Compose Canvas**. Rather than displaying a static icon, the component progressively constructs itself through coordinated animations—drawing its circular border first, then revealing a directional arrow using scaling, rotation, and opacity transitions.

The project demonstrates how multiple animation techniques can be orchestrated to create engaging micro-interactions that improve user experience.

---

# Features

## Progressive Button Construction

Instead of appearing instantly, the button is drawn over time.

```kotlin
animationProgress.animateTo(
    targetValue = 1f,
    animationSpec = tween(1200)
)
```

The animation creates the impression that the button is being constructed in real time.

---

# Animated Circular Outline

The outer ring is rendered using an animated arc.

```kotlin
drawArc(
    sweepAngle = 359.99f *
        animationProgress.value,
    useCenter = false
)
```

As the animation progresses, the arc gradually completes a full circle, providing a visually satisfying loading effect.

---

# Custom Arrow Rendering

The arrow icon is manually drawn using a custom vector path.

```kotlin
val path = Path().apply {

    moveTo(...)

    lineTo(...)

    lineTo(...)
}
```

Creating the icon procedurally removes the need for image assets while demonstrating custom vector drawing techniques.

---

# Scale Animation

The arrow grows naturally from its starting point.

```kotlin
scale(
    scale = animationProgress.value,
    pivot = ...
)
```

Scaling from the tail of the arrow creates a directional expansion that reinforces forward motion.

---

# Rotation Animation

While scaling, the arrow simultaneously rotates into position.

```kotlin
rotate(
    360f *
    animationProgress.value
)
```

The combined motion gives the icon a dynamic entrance instead of a simple fade-in.

---

# Opacity Transition

The arrow gradually becomes visible during the animation.

```kotlin
color.copy(
    alpha = animationProgress.value
)
```

Synchronizing opacity with scale produces a smoother appearance.

---

# Interactive Canvas Component

The Canvas itself behaves as a clickable button.

```kotlin
Canvas(
    modifier = Modifier
        .clickable {
            onClick()
        }
)
```

This makes the component fully interactive while keeping all rendering inside the Canvas.

---

# State-Driven Animation

Compose's reactive state model automatically redraws the button as the animation progresses.

```kotlin
val animationProgress =
    remember {

        Animatable(0f)

    }
```

Updating a single animated value controls every visual aspect of the component.

---

# Reusable Design

The component exposes several customizable parameters.

```kotlin
AnimatedGoButton(

    color = ...

    strokeWidth = ...

    modifier = ...

)
```

This allows it to be easily adapted for different themes and design systems.

---

# Potential Use Cases

This animation can be used for:

- Navigation buttons
- Continue actions
- Next step indicators
- Onboarding flows
- Checkout buttons
- Floating action buttons
- Interactive dashboards

---

# Technical Highlights

The project demonstrates multiple animation and graphics techniques within Jetpack Compose.

Highlights include:

- Custom Canvas rendering.
- Animated arc drawing.
- Custom vector path creation.
- Scale transformations.
- Rotation transformations.
- Opacity animations.
- Interactive Canvas components.
- Declarative animations.
- Procedural icon rendering.
- Reusable UI component design.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- Canvas Path APIs
- DrawScope
- Animatable
- Compose Animation APIs
- Graphics Transformations
- Scale Animations
- Rotation Animations
- Vector Graphics
- Custom Drawing APIs
- Motion Design
- Interactive UI Components