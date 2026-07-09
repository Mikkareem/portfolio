### Cloud Messenger System

An enterprise notification router and low-latency client state synchronization protocol.

#### Core Architecture
- **KMP Shared Logic**: Serialized packet payloads compiled to iOS/Android native bindings.
- **Spring Webflux Core**: Backpressure-supported reactive streams maintaining 50,000+ active WebSocket tunnels.
- **Resilient Retry Queue**: RabbitMQ cluster routing failed webhooks to exponential-backoff fallbacks.

```kotlin
// Example Event Synchronization Contract
@Serializable
data class SyncPayload(
    val eventId: String,
    val sequenceId: Long,
    val payload: JsonElement
)
```
