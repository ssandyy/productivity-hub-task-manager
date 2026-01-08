# Productivity Hub Backend

Backend service for the Productivity Hub application, built with NestJS and Prisma.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm run start:dev
   ```
   The server runs on port `1234` (or as defined in `.env`).

## API Endpoints

### Tasks

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/task` | Create a new task | **Body** (JSON): `{ "text": "string", "done?": boolean }` |
| `GET` | `/task` | Retrieve all tasks | - |
| `GET` | `/task/:id` | Retrieve a specific task | **Param**: `id` (integer) |
| `PATCH` | `/task/:id` | Update a task | **Param**: `id` <br> **Body**: `{ "text?": "string", "done?": boolean }` |
| `DELETE` | `/task/:id` | Delete a task | **Param**: `id` (integer) |

### Example Requests

**Create a Task**
```bash
curl -X POST http://localhost:1234/task \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries"}'
```

**Update a Task**
```bash
curl -X PATCH http://localhost:1234/task/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'
```
