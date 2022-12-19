// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { eventsRouter, protectedEventsRouter } from "./events";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("events.", eventsRouter)
  .merge("protectedEvents.", protectedEventsRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
