# Assignment 1: Transaction API

A RESTful API for managing income and expenses with Soft Delete, Validation, Pagination, and Unit Tests.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript (Strict Mode)
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose
- **Validation:** express-validator
- **Testing:** Jest + Supertest

## Features

-  CRUD Operations (Create, Read, Update, Delete)
-  Soft Delete (recoverable deleted records)
-  Input Validation (validate data before saving)
-  Error Handling (centralized error management)
-  Pagination (paginated results)
-  Filtering (filter by type and date range)
-  Unit Tests (10 test cases)

## Project Structure
```
assignment-1/
├── src/
│   ├── config/
│   │   └── database.ts         # MongoDB connection
│   ├── controllers/
│   │   ├── transactionController.ts
│   │   └── transactionController.test.ts
│   ├── middlewares/
│   │   └── errorHandler.ts     # Error handling middleware
│   ├── models/
│   │   └── Transaction.ts      # Mongoose schema
│   ├── routes/
│   │   └── transactionRoutes.ts
│   ├── validators/
│   │   └── transactionValidator.ts
│   ├── app.ts                  # Express app
│   └── index.ts                # Server entry point
├── .env                        # Environment variables
├── .gitignore
├── jest.config.js
├── package.json
└── tsconfig.json
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd assignment-1
npm install
```

### 2. Configure Environment Variables

Create a `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/parnuan?retryWrites=true&w=majority
```

### 3. Run the Server
```bash
# Development (auto-restart)
npm run dev

# Production
npm run build
npm start
```

The server will run at `http://localhost:3000`

### 4. Run Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions` | Create a new transaction |
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/:id` | Get a transaction by ID |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction (soft delete) |
| PATCH | `/api/transactions/:id/restore` | Restore a deleted transaction |

## API Usage Examples

### Create Transaction
```http
POST /api/transactions
Content-Type: application/json

{
  "type": "expense",
  "amount": 45,
  "description": "Coffee at Cafe Amazon",
  "date": "2024-01-15T08:30:00Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "_id": "...",
    "type": "expense",
    "amount": 45,
    "description": "Coffee at Cafe Amazon",
    "date": "2024-01-15T08:30:00.000Z",
    "deletedAt": null,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Get All Transactions (with Pagination & Filtering)
```http
GET /api/transactions?page=1&limit=10&type=expense&startDate=2024-01-01&endDate=2024-01-31
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| type | string | Filter by type (income/expense) |
| startDate | string | Filter from date (ISO 8601) |
| endDate | string | Filter to date (ISO 8601) |

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "page": 1,
  "totalPages": 3,
  "data": [...]
}
```

### Update Transaction
```http
PUT /api/transactions/:id
Content-Type: application/json

{
  "amount": 50,
  "description": "Coffee (updated price)"
}
```

### Delete Transaction (Soft Delete)
```http
DELETE /api/transactions/:id
```

### Restore Transaction
```http
PATCH /api/transactions/:id/restore
```

### Validation Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "type",
      "message": "Type must be 'income' or 'expense'"
    },
    {
      "field": "amount",
      "message": "Amount must be positive"
    }
  ]
}
```

## Design Decisions

### 1. Soft Delete
Chose Soft Delete over Hard Delete because:
- Users can recover accidentally deleted data
- Maintains audit trail for historical records
- Uses `deletedAt` field (null = active, has value = deleted)

### 2. Project Structure (Layered Architecture)
Separated code into layers for:
- **Separation of Concerns** - Each layer has a single responsibility
- **Testability** - Easy to test each layer independently
- **Maintainability** - Easy to modify without affecting other parts

### 3. Input Validation
Used express-validator because:
- Validates at route level before reaching controller
- Provides clear error messages
- Supports custom validation rules

### 4. Error Handling
- Centralized error handling through middleware
- Consistent error response format
- Separates validation errors from server errors

### 5. Pagination
- Uses skip/limit pattern for efficient querying
- Returns metadata (total, totalPages) for frontend pagination UI

## What I'd Improve (Given More Time)

1. **API Documentation** - Add Swagger/OpenAPI documentation
2. **Rate Limiting** - Prevent API abuse
3. **Logging** - Add Winston/Pino for structured logging
4. **Caching** - Add Redis for caching frequently accessed data
5. **Authentication** - Add JWT-based authentication
6. **Docker** - Add Dockerfile and docker-compose
7. **CI/CD** - Add GitHub Actions for automated testing