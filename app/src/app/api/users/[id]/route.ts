import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    const user = users.find((u: any) => u.id === Number(params.id));

    if (!user) {
      return NextResponse.json({ error: "Nie znaleziono użytkownika" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
