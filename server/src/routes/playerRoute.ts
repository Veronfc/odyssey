import { Elysia, t, status } from "elysia";

const player = new Elysia({ prefix: "/player" });

player.get("/guest", () => status(201, "Guest token"), {
  response: {
    201: t.String()
  }
});

export { player };
