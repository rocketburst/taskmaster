import {
  Client as AdminClient,
  Databases as AdminDatabases,
  Storage as AdminStorage,
} from "node-appwrite";

import { env } from "@/env.mjs";

export const adminClient = new AdminClient()
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setEndpoint(env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT)
  .setKey(env.MASTER_KEY);

export const adminDb = new AdminDatabases(adminClient);

export const adminStorage = new AdminStorage(adminClient);
