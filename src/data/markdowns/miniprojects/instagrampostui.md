# Instagram Post Card UI

**Instagram Post Card UI** is a modern social media post component built entirely with **Jetpack Compose**, recreating the familiar Instagram post experience using declarative UI principles. The project includes a profile header, media section, carousel indicator, action controls, and post metadata.

Rather than relying entirely on Compose's built-in arrangements, the project demonstrates advanced techniques such as **custom horizontal arrangements**, **rich text styling**, **custom page indicators**, and **component-driven UI architecture** to create a reusable and highly customizable social media card.

---

# Features

- Instagram-inspired post layout
- Profile header
- Media container
- Carousel indicator
- Action buttons
- Rich caption styling
- Badge overlay
- Responsive layouts
- Material 3 components
- Reusable composables

---

# Custom Horizontal Arrangement

The post action bar uses a custom implementation of `Arrangement.Horizontal` to precisely position three independent sections.

Unlike `Arrangement.SpaceBetween`, the page indicator always remains perfectly centered while the action buttons stay aligned to the edges.

```kotlin
private object InstagramPostControllerArrangement
    : Arrangement.Horizontal {

    override fun Density.arrange(
        totalSize: Int,
        sizes: IntArray,
        layoutDirection: LayoutDirection,
        outPositions: IntArray
    ) {

        outPositions[0] = 0

        outPositions[1] =
            totalSize / 2 - sizes[1] / 2

        outPositions[2] =
            totalSize - sizes[2]
    }
}
```

This provides complete control over child placement and ensures consistent alignment regardless of the content width.

---

# Responsive Media Container

The media section maintains a perfect square regardless of screen size using Compose's `aspectRatio()` modifier.

```kotlin
Box(
    modifier = Modifier
        .fillMaxWidth()
        .aspectRatio(1f)
        .background(Color.Red)
)
```

Using an aspect ratio guarantees that media is displayed consistently across different devices without manually calculating dimensions.

---

# Carousel Position Badge

A floating badge overlays the media to indicate the current image position within a carousel.

```kotlin
Badge(
    containerColor = Color.Black,
    modifier = Modifier
        .padding(10.dp)
        .align(Alignment.TopEnd)
) {

    Text("2/10")

}
```

Overlaying components with `Box` enables clean layering while keeping the implementation simple and reusable.

---

# Custom Carousel Indicator

The page indicator is built using simple composables instead of external libraries.

Each dot dynamically changes color based on the currently selected page.

```kotlin
repeat(count) {

    Box(
        modifier = Modifier
            .size(8.dp)
            .clip(CircleShape)
            .background(

                if (it == index)
                    Color.Magenta
                else
                    Color.Gray

            )
    )

}
```

This lightweight implementation makes it easy to customize the appearance and animation of the indicator.

---

# Rich Caption Styling

The caption combines multiple text styles within a single `Text` composable using `AnnotatedString`.

```kotlin
Text(
    text = buildAnnotatedString {

        append("Instagram Template ")

        withStyle(
            SpanStyle(
                color = Color.Blue
            )
        ) {
            append("#template")
        }

    }
)
```

Using `AnnotatedString` enables hashtags, mentions, and highlighted text without introducing additional composables.

---

# CompositionLocal Styling

Shared typography is applied using `CompositionLocalProvider`, reducing repetitive styling across multiple text components.

```kotlin
CompositionLocalProvider(

    LocalTextStyle provides
        TextStyle(fontSize = 18.sp)

) {

    Text("10,328 views")

    Text("View all comments")

}
```

This approach improves consistency while keeping the composable hierarchy clean.

---

# Modular Component Architecture

The post card is composed of multiple reusable UI sections.

Components include:

- Profile Header
- Media Section
- Carousel Badge
- Action Controls
- Carousel Indicator
- Caption
- Metadata

Each component is isolated into its own composable, making the UI easier to maintain and reuse.

---

# Responsive Layout Design

The interface automatically adapts to different screen sizes using Compose's layout system.

Components leverage:

- `fillMaxWidth()`
- `aspectRatio()`
- `Spacer`
- `Arrangement`
- `Alignment`

to maintain consistent spacing and visual hierarchy across devices.

---

# Technical Highlights

This project demonstrates several advanced Jetpack Compose UI techniques.

Highlights include:

- Custom Horizontal Arrangement
- Responsive Layout Design
- Aspect Ratio Layouts
- Badge Overlays
- Rich Text Styling
- AnnotatedString
- CompositionLocalProvider
- Reusable Composable Architecture
- Custom Carousel Indicator
- Material 3 Components
- Declarative UI Development

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Material 3
- Custom Arrangement
- Layout Management
- AnnotatedString
- CompositionLocalProvider
- Responsive UI Design
- Component-Based Architecture
- Declarative UI
- Reusable Composables
- Modern Android UI Development