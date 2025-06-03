# 🃏 Odyssey

**Odyssey** is a real-time multiplayer card game built with a modern monorepo architecture. It emphasizes responsive gameplay, type-safe communication, and cleanly separated concerns between server and client.

## 🎯 Description

Odyssey is a turn-based card game where 2–4 players compete in real-time. It features a guest-first authentication flow, in-memory matchmaking and game state, and WebSocket-based communication for fast, responsive gameplay.

## 🚀 Planned Features

- Real-time multiplayer gameplay (WebSockets over Hono)
- Matchmaking with in-memory queues and lobby limits
- Game sessions with composable-style server-side state
- Guest-first JWT-based authentication
- End-to-end type safety via shared types
- Optional future: persistent user accounts, match history, and leaderboards

## 🛠️ Tech Stack

### Backend
- [Bun](https://bun.sh/) — JavaScript runtime
- [Hono](https://hono.dev/) — Lightweight web framework
- [Zod](https://zod.dev/) — Schema validation for endpoints and server logic
- Composable-style server state managers (`usePlayers`, `useLobbies`, `useMatches`)
- JWT authentication
- WebSocket server with custom event system

### Frontend (Later Phase)
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/) — Client-side state synced with server
- [Zod](https://zod.dev/) — Shared validation schemas
- [vee-validate](https://vee-validate.logaretm.com/) — Form validation for Vue

### Post-MVP / Experimental
- [PostgreSQL](https://www.postgresql.org/) — Account persistence, match history
- Account migration (guest → user)
- Spectator mode & replays
- In-game chat / reactions

## 🧱 Project Milestones

### ✅ Milestone 1: Monorepo & Base Server Setup
- [x] Monorepo initialized with Bun
- [x] Shared `@shared/types` package
- [x] Hono server scaffold with error handling

### 🔐 Milestone 2: Guest-First Auth
- [x] Guest JWT issuance via `/player/guest`
- [x] Middleware for token validation and user injection

### 🧠 Milestone 3: Core Server Logic
- [x] `usePlayers()` composable to track active players
- [x] `useLobbies()` to manage lobby creation, joining, and timeouts
- [ ] `useMatches()` for in-memory match lifecycle

### 🌐 Milestone 4: WebSocket Infrastructure
- [ ] WebSocket server with token-authenticated connections
- [ ] Typed event system for lobby and match updates
- [ ] Real-time sync with reconnection handling

### 🧪 Milestone 5: Integration Tests
- [ ] REST & socket endpoint tests for edge cases and state flow

### 🎨 Milestone 6: Client Development
- [ ] Vite + Vue 3 + Tailwind scaffold
- [ ] `useSocket()` composable with reconnect and event sync
- [ ] Lobby UI and basic match board UI

### 🎯 Milestone 7: Polish & Production Readiness
- [ ] UX polish: transitions, error states, disconnects
- [ ] Memory usage caps, idle cleanup, stability checks

### 🧪 Milestone 8: Experimental Features (Post-MVP)
- [ ] Account system with guest-to-user migration
- [ ] Match history and leaderboard persistence
- [ ] Spectator/replay mode
- [ ] In-game chat & emoji reactions