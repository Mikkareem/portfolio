
# Kanban Board UI

**Kanban Board UI** is a custom drag-and-drop board built with **Jetpack Compose**, using a horizontally paged layout where each page represents a Kanban group or status. The project demonstrates how Compose gesture detection, `HorizontalPager`, `LazyColumn`, custom drawing, bitmap capture, and state management can be combined to create an interactive drag-and-drop experience.

Users can long-press an item, drag it across the board, automatically navigate between Kanban pages, and drop the item into another group. During the drag operation, the selected item is captured as an `ImageBitmap` and rendered as an independent overlay, allowing it to visually move across pager boundaries.

---

# Features

## Horizontal Kanban Board

The board represents each Kanban group as an individual page inside a `HorizontalPager`.

```kotlin
HorizontalPager(
    state = pagerState
) { pageNo ->

    LazyColumn(
        state = state.lazyListStates[pageNo]
    ) {
        itemsIndexed(elements[pageNo]) { index, item ->
            ...
        }
    }
}
````

Each page contains:

* Kanban group title
* Number of elements
* Vertically scrolling item list
* Independent `LazyListState`
* Empty-state content

This allows every Kanban column to maintain its own scroll position while the user navigates horizontally between groups.

---

# Drag and Drop Interaction

The board uses Compose's `detectDragGesturesAfterLongPress` API to initiate drag-and-drop interactions.

```kotlin
.pointerInput(state.elements) {
    detectDragGesturesAfterLongPress(
        onDragStart = { state.onDragStart(it) },
        onDragCancel = { state.onDragInterrupted() },
        onDragEnd = { state.onDragInterrupted() },
        onDrag = { change, _ ->
            change.consume()
            state.onDrag(change.position)
        }
    )
}
```

The interaction follows the lifecycle:

1. Long press an item.
2. Identify the item under the pointer.
3. Capture the item's visual representation.
4. Start tracking its drag position.
5. Move the item independently of the original list.
6. Navigate between Kanban pages when crossing the threshold.
7. Release the gesture.
8. Notify the application about the source and destination groups.

---

# Identifying the Dragged Item

When the drag begins, the current `LazyListState` is inspected to determine which visible item contains the pointer position.

```kotlin
currentLazyListState.layoutInfo.visibleItemsInfo
    .firstOrNull {
        (it.y.toInt() - desiredTop) in
            item.offset..item.offsetEnd
    }
```

The board stores:

* Current item index
* Current page index
* Source page key
* Source item index
* Destination page key
* Drag displacement

```kotlin
currentItemIndex = it.index
currentPageIndex = pagerState.currentPage
startPageKey = groups[pagerState.currentPage]
startIndex = it.index
endPageKey = groups[pagerState.currentPage]
```

This separates the **visual drag state** from the actual application data.

---

# Capturing the Dragged Item

Instead of physically moving the item inside the `LazyColumn`, the selected item's visual representation is recorded into a `Picture`.

```kotlin
drawWithContent {

    val pictureCanvas =
        Canvas(
            state.picture.beginRecording(
                size.width.toInt(),
                size.height.toInt()
            )
        )

    draw(
        this,
        layoutDirection,
        pictureCanvas,
        size
    ) {
        this@drawWithContent.drawContent()
    }

    state.picture.endRecording()
}
```

The original item is therefore rendered into an off-screen drawing surface.

After a short delay, the recorded `Picture` is converted into an `ImageBitmap`.

```kotlin
scope.launch {
    delay(200)
    image = picture.createImageBitmap()
}
```

This produces a snapshot of the dragged composable that can be rendered independently of the `LazyColumn`.

---

# Bitmap Creation

The recorded `Picture` is converted into an Android `Bitmap` and then into Compose's `ImageBitmap`.

```kotlin
private fun Picture.createImageBitmap(): ImageBitmap {
    val bitmap = Bitmap.createBitmap(
        width,
        height,
        Bitmap.Config.ARGB_8888
    )

    val canvas = android.graphics.Canvas(bitmap)

    canvas.drawColor(
        android.graphics.Color.LTGRAY
    )

    canvas.drawPicture(this)

    return bitmap.asImageBitmap()
}
```

This provides a bridge between:

* Compose drawing APIs
* Android `Picture`
* Android `Canvas`
* Android `Bitmap`
* Compose `ImageBitmap`

---

# Independent Drag Overlay

Once the bitmap is created, the dragged item is rendered above the entire `HorizontalPager`.

```kotlin
state.image?.let {
    Box(
        modifier = Modifier.matchParentSize()
    ) {
        Image(
            bitmap = it,
            contentDescription = null,
            modifier = Modifier
                .layout { measurable, constraints ->

                    val placeable =
                        measurable.measure(constraints)

                    layout(
                        placeable.width,
                        placeable.height
                    ) {
                        placeable.place(
                            state.currentOffset.round()
                        )
                    }
                }
        )
    }
}
```

The overlay is positioned independently from the underlying list.

This is important because the dragged item needs to move outside the bounds of its original `LazyColumn` and across different `HorizontalPager` pages.

---

# Drag Position Calculation

The board maintains a displacement between the initial pointer position and the dragged item's position.

```kotlin
dragDisplacement =
    Offset(
        x = start.x,
        y = start.y - it.offset.toFloat()
    )
