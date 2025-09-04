import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");
  const users = JSON.parse(data);
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.email) return NextResponse.json({ error: "Brak danych" }, { status: 400 });

  const data = await fs.readFile(filePath, "utf-8");
  const users = JSON.parse(data);

  const newUser = { id: users.length + 1, name: body.name, email: body.email };
  users.push(newUser);

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json(newUser, { status: 201 });
}
