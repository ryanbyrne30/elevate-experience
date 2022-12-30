import { Division, Event, Team, TeamUser, User } from "@prisma/client";

export type TeamUserDetails = TeamUser & {
  user: User;
};

export type TeamDetails = Team & {
  teamUsers: TeamUserDetails[];
};

export type DivisionDetails = Division & {
  teams: TeamDetails[];
};

export type EventDetails = Event & {
  divisions: DivisionDetails[];
};