```

During the drag, the current position is recalculated using this displacement.

```kotlin
currentOffset =
    position.copy(
        y = position.y + desiredTop
    ) - dragDisplacement
```

This prevents the dragged item's position from jumping when the drag starts.

The item therefore maintains the same relative pointer position throughout the gesture.

---

# Cross-Page Dragging

The Kanban board allows an item to be dragged from one page to another.

The horizontal drag position is compared against a configurable threshold.

```kotlin
private const val
    THRESHOLD_PERCENTAGE_TO_MOVE_TO_DESIRED_PAGE = .65f
```

When the dragged item crosses approximately **65% of the board width**, the next or previous page becomes eligible for navigation.

```kotlin
currentOffset.x
    .takeIf {
        layoutCoordinates != null &&
        it >
            layoutCoordinates!!.size.width *
            THRESHOLD_PERCENTAGE_TO_MOVE_TO_DESIRED_PAGE
    }
    ?.let {
        moveNextPage()
    }
```

Similarly, dragging sufficiently far toward the previous page triggers backward navigation.

```kotlin
currentOffset.x
    .takeIf {
        layoutCoordinates != null &&
        it <
            (-1 *
                layoutCoordinates!!.size.width *
                THRESHOLD_PERCENTAGE_TO_MOVE_TO_DESIRED_PAGE)
    }
    ?.let {
        movePreviousPage()
    }
```

---

# Automatic Page Navigation

When the threshold is reached, the board animates the `HorizontalPager` to the adjacent page.

```kotlin
scope.launch {
    isAnimationGoing = true

    pagerState.animateScrollToPage(
        page = pagerState.currentPage + 1
    )

    recalculate()

    isAnimationGoing = false

    ...
}
```

Backward navigation follows the same mechanism.

```kotlin
pagerState.animateScrollToPage(
    page = pagerState.currentPage - 1
)
```

This creates a natural interaction where the user can continue dragging an item beyond the current Kanban column and move through the board.

---

# Delayed Automatic Page Movement

Page navigation is throttled using a movement cooldown.

```kotlin
private const val
    THRESHOLD_WAIT_TIME_TO_MOVE_TO_DESIRED_PAGE = 1500L
```

After a page transition occurs, another automatic transition is temporarily prevented.

```kotlin
moveTimeExhausted = false

...

delay(
    THRESHOLD_WAIT_TIME_TO_MOVE_TO_DESIRED_PAGE
)

moveTimeExhausted = true
```

This prevents continuous page switching while the dragged item remains beyond the navigation threshold.

The behavior effectively provides:

* Threshold-based page navigation
* Automatic page advancement
* 1.5-second navigation cooldown
* Forward and backward navigation
* Boundary checks using `canScrollForward` and `canScrollBackward`

---

# Tracking Source and Destination Groups

The board maintains the source and destination Kanban groups throughout the drag.

```kotlin
startPageKey =
    groups[pagerState.currentPage]

endPageKey =
    groups[pagerState.currentPage]
```

After page navigation, the destination group is recalculated.

```kotlin
private fun recalculate() {
    endPageKey =
        groups[pagerState.currentPage]
}
```

When the drag ends, the board only reports a move when the source and destination groups are different.

```kotlin
if (
    startPageKey != null &&
    endPageKey != null &&
    startPageKey != endPageKey
) {
    onDragDrop(
        startPageKey!!,
        endPageKey!!,
        startIndex
    )
}
```

The callback provides:

```text
FromPageKey
ToPageKey
FromPageIndex
```

The actual data mutation is therefore delegated to the caller.

---

# State Reset

After the drag operation completes or is cancelled, all transient drag state is cleared.

```kotlin
currentItemIndex = -1
currentPageIndex = -1
image = null
currentOffset = Offset.Zero
dragDisplacement = Offset.Zero

startPageKey = null
endPageKey = null
startIndex = -1
```

This keeps the drag state isolated from the persistent Kanban data.

---

# Independent LazyList State

Each Kanban page owns its own `LazyListState`.

```kotlin
val lazyListStates =
    (1..groups.size)
        .map {
            rememberLazyListState()
        }
