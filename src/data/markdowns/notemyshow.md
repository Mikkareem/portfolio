### PayFlow Billing Ledger

Asynchronous payment execution pipeline and microservice gateway designed for transactional integrity.

#### Design Parameters
- **Optimistic Locks**: Database transactions protected against race conditions using version checkpoints.
- **Microservice Gateway**: Dynamic routing with Spring Cloud Gateway and consul service discovery.
- **Isolated Testing Sandbox**: TestContainers executing native Docker Compose services during integration test runs.
