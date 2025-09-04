"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return; 

    fetch(`/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Nie znaleziono użytkownika");
        return res.json();
      })
      .then(setUser)
      .catch((err) => setError(err.message));
  }, [id]);

  if (!id) return <p>Ładowanie parametru ID...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Ładowanie użytkownika...</p>;

  return (
    <div>
      <h1>Szczegóły użytkownika</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Imię i nazwisko:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => router.push("/users")}>Powrót do listy</button>
    </div>
  );
}
