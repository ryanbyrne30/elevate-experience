import { z } from "zod";

export default function FormError({ error }: { error?: string | z.ZodError }) {
  if (error instanceof z.ZodError) {
    return (
      <ul className="text-error">
        {error.errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="text-error">
      <span>{error}</span>
    </div>
  );
}
