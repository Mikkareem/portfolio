# Instagram Multi Profile Container

**Instagram Multi Profile Container** is a custom UI component built entirely with **Jetpack Compose's Layout API**, recreating the overlapping profile avatar pattern commonly seen in social media applications. Instead of relying on nested `Row` layouts with negative offsets, the component performs its own measurement and placement, allowing complete control over avatar positioning and spacing.

The container is fully reusable and accepts any number of composable profile items, making it suitable for displaying group chats, story viewers, reactions, participants, and collaborative user interfaces.

---

# Features

- Instagram-style overlapping profile avatars
- Custom Layout implementation
- Manual measurement and placement
- Configurable overlap spacing
- Supports any number of profiles
- Fully reusable composable
- Responsive sizing
- Compose-first implementation

---

# Custom Layout (Measurement & Placement)

The component is implemented using Compose's low-level `Layout` API, providing complete control over how profile images are measured and positioned.

```kotlin
Layout(
    contents = profiles,
    modifier = modifier
) { measurables, constraints ->

    val placeables =
        measurables.map { measurable ->

            measurable.map {
                it.measure(constraints)
            }

        }

    // Measure and place children
}
```

Using `Layout` eliminates the need for complex modifier chains while enabling highly customized positioning logic.

---

# Dynamic Child Measurement

Each profile composable is measured independently using the incoming layout constraints.

```kotlin
val listOfPlaceables =
    listOfMeasurables.map {

        measurables ->

        measurables.map {

            it.measure(constraints)

        }

    }
```

Measuring children individually allows the container to support different avatar sizes while maintaining consistent layout behavior.

---

# Calculating Container Size

The container width is calculated dynamically based on the total number of profiles and the configured overlap distance.

```kotlin
val containerWidth =
    listOfPlaceables.last()
        .maxOf { it.width }

val placeableWidth =
    ((listOfPlaceables.size - 1) *
        gap.roundToPx()) +
    containerWidth
```

Rather than summing the widths of every avatar, only the overlap spacing and the width of the final profile determine the container's total width.

This closely mirrors how overlapping profile stacks are rendered in modern social media applications.

---

# Manual Placement

After measurement, each profile image is manually positioned using an incremental horizontal offset.

```kotlin
layout(
    placeableWidth,
    placeableHeight
) {

    var currentOffsetX = 0

    listOfPlaceables.forEach {

        it.forEach { placeable ->

            placeable.place(
                currentOffsetX,
                0
            )

        }

        currentOffsetX += gap.roundToPx()
    }
}
```

By controlling placement directly, the component produces smooth overlapping avatars without requiring negative padding, translation, or nested layouts.

---

# Configurable Overlap

The amount of overlap between profile images is fully customizable through a simple parameter.

```kotlin
InstagramMultiProfileContainer(
    gap = 35.dp,
    profiles = profiles
)
```

Adjusting the gap changes how tightly the avatars overlap, making the component adaptable for different UI designs.

---

# Composable-Based API

Rather than accepting image resources directly, the component receives a list of composable lambdas.

```kotlin
profiles = listOf(

    @Composable {

        Image(...)

    },

    @Composable {

        Image(...)

    }

)
```

This design makes the container highly flexible, allowing developers to display profile images, placeholders, badges, or any custom composable content.

---

# Reusable Architecture

The container is completely independent of the content it displays.

It can be reused in scenarios such as:

- Instagram story viewers
- Group conversations
- Team members
- Online participants
- Reaction lists
- Shared albums
- Collaborative workspaces

Because it accepts composable content, it integrates naturally into any Compose application.

---

# Responsive Design

The component automatically adapts to different avatar sizes and profile counts.

Whether displaying two users or twenty, the layout calculations remain consistent without requiring additional logic from the caller.

---

# Technical Highlights

This project demonstrates several advanced Jetpack Compose layout concepts.

Highlights include:

- Custom Layout API
- Manual Measurement
- Manual Placement
- Dynamic Layout Calculations
- Configurable Overlapping Layouts
- Composable-Based APIs
- Responsive Component Design
- Reusable UI Architecture
- Declarative UI Development

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Custom Layout API
- Measurement & Placement
- Custom UI Components
- Responsive Layout Design
- Declarative UI
- Component-Based Architecture
- Reusable Composable Design
- Modern Android UI Development