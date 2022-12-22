import z from "zod";

export type FormError =
  | z.ZodError
  | { message: string }
  | { path: (string | number)[]; message: string }[]
  | string
  | null;

export default function DisplayFormError({
  error,
  itemClassName,
}: {
  error: FormError;
  itemClassName?: string;
}) {
  const className = "text-error italic";
  if (!error) return <span></span>;

  if (typeof error === "string")
    return <span className={className}>{error}</span>;

  if ("message" in error) {
    try {
      const errors: { path: string[]; message: string }[] = JSON.parse(
        error.message
      );
      return (
        <ul className={className}>
          {errors.map((e, idx) => (
            <li key={idx} className={itemClassName}>
              {e.path.join(", ")} - {e.message}
            </li>
          ))}
        </ul>
      );
    } catch {
      return <span className={className}>{error.message}</span>;
    }
  }

  if (error instanceof z.ZodError || Array.isArray(error))
    return (
      <ul className={className}>
        {error.map((e, idx) => (
          <li key={idx} className={itemClassName}>
            {e.path.join(", ")} - {e.message}
          </li>
        ))}
      </ul>
    );

  return <span className={className}>{error}</span>;
}
