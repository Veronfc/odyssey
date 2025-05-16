
# 🃏 Odyssey

**Odyssey** is a real-time multiplayer card game. Built with a modern monorepo architecture, it emphasizes responsive gameplay, type-safe communication, and scalable game logic.

## 🎯 Description

Odyssey is a turn-based card game where multiple players can compete in real time. It features a matchmaking queue, WebSocket-based interaction, persistent player progress, and leaderboard tracking. The game runs on a lightweight Bun + Elysia backend with Vue 3 handling the client interface.

## 🚀 Planned Features

- Real-time multiplayer gameplay (WebSockets)
- Matchmaking system using Redis queues
- Game rooms with in-memory state
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
- [PostgreSQL](https://www.postgresql.org/) (User data & persistence)

## Project Checklist

- [x] **Milestone 1: Project Initialization**
  - [x] Monorepo Setup
  - [x] Development Environment

- [ ] **Milestone 2: Guest Access & Token Auth**
  - [ ] Guest Token System
  - [ ] Client Guest Flow

- [ ] **Milestone 3: Lobby System**
  - [ ] Lobby Creation
  - [ ] Lobby Interaction
  - [ ] Lobby Sync

- [ ] **Milestone 4: Match System**
  - [ ] Match Lifecycle
  - [ ] Real-time Game Updates

- [ ] **Milestone 5: Basic UI Implementation**
  - [ ] Navigation & Layout
  - [ ] Game UI

- [ ] **Milestone 6: Persistance Layer**
  - [ ] Account & Persistance Setup

- [ ] **Milestone 7: Final Touches**
  - [ ] UI Polishing
  - [ ] Reconnection Logic
