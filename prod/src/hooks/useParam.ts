import { useRouter } from "next/router";

export const useParam = (name: string) => {
  const received = useRouter().query[name];
  const first = received?.[0];
  if (Array.isArray(received)) return first;
  return received;
};
