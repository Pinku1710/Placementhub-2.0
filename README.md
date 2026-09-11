# PlacementHub 2.0 — Full-Stack Learning Reference

This is a **learning reference implementation** for upgrading a basic PlacementHub/StudentJobTracker into a serious full-stack Software Engineering project.

It is intentionally structured so you can study one layer at a time instead of copying everything blindly.

## What this version demonstrates

- React frontend
- Node.js + Express REST API
- Prisma ORM
- SQLite for zero-config local learning
- JWT authentication
- Role-based authorization
- Applications CRUD
- Search, filtering and pagination
- Interview tracking
- Dashboard analytics
- Centralized error handling
- Request validation
- Password hashing
- Database transactions
- Clean separation of routes/controllers/services
- Environment variables
- Docker-ready backend
- Git-friendly project structure

> For a resume, only claim technologies/features you can explain and demonstrate yourself.
> After learning this SQLite version, upgrade the database to PostgreSQL and add deployment.

## Folder structure

```text
PlacementHub-2.0-Learning/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
└── README.md
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Backend runs on `http://localhost:5000`.

## 2. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend normally runs on `http://localhost:5173`.

## Demo account

The backend contains a development seed script.

```bash
cd backend
npm run seed
```

Demo login:

- Email: `student@example.com`
- Password: `Password123!`

## Important learning order

Do NOT try to understand the whole repository in one day.

### Stage 1
HTML/CSS/JS fundamentals → React components → props → state → hooks

### Stage 2
REST API → HTTP methods → Express routes → controllers → middleware

### Stage 3
Database → Prisma → relations → CRUD → indexes

### Stage 4
Authentication → bcrypt → JWT → protected routes → role-based access

### Stage 5
Search → filtering → sorting → pagination → dashboard aggregation

### Stage 6
Transactions → validation → error handling → security

### Stage 7
PostgreSQL → Docker → deployment → testing → CI/CD

## Mayank-style depth to add after understanding this code

1. PostgreSQL instead of SQLite
2. Prisma indexes and query optimization
3. Redis caching
4. Rate limiting
5. Background email notifications
6. Resume upload/storage
7. Resume-JD matching
8. Interview calendar
9. Admin analytics
10. Automated tests
11. Docker Compose
12. CI/CD
13. Production deployment

That is the point where PlacementHub becomes a strong flagship project rather than a basic CRUD tracker.
