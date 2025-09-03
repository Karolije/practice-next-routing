import React from "react";

type Props = {
  params: { query: string };
};

type Book = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
};

export default async function BookPage({ params }: Props) {
  const { query } = params;

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error("Nie udało się pobrać danych");
  }

  const data = await res.json();

  const books: Book[] = data.docs.slice(0, 10); 

  return (
    <div style={{ padding: "20px" }}>
      <h1>Wyniki wyszukiwania: "{query}"</h1>
      {books.length === 0 ? (
        <p>Brak wyników.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              <strong>{book.title}</strong>
              {book.author_name && (
                <span> – {book.author_name.join(", ")}</span>
              )}
              {book.first_publish_year && (
                <span> ({book.first_publish_year})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
