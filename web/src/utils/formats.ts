import { format } from "date-fns";

export const displayDateTime = (date: Date) => {
  return format(date, "MMM d, yyyy @ h:mmaaa");
};

export const displayDate = (date: Date) => {
  return date.toLocaleDateString();
};
