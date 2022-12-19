import { Event, Team, TeamPlayer, User } from "@prisma/client";

export type TeamPlayerDetails = TeamPlayer & {
  user: User;
};

export type TeamDetails = Team & {
  teamPlayers: TeamPlayerDetails[];
};

export type EventDetails = Event & {
  teams: TeamDetails[];
};
