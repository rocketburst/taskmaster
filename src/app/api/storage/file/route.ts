import { NextResponse } from "next/server";
import { ID, InputFile } from "node-appwrite";

import { adminStorage } from "@/lib/admin";

export async function POST(req: Request) {
  const { bucketId, fileContents }: { bucketId: string; fileContents: string } =
    await req.json();

  const file = await adminStorage.createFile(
    bucketId,
    ID.unique(),
    InputFile.fromPlainText(fileContents, "tasks")
  );

  return NextResponse.json({ file });
}
