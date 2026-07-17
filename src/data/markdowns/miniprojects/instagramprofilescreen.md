# Instagram Profile Screen

**Instagram Profile Screen** is a modern social media profile interface built entirely with **Jetpack Compose**, recreating the profile experience found in Instagram. The screen includes a profile header, statistics section, action buttons, suggested followers, and a fully custom verification badge drawn using Compose's Canvas APIs.

Rather than relying on image assets for icons and decorations, the project demonstrates advanced graphics programming by generating the verification badge procedurally using **Canvas**, **Path**, **Bezier Curves**, and **mathematical calculations**.

---

# Features

- Instagram-inspired profile layout
- Custom verification badge
- Canvas-based graphics
- Profile statistics
- Responsive action buttons
- Suggested followers section
- Reusable follower cards
- Material 3 components
- Responsive layouts
- Component-driven architecture

---

# Custom Verification Badge

Instead of displaying an image asset, the verification badge is generated entirely using **Compose Canvas**.

The badge consists of multiple curved segments that form Instagram's distinctive verified icon.

```kotlin
Canvas(
    modifier = Modifier.fillMaxSize()
) {

    drawPath(
        path = path,
        color = Color.Blue
    )

}
```

Generating the badge procedurally allows it to scale perfectly to any size without losing quality.

---

# Path Generation

The badge outline is created using a combination of `Path` operations and quadratic Bézier curves.

Each segment is generated mathematically around a circle.

```kotlin
repeat(totalCombs) {

    moveTo(x, y)

    quadraticBezierTo(
        middleX,
        middleY,
        nextX,
        nextY
    )

}
```

Using Bézier curves creates smooth outward curves that closely resemble the official verification badge.

---

# Polar Coordinate Calculations

Each control point is calculated using trigonometric functions.

```kotlin
val x =
    (radius * cos(angle))
        .toFloat()

val y =
    (radius * sin(angle))
        .toFloat()
```

Using polar coordinates allows every point to be distributed evenly around the circle, making the badge completely scalable.

---

# Custom Checkmark Drawing

The checkmark inside the badge is also rendered manually using Canvas.

```kotlin
drawLine(
    color = Color.White,
    start = startPoint,
    end = middlePoint,
    strokeWidth = padding
)

drawLine(
    color = Color.White,
    start = endPoint,
    end = middlePoint,
    strokeWidth = padding
)
```

By drawing the checkmark procedurally, the component remains resolution-independent while avoiding external image assets.

---

# Canvas Transformations

The badge is positioned using Canvas transformations rather than manually adjusting every coordinate.

```kotlin
translate(

    left = center.x,

    top = center.y

) {

    drawPath(...)

}
```

Canvas transformations simplify complex drawing operations while keeping the implementation easy to understand.

---

# Responsive Profile Statistics

The profile statistics section uses weighted layouts to distribute information evenly across the available width.

```kotlin
Row(
    modifier = Modifier.weight(1f),
    horizontalArrangement =
        Arrangement.SpaceAround
) {

    StatisticItem()

}
```

Using weights ensures that the profile metrics remain balanced on different screen sizes.

---

# Suggested Followers

Suggested profiles are displayed using `LazyRow`, allowing efficient rendering of horizontally scrolling content.

```kotlin
LazyRow(
    horizontalArrangement =
        Arrangement.spacedBy(8.dp)
) {

    items(5) {

        SuggestedFollowerCard()

    }

}
```

Lazy layouts render only visible items, providing excellent scrolling performance even with large datasets.

---

# Reusable Follower Cards

Each suggested profile is encapsulated into an independent composable.

```kotlin
@Composable
fun SuggestedFollowerCard() {

    Column(

        horizontalAlignment =
            Alignment.CenterHorizontally

    ) {

        ProfilePicture()

        FollowButton()

    }

}
```

This modular approach improves maintainability while allowing the component to be reused in multiple screens.

---

# Responsive Action Buttons

The **Follow** and **Message** buttons automatically share the available width using Compose's weight system.

```kotlin
Box(
    modifier = Modifier
        .weight(1f)
        .clip(
            RoundedCornerShape(35)
        )
)
```

Weighted layouts provide a responsive button arrangement without requiring fixed dimensions.

---

# Component-Based Architecture

The screen is divided into reusable UI components.

Components include:

- Profile Header
- Verification Badge
- Statistics Section
- Follow Button
- Message Button
- Suggested Followers
- Follower Card

This separation of responsibilities improves readability, scalability, and future maintainability.

---

# Technical Highlights

This project demonstrates several advanced Jetpack Compose graphics and layout concepts.

Highlights include:

- Compose Canvas
- Custom Path Drawing
- Bézier Curves
- Polar Coordinate Mathematics
- Trigonometric Calculations
- Canvas Transformations
- Responsive Layout Design
- LazyRow
- Component-Based Architecture
- Material 3
- Declarative UI Development

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Compose Canvas
- Custom Graphics Rendering
- Path API
- Bézier Curves
- Trigonometry
- Responsive UI Design
- LazyRow
- Component-Based Architecture
- Declarative UI
- Modern Android UI Development
