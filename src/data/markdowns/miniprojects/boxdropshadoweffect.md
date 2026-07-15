# Custom Box Shadow Effect

**Custom Box Shadow Effect** is a custom rendering utility built with **Jetpack Compose**, demonstrating how CSS-like box shadows can be recreated using Compose's low-level drawing APIs. Instead of relying on the framework's built-in elevation system, the project manually renders shadows with configurable **blur**, **spread**, **offset**, and **color**, providing greater control over the final visual appearance.

The implementation explores how Android's graphics pipeline can be integrated with Compose to create reusable visual effects commonly found in modern UI design systems.

---

# Features

## Custom Shadow Modifier

The project exposes a reusable `Modifier.shadow()` extension that can be applied to any composable.

```kotlin
Modifier.shadow(
    blurAmount = 15.dp,
    offsetX = 5.dp,
    offsetY = 5.dp,
    spread = 3.dp
)
```

Unlike elevation-based shadows, every aspect of the shadow can be customized independently.

---

# Configurable Shadow Properties

The modifier supports several configurable parameters.

- Blur radius
- Horizontal offset
- Vertical offset
- Shadow spread
- Shadow color

```kotlin
fun Modifier.shadow(
    offsetX: Dp,
    offsetY: Dp,
    blurAmount: Dp,
    spread: Dp,
    shadowColor: Color
)
```

These properties closely resemble the shadow model used in CSS, making the modifier familiar and flexible.

---

# Low-Level Canvas Rendering

Rather than relying on built-in Compose effects, the shadow is rendered manually using `drawBehind`.

```kotlin
drawBehind {

    drawIntoCanvas {

        ...
    }
}
```

This provides complete control over how the shadow is generated and drawn.

---

# Blur Effect

The softness of the shadow is achieved using Android's `BlurMaskFilter`.

```kotlin
frameworkPaint.maskFilter =
    BlurMaskFilter(
        blurAmount.toPx(),
        BlurMaskFilter.Blur.NORMAL
    )
```

Applying a mask filter creates smooth shadow edges that closely resemble native rendering.

---

# Shadow Geometry

The shadow rectangle is calculated manually by combining the composable's size with configurable spread and offset values.

```kotlin
val left =
    -spread + offsetX

val top =
    -spread + offsetY

val right =
    size.width + spread + offsetX

val bottom =
    size.height + spread + offsetY
```

This allows the shadow to expand beyond the composable's bounds while remaining fully customizable.

---

# Canvas Paint Integration

The project bridges Compose graphics with Android's underlying graphics framework.

```kotlin
val frameworkPaint =
    paint.asFrameworkPaint()
```

By accessing the framework paint, advanced rendering features such as blur filters become available within Compose.

---

# Rendering the Shadow

The shadow is finally rendered as a blurred rectangle behind the composable.

```kotlin
canvas.drawRect(
    left,
    top,
    right,
    bottom,
    frameworkPaint.asComposePaint()
)
```

Because the shadow is drawn before the composable's content, it naturally appears beneath the UI element.

---

# Reusable UI Utility

Since the implementation is packaged as a modifier extension, it can be reused across any Compose component.

Example use cases include:

- Cards
- Floating buttons
- Dialogs
- Profile images
- Navigation components
- Dashboard widgets
- Custom design systems

---

# Technical Highlights

The project demonstrates several advanced rendering techniques within Jetpack Compose.

Highlights include:

- Custom Modifier development.
- Low-level Canvas rendering.
- Custom shadow generation.
- Blur mask filtering.
- Framework Paint integration.
- Configurable spread calculations.
- Offset-based positioning.
- CSS-inspired shadow modeling.
- Reusable graphics utilities.
- Declarative UI extensions.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Modifiers
- Compose Canvas
- drawBehind
- drawIntoCanvas
- Android Graphics
- BlurMaskFilter
- Framework Paint APIs
- Custom Drawing APIs
- Graphics Programming
- UI Rendering
- Modern UI Design