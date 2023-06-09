import { Client, Databases, Storage } from "appwrite";

import { env } from "@/env.mjs";

export const client = new Client()
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setEndpoint(env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT);

export const db = new Databases(client);

export const storage = new Storage(client);
