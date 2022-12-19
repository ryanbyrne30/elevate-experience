import { Event } from "@prisma/client";

export type EventDetails = Event & {
  teams: {
    teamPlayers: {
      userId: string;
    }[];
  }[];
};
