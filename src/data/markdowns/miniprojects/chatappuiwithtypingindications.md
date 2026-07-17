# Chat App UI

**Chat App UI** is a modern messaging interface built entirely with **Jetpack Compose**, recreating the experience of a contemporary chat application. The project includes a conversation list, chat detail screen, animated typing indicator, dynamic message bubbles, and interactive message composer.

Rather than relying solely on standard Compose components, the project explores advanced UI techniques including **custom arrangements**, **animated visibility**, **crossfade transitions**, **custom message grouping**, and **state-driven rendering** to create a polished and responsive messaging experience.

---

# Features

- Conversation list
- Chat detail screen
- Custom message bubbles
- Automatic message grouping
- Animated typing indicator
- Online presence indicator
- Dynamic message composer
- Crossfade send button animation
- Bottom navigation
- Material 3 components
- Responsive layouts
- Reusable composable architecture

---

# Dynamic Message Grouping

Consecutive messages from the same sender are intelligently grouped together.

Instead of displaying a profile picture for every message, the UI determines whether the current message is the last message in a sequence before rendering the avatar.

```kotlin
val canShowProfilePicture =
    (i == messageDetails.lastIndex) ||

    (
        (i + 1) < messageDetails.size &&
        messageDetails[i].ownerType !=
        messageDetails[i + 1].ownerType
    )
```

This creates a cleaner conversation layout similar to modern messaging applications while reducing visual repetition.

---

# Custom Message Bubble Shapes

Message bubbles dynamically adjust their corner radius depending on whether they are connected to adjacent messages.

```kotlin
.clip(
    RoundedCornerShape(
        topStartPercent = 35,
        topEndPercent = 35,
        bottomEndPercent =
            if (canShowProfilePicture) 0 else 35,
        bottomStartPercent = 35
    )
)
```

By modifying the bubble shape based on message grouping, conversations appear more natural and visually connected.

---

# Custom Horizontal Arrangement

The chat header demonstrates a custom implementation of Compose's `Arrangement.Horizontal`.

Instead of using predefined arrangements, child positioning is calculated manually.

```kotlin
horizontalArrangement =
    object : Arrangement.Horizontal {

        override fun Density.arrange(
            totalSize: Int,
            sizes: IntArray,
            layoutDirection: LayoutDirection,
            outPositions: IntArray
        ) {
            outPositions[1] = 0
        }
    }
```

This demonstrates how Compose layouts can be customized beyond the standard alignment options.

---

# Animated Typing Indicator

The typing indicator recreates the familiar animated dots seen in messaging applications.

Each dot uses an independent `Animatable` while coroutines stagger their animations to create a continuous typing effect.

```kotlin
val animationProgresses =
    remember {
        List(totalDots) {
            Animatable(0f)
        }
    }

LaunchedEffect(Unit) {

    while (true) {

        animationProgresses.forEach {

            launch {
                it.animateTo(1f)
                it.animateTo(0f)
            }

            delay(100)
        }

        delay(700)
    }
}
```

This approach creates smooth sequential animations without requiring any external animation libraries.

---

# Animated Dot Rendering

Each typing indicator dot moves vertically based on the animation progress.

```kotlin
Box(
    modifier = Modifier
        .offset {

            IntOffset(
                0,
                map(
                    animationProgress.value,
                    0f,
                    1f,
                    0f,
                    -10.dp.toPx()
                ).toInt()
            )

        }
        .size(13.dp)
        .clip(CircleShape)
)
```

Animating the offset produces a lightweight bouncing effect that mimics real-world messaging applications.

---

# Crossfade Message Composer

The message composer dynamically switches between microphone/attachment actions and the send button depending on whether text has been entered.

```kotlin
Crossfade(
    targetState = messageValue.isNotBlank(),
    label = ""
) {

    if (it) {

        SendButton()

    } else {

        VoiceAndAttachmentButtons()

    }
}
```

This provides contextual actions while keeping the interface clean and intuitive.

---

# Animated Online Status

User availability is displayed using an animated online indicator.

```kotlin
AnimatedVisibility(
    visible = isOnline,
    modifier = Modifier.align(
        Alignment.BottomEnd
    )
) {

    Box(
        modifier = Modifier
            .size(15.dp)
            .clip(CircleShape)
            .background(Color.Green)
    )
}
```

Using `AnimatedVisibility` allows the status indicator to appear and disappear smoothly as user presence changes.

---

# Conversation List

Recent conversations are rendered using reusable message list items.

```kotlin
chatList.forEach {

    MessageItem(
        messageItemState = it
    )

}
```

Each item displays the profile picture, latest message, timestamp, online status, and unread message count while maintaining a consistent layout.

---

# Stateful Message Composer

The input field is fully state-driven using Compose's state management.

```kotlin
var messageValue by remember {
    mutableStateOf("")
}

TextField(
    value = messageValue,
    onValueChange = {
        messageValue = it
    }
)
```

Compose automatically updates the interface whenever the message content changes, enabling reactive UI behavior.

---

# Reusable Component Architecture

The application is built using reusable composables that encapsulate specific UI responsibilities.

Components include:

- Conversation List Item
- Chat Bubble
- Typing Indicator
- Profile Picture
- Online Status Indicator
- Date Header
- Top App Bar
- Bottom Navigation
- Message Composer
- Navigation Tabs

This modular approach improves readability, scalability, and maintainability.

---

# Screens

The project consists of multiple messaging screens.

- Conversation List
- Chat Details
- Message Composer
- Typing Indicator
- Navigation Dashboard

Together, these screens recreate the workflow of a modern messaging application.

---

# Technical Highlights

This project demonstrates several advanced Jetpack Compose concepts used in modern messaging applications.

Highlights include:

- Dynamic Message Grouping
- Custom Bubble Shapes
- Custom Horizontal Arrangement
- Animated Typing Indicator
- Animatable API
- AnimatedVisibility
- Crossfade Animation
- Stateful Text Input
- Responsive Layouts
- Material 3
- Reusable Composable Architecture
- Declarative UI Development

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Material 3
- Animatable
- AnimatedVisibility
- Crossfade
- State Management
- Custom Layouts
- Custom Arrangement
- Coroutine-based Animations
- Reactive UI
- Component-Based Architecture
- Modern Android UI Development
- Declarative UI