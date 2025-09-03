"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/books/${encodeURIComponent(query)}`);
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          name="q"
          placeholder="np. Christie, Hemingway..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="button" type="submit">
          Szukaj
        </button>
      </form>
    </>
  );
}
