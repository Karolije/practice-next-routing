import { notFound } from "next/navigation";

const translations = {
  pl: {
    greeting: "Witaj w naszej aplikacji!",
    description: "To jest strona w języku polskim.",
  },
  en: {
    greeting: "Welcome to our application!",
    description: "This is the page in English.",
  },
};

type Props = {
  params: { lang: string };
};

export default function LangPage({ params }: Props) {
  const { lang } = params;

  if (!["pl", "en"].includes(lang)) {
    return notFound();
  }

  const t = translations[lang as "pl" | "en"];

  return (
    <div style={{ padding: 24 }}>
      <h1>{t.greeting}</h1>
      <p>{t.description}</p>

      <hr style={{ margin: "24px 0" }} />

      <p>
        Przełącz język:
        <a href="/lang/pl">PL</a> | <a href="/lang/en">EN</a>
      </p>
    </div>
  );
}
