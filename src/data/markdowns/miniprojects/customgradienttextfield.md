# Custom Gradient TextField

The **Custom Gradient TextField** demonstrates how to build a production-ready text input component without relying on Material's default `TextField`. Instead, it is implemented using **BasicTextField**, custom layout measurement, and reusable composables to provide complete control over appearance, behavior, and interaction.

The component separates the input logic from its presentation, allowing developers to customize every aspect of the TextField—from gradients and icons to focus management and layout measurement—making it suitable for design systems and highly branded applications.

Unlike standard Material components, this implementation gives complete ownership over rendering, sizing, padding, and interaction handling.

---

## Features

- Built entirely using **BasicTextField**
- Custom gradient container
- Fully customizable border and shape
- Leading and trailing composable slots
- Multi-line text support
- Explicit focus management
- Keyboard actions and keyboard options
- Custom measurement using Compose Layout APIs
- Reusable and highly configurable API
- Material-independent UI implementation

---

## Technologies Used

- Kotlin
- Jetpack Compose
- BasicTextField
- Custom Layout
- MeasurePolicy
- FocusRequester
- MutableInteractionSource
- Brush Gradients
- Compose Drawing APIs

---

# Building a TextField From Scratch

Instead of relying on Material's `TextField`, the component starts with the lower-level API.

```kotlin
BasicTextField(
    value = value,
    onValueChange = onValueChanged,
    textStyle = textStyle
)
```

`BasicTextField` is responsible only for text editing.

Everything else—including backgrounds, borders, icons, animations, paddings, and layout—is implemented manually.

---

# Gradient Container

The container uses a configurable gradient brush instead of a solid color.

```kotlin
containerBrush = Brush.horizontalGradient(
    colors = listOf(
        Color.Magenta,
        Color(200, 100, 0)
    )
)
```

This makes the component suitable for modern UI themes while allowing any `Brush` implementation to be supplied.

Examples include:

- Linear gradients
- Radial gradients
- Sweep gradients
- Animated brushes

---

# Completely Custom Layout

One of the most interesting parts of the component is the custom layout implementation.

Instead of nesting multiple `Row`s and `Box`es, the component measures and positions children manually.

```kotlin
Layout(
    content = content,
    measurePolicy = CustomTextFieldLayoutMeasurePolicy()
)
```

The layout is responsible for positioning:

- Leading icon
- Text field
- Trailing icon
- Focus overlay

This approach offers significantly more flexibility than traditional Compose layouts.

---

# Manual Measurement

The custom `MeasurePolicy` determines how much space every child occupies.

```kotlin
val leading = leadingIcon.measure(...)
val trailing = trailingIcon.measure(...)

val textConstraints =
    constraints.offset(
        horizontal = -(leading.width + trailing.width)
    )
```

After measurement, the remaining width is assigned to the text field.

This prevents icons from overlapping text while allowing the component to adapt naturally to different icon sizes.

---

# Manual Placement

After measuring children, the layout manually positions each element.

```kotlin
leading.place(...)
text.place(...)
trailing.place(...)
```

Because placement is completely manual, the component can support virtually any future layout arrangement without changing its public API.

---

# Leading & Trailing Slots

Instead of accepting only icons, the component exposes composable slots.

```kotlin
CustomTextField(
    leadingIcon = {
        Icon(...)
    },
    trailingIcon = {
        Row {
            Icon(...)
            Icon(...)
            Icon(...)
        }
    }
)
```

This allows developers to place:

- Icons
- Loading indicators
- Buttons
- Badges
- Counters
- Custom composables

without changing the TextField implementation.

---

# Explicit Focus Management

The component supports programmatic focus using `FocusRequester`.

```kotlin
val focusRequester = remember {
    FocusRequester()
}

focusRequester.requestFocus()
```

This is useful for:

- Login screens
- Search bars
- OTP fields
- Chat applications
- Forms

---

# Focus Overlay

An interesting implementation detail is the invisible focus overlay.

```kotlin
Box(
    modifier = Modifier
        .clickable {
            focusRequester.requestFocus()
        }
)
```

Instead of requiring users to tap directly on the text glyphs, the entire editable region becomes clickable, creating a much better user experience.

---

# Custom Borders

The border is completely configurable.

```kotlin
border = BorderStroke(
    width = 3.dp,
    brush = SolidColor(Color.Magenta)
)
```

Since the border accepts any `Brush`, it can easily support:

- Animated borders
- Rainbow borders
- Neon effects
- Gradient outlines

---

# Shape Customization

The component accepts any Compose `Shape`.

```kotlin
shape = RoundedCornerShape(40.dp)
```

Developers can easily swap it with:

- `CircleShape`
- `CutCornerShape`
- Custom shapes
- Material shapes

without modifying the implementation.

---

# Multi-line Support

The TextField isn't restricted to a single line.

```kotlin
CustomTextField(
    maxLines = 4
)
```

This makes it suitable for:

- Notes
- Comments
- Chat messages
- Forms
- Feedback screens

---

# Keyboard Integration

Compose keyboard APIs are fully exposed.

```kotlin
CustomTextField(
    keyboardOptions = KeyboardOptions.Default,
    keyboardActions = KeyboardActions.Default
)
```

Developers can customize:

- IME actions
- Keyboard type
- Auto-capitalization
- Password input
- Search keyboards

---

# Reusable Component API

Nearly every visual aspect is configurable.

```kotlin
CustomTextField(
    value = value,
    onValueChanged = { },
    shape = RoundedCornerShape(40.dp),
    containerBrush = Brush.horizontalGradient(...),
    border = BorderStroke(...),
    leadingIcon = { ... },
    trailingIcon = { ... }
)
```

This makes the component reusable across multiple applications while maintaining a consistent API.

---

# Design Goals

The project focuses on demonstrating:

- Custom Compose component architecture
- Layout measurement
- Manual child placement
- Reusable composable APIs
- Focus handling
- Advanced UI customization
- Separation of behavior from presentation

---

## Learning Outcomes

This project explores several advanced Jetpack Compose concepts, including:

- Building components from `BasicTextField`
- Writing custom `MeasurePolicy`
- Manual layout measurement and placement
- Gradient rendering
- Custom borders and shapes
- Focus management
- Slot-based component architecture
- Reusable Compose APIs
- Advanced state management
- Building design-system-ready UI components

---

## Conclusion

The **Custom Gradient TextField** showcases how powerful Jetpack Compose becomes when working beyond the standard Material components. By combining `BasicTextField`, custom layouts, gradient rendering, and flexible slot APIs, the project demonstrates how to build scalable, reusable, and fully customizable input components that can serve as the foundation of a modern design system or production-grade application.