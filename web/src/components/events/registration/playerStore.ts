import create from "zustand";
import { immer } from "zustand/middleware/immer";

export type RegisteredUser = { id: string; name: string; username: string };
export type RegisteredGuest = { name: string };
type PlayersStore = {
  guests: RegisteredGuest[];
  users: RegisteredUser[];
  maxPlayers: number;
  error: string | null;
  setMaxPlayers: (max: number) => void;
  addUser: (user: RegisteredUser) => void;
  addGuest: (guest: RegisteredGuest) => void;
  removeUser: (id: string) => void;
  removeGuest: (name: string) => void;
};

export const usePlayersStore = create(
  immer<PlayersStore>((set) => ({
    maxPlayers: 1,
    guests: [],
    users: [],
    error: null,
    setMaxPlayers: (max) =>
      set((state) => {
        state.maxPlayers = max;
      }),
    addGuest: (guest) =>
      set((state) => {
        if (state.users.length + state.guests.length >= state.maxPlayers) {
          state.error = "Team is full.";
        } else if (
          state.guests.findIndex((g) => g.name === guest.name) !== -1
        ) {
          state.error = "Guest already added.";
        } else {
          state.guests.push(guest);
        }
      }),
    addUser: (user) =>
      set((state) => {
        if (state.users.length + state.guests.length >= state.maxPlayers) {
          state.error = "Team is full.";
        } else if (state.users.findIndex((u) => u.id === user.id) !== -1) {
          state.error = "User already added.";
        } else {
          state.users.push(user);
        }
      }),
    removeGuest: (name) =>
      set((state) => {
        const index = state.guests.findIndex((g) => g.name === name);
        if (index !== -1) state.guests.splice(index, 1);
      }),
    removeUser: (id) =>
      set((state) => {
        const index = state.users.findIndex((g) => g.id === id);
        if (index !== -1) state.users.splice(index, 1);
      }),
  }))
);
