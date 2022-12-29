// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { eventsRouter } from "./events";
import { protectedUserRouter, userRouter } from "./user";
import { protectedDivisionsRouter } from "./divisions";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("events.", eventsRouter)
  .merge("protectedDivisions", protectedDivisionsRouter)
  .merge("user.", userRouter)
  .merge("protectedUser.", protectedUserRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
