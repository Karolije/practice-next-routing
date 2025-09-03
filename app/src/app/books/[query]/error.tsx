"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>Coś poszło nie tak: {error?.message ?? "nieznany błąd"}</p>
      <button className="button" onClick={() => reset()}>
        Spróbuj ponownie
      </button>
    </div>
  );
}
