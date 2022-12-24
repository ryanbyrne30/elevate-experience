import { Event, Team, TeamPlayer } from "@prisma/client";

export type ProfilePublic = {
  id: string;
  name: string;
  username: string;
  teamPlayers: (TeamPlayer & {
    team: Team & { event: Event };
  })[];
};
