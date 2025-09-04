"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd pobierania użytkowników");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Ładowanie użytkowników...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Lista użytkowników</h1>
      <Link href="/users/new" style={{ display: "inline-block", marginBottom: "1rem" }}>
        Dodaj nowego użytkownika
      </Link>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link href={`/users/${u.id}`}>
              {u.name} ({u.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