```

The corresponding state is assigned to each page.

```kotlin
LazyColumn(
    state = state.lazyListStates[pageNo]
)
```

This allows each Kanban group to preserve its vertical scroll position independently while navigating horizontally between pages.

---

# Layout Coordinate Tracking

The board tracks the layout coordinates of the list area using `onGloballyPositioned`.

```kotlin
.onGloballyPositioned {
    state.layoutCoordinates = it
}
```

These coordinates are used to determine:

* Board width
* Top position of the draggable area
* Bottom position of the draggable area
* Horizontal page-navigation thresholds
* Pointer-to-item coordinate calculations

This allows the drag logic to operate using the actual rendered layout dimensions rather than hard-coded screen sizes.

---

# Reusable Kanban Board API

The board exposes a generic API so different item types can be used.

```kotlin
@Composable
fun <DragDropItemType> KanbanBoard(
    groups: Map<
        KanbanStatusType,
        List<DragDropItemType>
    >,
    verticalArrangement: Arrangement.Vertical =
        Arrangement.spacedBy(8.dp),
    contentPadding: PaddingValues =
        PaddingValues(horizontal = 0.dp),
    onDragDrop:
        (KanbanStatusType, KanbanStatusType, Int) -> Unit,
    emptyItem: @Composable () -> Unit = {},
    dragDropItem:
        @Composable (DragDropItemType) -> Unit
)
```

The caller controls:

* Kanban group data
* Item type
* Item UI
* Empty-state UI
* Vertical spacing
* Content padding
* Drag-and-drop result handling

This separates the **Kanban interaction engine** from the **actual item presentation**.

---

# Generic Item Rendering

The board does not make assumptions about the appearance of a Kanban item.

```kotlin
dragDropItem.invoke(item)
```

For example, the same board implementation can display:

* Tasks
* Tickets
* Orders
* Messages
* Issues
* Projects
* Workflow items

Only the item composable needs to change.

---

# Empty State Handling

Groups without elements display a dedicated empty-state composable.

```kotlin
if (elements[pageNo].isNotEmpty()) {

    itemsIndexed(elements[pageNo]) {
        index,
        item ->
        ...
    }

} else {

    item {
        Box(
            modifier =
                Modifier.fillParentMaxSize()
        ) {
            emptyItem()
        }
    }
}
```

This keeps the board visually consistent even when a Kanban group contains no items.

---

# Custom Drag State Architecture

The drag-and-drop behavior is encapsulated inside `KanbanBoardState`.

```kotlin
internal class KanbanBoardState<DragDropItemType>(
    private val groups:
        List<KanbanStatusType>,

    val elements:
        List<List<DragDropItemType>>,

    val lazyListStates:
        List<LazyListState>,

    val picture: Picture,

    val pagerState:
        PagerState,

    ...
)
```

The state object is responsible for:

* Drag gesture processing
* Item detection
* Drag position calculation
* Bitmap creation
* Page navigation
* Source/destination tracking
* Drag lifecycle management
* Drop event dispatching

This keeps the composable UI layer relatively declarative while the interaction state machine is centralized in one component.

---

# Drag and Drop Lifecycle

The complete interaction can be represented as:

```text
Long Press
    ↓
Identify Item
    ↓
Capture Item
    ↓
Create ImageBitmap
    ↓
Render Drag Overlay
    ↓
Track Pointer Movement
    ↓
Cross Navigation Threshold
    ↓
Animate Pager
    ↓
Update Destination Group
    ↓
Continue Dragging
    ↓
Release / Cancel
    ↓
Dispatch onDragDrop()
    ↓
Reset Drag State
```

This architecture allows the visual representation of the dragged item to remain independent from the underlying `LazyColumn` and `HorizontalPager`.

---

# Technical Highlights

The project demonstrates advanced interaction and rendering techniques in Jetpack Compose.

Highlights include:

* Custom Kanban board implementation.
* Horizontal paging with `HorizontalPager`.
* Independent vertical scrolling using multiple `LazyListState` instances.
* Long-press drag gesture detection.
* Cross-page drag-and-drop interaction.
* Threshold-based automatic page navigation.
* Forward and backward pager navigation.
* Navigation cooldown / throttling.
* Drag displacement calculation.
* Runtime layout coordinate tracking.
* Visible item hit testing.
* Off-screen composable rendering.
* Android `Picture` based visual capture.
* `Bitmap` to `ImageBitmap` conversion.
* Independent drag overlay rendering.
* Generic item rendering architecture.
* Source/destination group tracking.
* State-driven drag lifecycle.
* Delegated drop-event handling.
* Custom empty-state support.

---

# Skills Demonstrated

* Kotlin
* Jetpack Compose
* Compose Foundation
* `HorizontalPager`
* `LazyColumn`
* `LazyListState`
* Gesture Detection
* Drag and Drop
* `detectDragGesturesAfterLongPress`
* Compose State Management
* Coroutine-based Animation
* `PagerState`
* Layout Coordinates
* `onGloballyPositioned`
* Custom Drawing
* Compose Canvas
* Android `Picture`
* Android `Bitmap`
* `ImageBitmap`
* Off-screen Rendering
* UI Interaction Design
* Custom UI Components
* Animation and Gesture Coordination
* Reusable Compose Architecture