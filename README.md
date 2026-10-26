<div align="center">

# AI Meeting Assistant

**Stop wasting time on meeting follow-ups.**

Meetings are where decisions are made — but keeping track of everything said, who is responsible for what, and what needs to happen next is time-consuming and error-prone. AI Meeting Assistant solves that.

Paste or upload your meeting transcript and the application automatically reads through the entire conversation, produces a structured summary of what was discussed and decided, pulls out every action item with the person responsible and the deadline they committed to, and scores the overall tone of the meeting. Need to send a follow-up email to the team? Generate a professional draft in one click. Have a question about something that was said? Ask it in plain English and get a direct answer pulled from the transcript.

Built for teams, project managers, and individuals who run frequent meetings and need an accurate, searchable record of every conversation without spending an hour writing it up themselves.

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## Features

- **User Authentication** — Register, login, and Google OAuth with JWT-secured sessions
- **Meeting Management** — Create, read, update, and delete meetings with full transcript support
- **AI Analysis** — Paste a transcript and get back a summary, key discussion points, action items with owners and deadlines, sentiment score, and detected participant names
- **Follow-Up Email Generator** — One-click professional follow-up email drafts based on what was discussed
- **Meeting Q&A** — Ask any question in plain English and get a direct answer from the transcript
- **Dashboard Stats** — Overview of total meetings, completion status, and sentiment breakdown
- **Docker Ready** — Production and development Docker Compose configurations included

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works) **or** [Docker](https://www.docker.com/) for a local MongoDB instance
- [Google Gemini API key](https://aistudio.google.com/app/apikey) — free to get

---

### Environment Variables

The backend reads from a `.env` file that each developer creates locally — it is never committed to git.

```bash
cd backend
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ai-meeting-assistant

JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=your_gemini_api_key_here

CLIENT_URL=http://localhost:5173
```

> **Note for collaborators:** Everyone uses their own `GEMINI_API_KEY`. Copy `.env.example` to `.env`, fill in your personal key, and never commit the `.env` file.

---

### Running Locally

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:5000` — health check at `http://localhost:5000/api/health`

**Frontend:**
```bash
cd frontend
yarn install
yarn dev
```
Runs at `http://localhost:5173`

---

### Running with Docker

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is running first.

**Development** (hot-reload — no rebuild needed when you edit files):
```bash
cd backend
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

**Production:**
```bash
cd backend
docker compose up --build
```

**Stop:**
```bash
docker compose down
```

> When running in Docker, the backend connects to MongoDB through the container network. The compose file handles this automatically — your `.env` does not need to change.

---

## API Reference

Base URL: `http://localhost:5000/api`

Protected routes require: `Authorization: Bearer <token>`

### Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login and receive a JWT |
| POST | `/auth/google` | Public | Google OAuth login or signup |
| GET | `/auth/me` | Protected | Get current user profile |
| PUT | `/auth/me` | Protected | Update name, email, or password |

### Meetings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/meetings` | Get all meetings — supports `?page`, `?limit`, `?status`, `?search` |
| POST | `/meetings` | Create a meeting — auto-analyzes if transcript is included |
| GET | `/meetings/stats` | Dashboard statistics |
| GET | `/meetings/:id` | Get a single meeting with full transcript |
| PUT | `/meetings/:id` | Update a meeting |
| DELETE | `/meetings/:id` | Delete a meeting |
| POST | `/meetings/:id/analyze` | Run or re-run AI analysis on the transcript |
| POST | `/meetings/:id/email` | Generate a follow-up email draft |
| POST | `/meetings/:id/ask` | Ask a question about the meeting |

---

## License

ISC
