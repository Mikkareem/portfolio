# Glassy Image Effect

**Glassy Image Effect** is a modern UI demonstration built with **Jetpack Compose**, recreating a glassmorphism-inspired visual effect using layered images, blur rendering, clipping, and elevation. The project shows how Compose's graphics APIs can be combined to produce premium-looking interfaces without relying on external image processing libraries.

By rendering the same image twice with different transformations and visual treatments, the effect simulates a floating glass panel placed above the original image.

---

# Features

## Layered Image Composition

The effect is created by stacking two copies of the same image.

- Background image
- Glass panel image

```kotlin
Box(
    contentAlignment = Alignment.Center
) {
    Image(...)
    Image(...)
}
```

The bottom image provides the scene, while the top image acts as the frosted glass overlay.

---

# Background Scaling

The background image is intentionally enlarged to fill the available space.

```kotlin
Image(
    painter = painterResource(...),
    contentScale = FixedScale(1.3f)
)
```

Using a larger scale creates additional visual depth and ensures the foreground panel appears distinct from its background.

---

# Glass Panel

The foreground image is inset using padding, creating the illusion of a floating glass card.

```kotlin
modifier = Modifier
    .padding(32.dp)
```

Separating the foreground from the background reinforces the layered appearance commonly found in glassmorphism-inspired designs.

---

# Blur Rendering

The glass effect is achieved using Compose's `RenderEffect` support.

```kotlin
graphicsLayer {
    renderEffect = BlurEffect(
        radiusX = 1.dp.toPx(),
        radiusY = 1.dp.toPx()
    )
}
```

Applying a subtle blur softens the image beneath the panel, creating the impression of frosted glass.

---

# Rounded Corners & Clipping

The blurred image is clipped into a rounded rectangle.

```kotlin
graphicsLayer {
    shape = RoundedCornerShape(24.dp)
    clip = true
}
```

Clipping ensures that both the image and its blur remain confined within the glass panel.

---

# Elevation & Shadow

A shadow is applied to lift the panel above the background.

```kotlin
.shadow(
    elevation = 24.dp,
    shape = RoundedCornerShape(24.dp)
)
```

The shadow creates depth and reinforces the floating glass aesthetic.

---

# Graphics Layer Transformations

The project leverages `graphicsLayer` to combine multiple visual effects into a single rendering pass.

```kotlin
graphicsLayer {

    renderEffect = BlurEffect(...)

    shape = RoundedCornerShape(24.dp)

    clip = true
}
```

Grouping these transformations keeps the implementation clean while allowing the rendering pipeline to optimize the visual effects.

---

# Modern UI Design

The resulting effect resembles the glassmorphism style commonly used in modern operating systems and design systems.

Potential use cases include:

- Profile cards
- Media players
- Authentication screens
- Settings panels
- Dashboard widgets
- Floating dialogs
- Image galleries

---

# Technical Highlights

The project demonstrates several Compose graphics features used to build polished user interfaces.

Highlights include:

- Layered composable rendering.
- Graphics layer transformations.
- Blur effects using RenderEffect.
- Rounded shape clipping.
- Elevation and shadow rendering.
- Image scaling techniques.
- Glassmorphism-inspired UI.
- Declarative layout composition.
- Modern visual design implementation.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Graphics APIs
- Graphics Layer
- RenderEffect
- Blur Effects
- Shape Clipping
- Shadows & Elevation
- Image Rendering
- Modern UI Design
- Glassmorphism
- Declarative UI