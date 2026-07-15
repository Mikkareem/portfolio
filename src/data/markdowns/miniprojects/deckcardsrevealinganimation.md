# Deck Cards Revealing Animation

**Deck Cards Revealing Animation** is a custom UI animation built entirely with **Jetpack Compose**, simulating the visual effect of a deck of cards gradually spreading outward. The animation combines **pivot-based rotations**, **interpolation**, and **declarative animations** to produce a smooth and visually appealing reveal effect without relying on any external animation libraries.

The project demonstrates how Compose's animation APIs and graphics transformations can be combined to create reusable motion effects for games, dashboards, onboarding screens, and interactive user interfaces.

---

# Features

## Animated Card Reveal

The deck begins as a stacked pile and gradually spreads into a fan-like arrangement.

Each card rotates by a different angle based on its position within the deck.

```kotlin
DeckOfCard(
    animationFraction = animatedValue.value
)
```

As the animation progresses, every card receives its own calculated rotation.

---

# Smooth Interpolation

Instead of instantly rotating each card, the project interpolates between two rotation values.

```kotlin
private fun interpolate(
    left: Float,
    right: Float,
    fraction: Float
): Float {
    return left + (right - left) * fraction
}
```

This interpolation creates a smooth transition from a fully stacked deck to a fully revealed fan.

---

# Individual Card Rotation

Each card stores an angle multiplier that determines how far it should rotate.

```kotlin
NumberCard(
    number = it.identifier,
    color = it.color,
    rotation = it.angleFactor * rotationValue
)
```

Cards positioned farther from the center rotate more, creating a natural-looking deck spread.

---

# Pivot-Based Transformations

Rather than rotating around the center, every card rotates around its bottom-left corner.

```kotlin
graphicsLayer {
    rotationZ = rotation

    transformOrigin = TransformOrigin(
        pivotFractionX = 0f,
        pivotFractionY = 1f
    )
}
```

Changing the transformation origin produces a realistic hinge effect similar to a physical deck of playing cards.

---

# Infinite Animation

The reveal animation continuously plays forward and backward using Compose's animation APIs.

```kotlin
animatedValue.animateTo(
    targetValue = 1f,
    animationSpec = infiniteRepeatable(
        animation = tween(2000),
        repeatMode = RepeatMode.Reverse
    )
)
```

This creates a looping animation where the deck repeatedly opens and closes.

---

# Custom Card Rendering

Each card is built entirely using Compose components.

Features include:

- Rounded corners.
- Borders.
- Background colors.
- Large centered value.
- Mirrored corner labels.
- Canvas-rendered corner text.

```kotlin
Text(
    text = number,
    fontSize = 85.sp,
    fontWeight = FontWeight.Bold
)
```

The result closely resembles the layout of traditional playing cards.

---

# Canvas-Based Corner Labels

Instead of duplicating composables, the project uses Compose Canvas to render and rotate corner labels.

```kotlin
rotate(180f) {
    drawText(
        textLayoutResult,
        color = Color.White
    )
}
```

Using Canvas transformations reduces duplication while keeping the implementation efficient.

---

# Declarative Animation Architecture

The animation is entirely state-driven.

An `Animatable` controls the reveal progress, while the UI automatically recomposes as the animated value changes.

```kotlin
val animatedValue = remember {
    Animatable(0f)
}
```

Compose's declarative rendering model keeps the animation implementation concise and easy to maintain.

---

# Technical Highlights

The project demonstrates several modern UI animation techniques using Jetpack Compose.

Highlights include:

- Declarative animations.
- Animatable state management.
- Infinite repeating animations.
- Linear interpolation.
- Pivot-based transformations.
- Layer transformations using `graphicsLayer`.
- Canvas text rendering.
- Custom card component design.
- Reactive UI updates.
- Smooth motion design.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Animation APIs
- Animatable
- Graphics Layer Transformations
- Transform Origin
- Custom UI Components
- Canvas Drawing
- Mathematical Interpolation
- Declarative UI
- Motion Design
- State-Driven Animations
- Reactive Rendering