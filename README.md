
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

## Project Checklist

- [x] **Milestone 1: Initial Setup & Project Structure**
  - [x] Create Root Directory and Bun monorepo workspaces
  - [x] Initialize client
  - [x] Initialize server

- [ ] **Milestone 2: Core API Setup & Type Safety**
  - [ ] Implement Backend API (Game Logic Routes)
  - [ ] Integrate Redis for Real-Time Game State
  - [ ] Set Up Eden Treaty for Type Safety
  - [ ] Expose Typed API from Backend

- [ ] **Milestone 3: Game Logic and State Management**
  - [ ] Define Game Mechanics (Turn-based, Draw, Discard)
  - [ ] Handle Winner Detection and Cleanup
  - [ ] Create Global Pinia Stores for State
  - [ ] Synchronize State Between Redis and Pinia

- [ ] **Milestone 4: Real-Time Communication**
  - [ ] Set Up WebSocket Communication in Backend
  - [ ] Set Up WebSocket Communication in Frontend

- [ ] **Milestone 5: Persistence and Database Setup**
  - [ ] Define Database Models (Users, Games, Leaderboards)
  - [ ] Persist Match Results & Player Stats

- [ ] **Milestone 6: Matchmaking and Game Flow**
  - [ ] Use Redis Queue for Player Matching
  - [ ] Create Matchmaking UI with Join Queue
  - [ ] Implement Auto-Navigation to Game Room
  - [ ] Handle Player Actions in UI (Draw, Play)

- [ ] **Milestone 7: Deployment**
  - [ ] Deploy Backend on Fly.io or Railway
  - [ ] Deploy Frontend on Vercel or Netlify
  - [ ] Implement CI/CD for Monorepo
