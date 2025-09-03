import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { url, ip } = await req.json();
    const now = new Date().toISOString();
    const line = `${now} | ${url} | ${ip}\n`;

    const filePath = path.join(process.cwd(), "log.txt");
    await fs.appendFile(filePath, line);

    return NextResponse.json({ message: "Zalogowano" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
