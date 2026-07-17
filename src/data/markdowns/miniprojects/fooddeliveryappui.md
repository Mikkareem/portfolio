# Food Delivery App UI

**Food Delivery App UI** is a modern food ordering interface built entirely with **Jetpack Compose**, showcasing advanced UI development techniques through custom layouts, drawing APIs, reusable composables, and responsive design. The project recreates a complete food ordering experience with multiple screens including a personalized home page, promotional offers, food details, shopping cart, and delivery tracking.

Rather than relying solely on Compose's built-in layouts, several components are implemented using low-level APIs such as **Layout**, **Canvas Drawing**, and **Custom Modifiers**, demonstrating how Compose can be extended to build unique, production-quality interfaces.

---

# Features

- Home dashboard with personalized recommendations
- Promotional deals banner
- Food listing with reusable cards
- Product details screen
- Shopping cart
- Quantity selector
- Custom discounted price rendering
- Courier tracking interface
- Responsive layouts
- Material 3 Design
- Fully reusable composable architecture

---

# Custom Layout (Measurement & Placement)

One of the most interesting parts of this project is the promotional **Special Deals** banner.

Instead of using a traditional `Row`, the banner is built using Compose's low-level **Layout API**, allowing each child to be measured independently before being positioned manually.

```kotlin
Layout(
    modifier = Modifier
        .clip(RoundedCornerShape(20.dp))
        .background(Color(0xff3f434b)),
    content = {
        PromotionalContent()
        PromotionalImage()
    }
) { measurables, constraints ->

    val leftConstraints =
        constraints.copy(
            maxWidth = constraints.maxWidth / 2
        )

    val left =
        measurables[0].measure(leftConstraints)

    val right =
        measurables[1].measure(
            leftConstraints.copy(
                maxHeight = left.height
            )
        )

    layout(constraints.maxWidth, left.height) {
        left.place(0, 0)

        right.place(
            leftConstraints.maxWidth,
            0
        )
    }
}
```

Using the `Layout` composable provides complete control over the measurement and placement phases, making it possible to create highly customized responsive layouts without deeply nested composables.

---

# Custom Drawing — Discount Strike-through

Rather than using the built-in `TextDecoration.LineThrough`, discounted prices are rendered with a custom diagonal strike-through using `drawWithContent()`.

```kotlin
@Composable
private fun StrikeText(
    text: String
) {
    Text(
        text = text,
        modifier = Modifier.drawWithContent {

            drawContent()

            drawLine(
                color = LocalTextStyle.current.color,
                start = Offset(
                    size.width,
                    2.dp.toPx()
                ),
                end = Offset(
                    0f,
                    size.height - 2.dp.toPx()
                ),
                strokeWidth = 2.dp.toPx()
            )
        }
    )
}
```

Drawing directly on the canvas allows the application to create unique visual effects while demonstrating Compose's low-level rendering capabilities.

---

# Rich Text Styling

Product information combines multiple text styles using `AnnotatedString`.

The item quantity is displayed with a smaller font and reduced opacity while remaining inside a single `Text` composable.

```kotlin
Text(
    text = buildAnnotatedString {

        append(item.itemName)

        append(" ")

        withStyle(
            SpanStyle(
                fontSize = 12.sp,
                color = Color.Gray
            )
        ) {
            append("x${item.itemCount}")
        }
    }
)
```

Using `AnnotatedString` avoids unnecessary nested layouts while producing cleaner and more expressive typography.

---

# Custom Quantity Controls

The increment and decrement buttons are created using Compose's drawing APIs rather than image assets.

Circular outlines are drawn manually behind each control.

```kotlin
Text(
    text = "+",
    modifier = Modifier.drawBehind {

        drawCircle(
            color = Color.White,
            radius = size.width,
            style = Stroke(
                width = 1.dp.toPx()
            )
        )
    }
)
```

This demonstrates how custom graphics can be combined with composables to build lightweight, reusable UI components.

---

# Responsive Promotional Banner

The promotional banner adapts automatically to different screen sizes by measuring the text section and image independently.

Unlike traditional layouts, the image height is constrained to match the measured height of the promotional content, ensuring a balanced appearance across different devices.

This demonstrates how custom measurement logic can be used to create responsive interfaces without relying on fixed dimensions.

---

# Reusable Food Cards

Food items are encapsulated into reusable composables that can be displayed across multiple sections such as **Popular Foods** and **Based on Your History**.

```kotlin
@Composable
private fun FoodCard(
    foodCardDetail: FoodCardDetail
) {
    Column(
        modifier = Modifier
            .clip(RoundedCornerShape(20.dp))
            .background(Color.White)
            .padding(16.dp)
    ) {

        // Food image

        // Product information

        // Add to cart button

    }
}
```

Building reusable composables simplifies maintenance while ensuring visual consistency throughout the application.

---

# Efficient List Rendering

Food collections are displayed using `LazyRow`, allowing Compose to render only the visible items.

```kotlin
LazyRow(
    horizontalArrangement =
        Arrangement.spacedBy(16.dp),

    contentPadding =
        PaddingValues(8.dp)
) {

    items(foodCardDetails) {

        FoodCard(it)

    }

}
```

Lazy layouts improve scrolling performance while making large datasets efficient to display.

---

# Material 3 Components

The interface leverages Material 3 components while applying a custom visual identity.

Buttons, text fields, icons, and typography are customized to match the application's branding.

```kotlin
Button(
    onClick = { },
    colors = ButtonDefaults.buttonColors(
        containerColor = Color(0xfff46859)
    ),
    modifier = Modifier.fillMaxWidth()
) {
    Text("Order Now")
}
```

Material 3 provides accessibility, consistency, and a modern user experience while remaining highly customizable.

---

# Modular UI Architecture

The project follows a component-based architecture where each section of the UI is implemented as an independent composable.

Examples include:

- Top Bar
- Search Bar
- Promotional Banner
- Food Card
- Cart Item
- Quantity Selector
- Courier Card
- Delivery Information
- Section Header

This modular approach improves readability, reusability, and scalability as the application grows.

---

# Screens

The application includes multiple screens representing a complete food ordering workflow.

- Food Overview
- Special Deals
- Food Details
- Shopping Cart
- Order Summary
- Delivery Tracking

Each screen is composed entirely using reusable Jetpack Compose components.

---

# Technical Highlights

This project demonstrates several advanced UI development concepts using Jetpack Compose.

Highlights include:

- Custom Layout API
- Measurement & Placement
- Compose Drawing APIs
- Custom Canvas Rendering
- AnnotatedString Styling
- Responsive UI Design
- Material 3
- Lazy Layouts
- Reusable Composable Architecture
- Custom Modifiers
- Declarative UI Development
- Modern Android UI Design

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Material 3
- Custom Layout API
- Measurement & Placement
- Compose Canvas
- Custom Drawing
- AnnotatedString
- Responsive UI
- LazyRow
- State-Driven UI
- Component-Based Architecture
- Modern Android Development
- Declarative UI
