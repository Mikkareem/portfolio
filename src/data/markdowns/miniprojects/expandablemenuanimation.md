# Expandable Menu Animation

**Expandable Menu Animation** is a fully custom navigation component built with **Jetpack Compose**, showcasing advanced layout development, staggered animations, and state-driven UI transitions. Instead of relying on built-in grid components or lazy layouts, the menu is powered by a custom `Layout` implementation with a bespoke measurement policy that dynamically positions its children.

The project demonstrates how Compose's declarative architecture can be combined with low-level layout APIs to create highly interactive navigation experiences with polished animations.

---

# Features

## Expandable Navigation Menu

The component expands from a compact floating button into a fully interactive grid of menu items.

```kotlin
ExpandableMenu(
    totalItems = 9,
    menuItems = ...
)
```

The transition provides a clean and space-efficient navigation experience while keeping the interface uncluttered.

---

# Staggered Item Animations

Each menu item animates independently using its own `Animatable`.

```kotlin
val animationProgresses = remember {

    Array(totalItems) {

        Animatable(0.01f)

    }
}
```

Animating every item individually enables smooth cascading effects during both expansion and collapse.

---

# Sequential Reveal Effect

Menu items appear one after another rather than simultaneously.

```kotlin
(0 until totalItems).forEach {

    launch {

        animationProgresses[it]
            .animateTo(...)
    }

    delay(10)
}
```

This staggered timing creates a more natural and polished user experience.

---

# Morphing Shapes

Each menu item gradually transforms from a small rounded dot into a larger rounded rectangle.

```kotlin
RoundedCornerShape(
    roundedPercentages[index]
)
```

The changing corner radius contributes to the overall feeling of the menu unfolding organically.

---

# Animated Opacity

Items smoothly fade into view as they expand.

```kotlin
.alpha(opacity)
```

Opacity is synchronized with the expansion progress, preventing abrupt visual transitions.

---

# Adaptive Layout Animation

Several layout properties animate together, including:

- Internal padding
- Item spacing
- Corner radius
- Opacity
- Close button visibility

```kotlin
val padding = map(...)
val gap = map(...)
```

These coordinated animations make the component feel cohesive and responsive.

---

# Custom Grid Layout

Instead of using `LazyVerticalGrid`, the project introduces a completely custom layout implementation.

```kotlin
Layout(
    contents = contents,
    measurePolicy =
        ExpandableHorizontalGridMeasurePolicy(...)
)
```

Building the layout from scratch provides full control over measurement and child positioning.

---

# Custom Measure Policy

The layout measures every child before calculating the required container dimensions.

```kotlin
override fun MeasureScope.measure(
    measurables,
    constraints
)
```

The custom measurement algorithm determines:

- Required width
- Required height
- Row placement
- Column placement
- Gap spacing

This demonstrates an understanding of Compose's low-level layout system.

---

# Manual Child Placement

Rather than relying on predefined layouts, every child is positioned manually.

```kotlin
placeable.place(
    currentX,
    currentY
)
```

This approach enables highly customized layouts that aren't possible with standard Compose containers.

---

# Interactive Menu Selection

The selected item is highlighted dynamically.

```kotlin
selectedMenuIndex
```

The component can easily be integrated into navigation systems or dashboard interfaces.

---

# Animated Close Button

A floating close button appears only when the menu has expanded.

```kotlin
AnimatedVisibility(...)
```

This keeps the interface minimal while providing intuitive interaction.

---

# Reusable Architecture

The menu accepts composable content for each item.

```kotlin
menuItems = listOf {

    @Composable {

        ...

    }
}
```

This makes the component reusable for:

- App navigation
- Dashboard shortcuts
- Floating action menus
- Quick actions
- Settings panels
- Productivity applications

---

# Technical Highlights

This project demonstrates multiple advanced Jetpack Compose concepts.

Highlights include:

- Custom Layout implementation.
- MultiContentMeasurePolicy.
- Manual measurement and placement.
- Staggered animations.
- Independent Animatable instances.
- Shape morphing.
- Opacity animations.
- Responsive spacing.
- Declarative state management.
- Reusable composable architecture.
- Custom navigation component.
- Interactive motion design.

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Custom Layout APIs
- MultiContentMeasurePolicy
- Custom Measurement
- Child Placement
- Compose Animation APIs
- Animatable
- AnimatedVisibility
- State Management
- Motion Design
- Custom Navigation Components
- Responsive UI
- Declarative UI Architecture