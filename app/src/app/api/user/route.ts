import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  return NextResponse.json({ message: "Działa API /api/user" });
}

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { firstName, lastName, email } = body;
  
      if (!firstName || !lastName || !email) {
        return NextResponse.json(
          { error: "Wszystkie pola są wymagane" },
          { status: 400 }
        );
      }
  
      const filePath = path.join(process.cwd(), "src", "data", "users.json");
  
      const data = await fs.readFile(filePath, "utf-8");
      const users = JSON.parse(data);
  
      const newId =
        users.length > 0
          ? Math.max(...users.map((u: any) => u.id)) + 1
          : 1;
  
      const newUser = { id: newId, firstName, lastName, email };
  
      users.push(newUser);
  
      await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  
      return NextResponse.json(newUser, { status: 201 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }