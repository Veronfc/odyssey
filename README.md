
# 🃏 Odyssey

**Odyssey** is a real-time multiplayer card game. Built with a modern monorepo architecture, it emphasizes responsive gameplay, type-safe communication, and scalable game logic.

## 🎯 Description

Odyssey is a turn-based card game where multiple players can compete in real time. It features a matchmaking queue, WebSocket-based interaction, persistent player progress, and leaderboard tracking. The game runs on a lightweight Bun + Elysia backend with Vue 3 handling the client interface.

## 🚀 Planned Features

- Real-time multiplayer gameplay (WebSockets)
- Matchmaking system using Redis queues
- Game rooms with in-memory state using Redis
- End-to-end type safety via Eden Treaty
- Leaderboards and match history via PostgreSQL
- Authentication & persistent user data
- Visual game board with dynamic card rendering
- Scalable deployment (Bun backend, Vite frontend)

## 🛠️ Tech Stack
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Eden Treaty](https://elysiajs.com/plugins/eden) (for typed API access)
- [Bun](https://bun.sh/) (JavaScript runtime)
- [Elysia.js](https://elysiajs.com/) (Fast, typed web framework)
- [Redis](https://redis.io/) (Pub/Sub & in-memory game state)
- [PostgreSQL](https://www.postgresql.org/) (User data & persistence)

## ✅ Project Workflow

- [ ] **Milestone 1: Project Setup**
  - [ ] Initialize Bun project and install dependencies
  - [ ] Set up Elysia routes and folder structure
  - [ ] Set up Vue project with Tailwind and Pinia
  - [ ] Create base folder structure

- [ ] **Milestone 2: Core API & Type Safety**
  - [ ] Define `/rooms`, `/players`, `/matchmaking` routes
  - [ ] Integrate Redis and WebSocket plugin
  - [ ] Export backend route types
  - [ ] Initialize typed client in frontend

- [ ] **Milestone 3: Game State Management**
  - [ ] Store session in `game:room:<id>`
  - [ ] Set TTL for inactive games
  - [ ] Create stores for game, player, and UI state
  - [ ] Sync via WebSocket updates

- [ ] **Milestone 4: Real-Time Communication**
  - [ ] Events: `playerJoin`, `move`, `gameOver`
  - [ ] Redis Pub/Sub for room-wide broadcast
  - [ ] Composable for managing socket events
  - [ ] Push events to Pinia

- [ ] **Milestone 5: Game Logic**
  - [ ] Implement draw, turn-switch, win/lose logic
  - [ ] Validate and sync moves
  - [ ] Animate card draws, turns, player actions

- [ ] **Milestone 6: Persistence Layer**
  - [ ] Tables for users, games, leaderboards
  - [ ] Save match history post-game

- [ ] **Milestone 7: Matchmaking**
  - [ ] Use LPUSH/RPOP to match players
  - [ ] Auto-assign rooms
  - [ ] Show lobby and queue indicators

- [ ] **Milestone 8: Deployment**
  - [ ] Deploy Bun app (e.g., Fly.io, Railway)
  - [ ] Connect Redis and PG providers
  - [ ] Deploy via Vercel/Netlify
  - [ ] GitHub Actions for CI/CD
