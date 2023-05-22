import { Client, Databases } from "appwrite";

import { env } from "@/env.mjs";

const client = new Client()
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setEndpoint(env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT);

export const db = new Databases(client);
