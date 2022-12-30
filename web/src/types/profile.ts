import { Division, Event, Team, TeamUser } from "@prisma/client";

export type ProfilePublic = {
  id: string;
  name: string;
  username: string;
  teamUsers: (TeamUser & {
    team: Team & { division: Division & { event: Event } };
  })[];
};
