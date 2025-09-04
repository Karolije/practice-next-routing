import { NextResponse } from "next/server";

let users: { id: number; name: string; email: string }[] = [
  { id: 1, name: "Anna Kowalska", email: "anna@example.com" },
  { id: 2, name: "Jan Nowak", email: "jan@example.com" },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.name || !data.email) {
    return NextResponse.json(
      { error: "Brak wymaganych pól" },
      { status: 400 }
    );
  }

  const newUser = {
    id: users.length + 1,
    name: data.name,
    email: data.email,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
