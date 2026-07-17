# Spotify UI

**Spotify UI** is a Jetpack Compose implementation of a modern music streaming application's home screen. The project recreates a clean and responsive interface inspired by Spotify, featuring personalized recommendations, recently played albums, reusable content sections, horizontally scrolling playlists, category chips, and a bottom navigation bar.

Rather than relying on XML layouts, the entire interface is built using Jetpack Compose's declarative UI toolkit. The project emphasizes reusable composables, state-driven rendering, scalable layouts, and modern Material Design patterns suitable for production applications.

---

# Features

## Personalized Home Screen

The landing page is composed of multiple independent sections including:

- Greeting header
- Category chips
- Recently played collections
- Artist recommendation sections
- Horizontally scrolling playlists
- Bottom navigation

```kotlin
Column(
    modifier = Modifier
        .background(Color.Black)
        .padding(8.dp)
) {
    TopBar()
    ChipsSection()
    RecentSection()

    Section(...)
    Section(...)

    BottomNavigationSection()
}
```

Each section is implemented as a reusable composable, making the layout modular and easy to extend.

---

# Reusable Recommendation Sections

Instead of hardcoding individual playlists, every recommendation area is represented using a reusable `Section` component.

```kotlin
Section(
    sectionType = "More Like",
    sectionTitle = "Yuvan Shankar Raja",
    backgroundColor = Color.Green,
    mainSectionItems = playlists
)
```

Each section contains:

- Artist information
- Playlist carousel
- Independent styling
- Dynamic content source

This allows new recommendation blocks to be added with minimal code.

---

# Horizontally Scrolling Music Lists

Playlists are displayed using **LazyRow**, allowing efficient rendering of large collections.

```kotlin
LazyRow {
    items(mainSectionItems) { item ->
        SectionItem(
            backgroundColor = item.backgroundColor,
            title = item.title,
            subtitle = item.subtitle
        )
    }
}
```

Lazy composition ensures only visible items are composed, improving scrolling performance.

---

# Recently Played Grid

The "Recently Played" area recreates Spotify's compact two-column layout using reusable cards.

```kotlin
Row {
    RecentItem(
        text = "All time Favourites",
        modifier = Modifier.weight(1f)
    )

    Spacer(Modifier.width(8.dp))

    RecentItem(
        text = "All time Favourites",
        modifier = Modifier.weight(1f)
    )
}
```

Each card combines:

- Album artwork
- Playlist title
- Rounded container
- Responsive width

---

# Reusable Playlist Cards

Every recommendation item shares the same reusable UI component.

```kotlin
Column {
    Box(
        modifier = Modifier
            .size(100.dp)
            .background(backgroundColor)
    )

    Text(title)
    Text(subtitle)
}
```

This promotes consistency while simplifying future customization.

---

# Category Filter Chips

Music categories are implemented as reusable chips with rounded styling.

```kotlin
Box(
    modifier = Modifier
        .clip(RoundedCornerShape(45))
        .background(Color.DarkGray)
        .padding(horizontal = 16.dp, vertical = 8.dp)
) {
    Text(text)
}
```

The component can easily support:

- Dynamic genres
- Podcast filters
- Mood categories
- User interests

---

# Custom Home Header

The top section combines a personalized greeting with quick action icons.

```kotlin
Row(
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
) {
    Text("Good evening")

    Row {
        Icon(...)
        Icon(...)
        Icon(...)
    }
}
```

This recreates the familiar streaming app experience while keeping the layout reusable.

---

# Bottom Navigation

A custom bottom navigation bar provides quick access to the application's major sections.

```kotlin
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween
) {
    Icon(Icons.Default.Home, ...)
    Icon(Icons.Default.Search, ...)
    Icon(Icons.Default.List, ...)
    Icon(Icons.Default.Person, ...)
}
```

The navigation is intentionally lightweight and fully customizable for future navigation integration.

---

# Composition Local Typography

Instead of repeatedly passing text styles, the project uses `CompositionLocalProvider` to define a consistent typography hierarchy.

```kotlin
CompositionLocalProvider(
    LocalTextStyle provides poppinsTextStyle
) {
    SpotifyLandingScreen()
}
```

This approach keeps typography centralized and simplifies theme management.

---

# Modular UI Architecture

The interface is organized into reusable composables.

- TopBar
- ChipsSection
- RecentSection
- Section
- TopSection
- MainSection
- SectionItem
- RecentItem
- BottomNavigationSection

Each component has a single responsibility, making the project easier to maintain and expand.

---

# Declarative UI Development

Every screen is driven by immutable data models.

```kotlin
private data class MainSectionItem(
    val title: String,
    val subtitle: String,
    val backgroundColor: Color
)
```

Rendering becomes a direct function of application state, following Compose's declarative programming model.

---

# Technical Highlights

This project demonstrates several modern Android UI development techniques using Jetpack Compose.

Highlights include:

- Spotify-inspired home screen
- Declarative UI architecture
- Modular composable design
- Reusable playlist components
- LazyRow-based horizontal scrolling
- Dynamic recommendation sections
- Responsive layouts
- Material Design styling
- CompositionLocal typography
- State-driven rendering
- Component reusability
- Modern navigation layout

---

# Skills Demonstrated

- Kotlin
- Jetpack Compose
- Material 3
- LazyRow
- Responsive Layout Design
- Declarative UI Development
- CompositionLocal
- State Management
- Component-Based Architecture
- UI Modularization
- Custom Reusable Components
- Modern Android UI Design
- Performance-Oriented List Rendering