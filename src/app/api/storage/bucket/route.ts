import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

import { adminStorage } from "@/lib/admin";

export async function POST(req: Request) {
  const { userEmail }: { userEmail: string } = await req.json();

  const bucket = await adminStorage.createBucket(ID.unique(), userEmail);
  return NextResponse.json({ bucket });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");
  console.log(userEmail);

  const { buckets } = await adminStorage.listBuckets();
  const userBucket = buckets.filter(bucket => bucket.name === userEmail);

  if (!!userBucket[0]) return NextResponse.json({ message: userBucket[0].$id });
  else return NextResponse.json({ error: "Bucket not found" });
}
