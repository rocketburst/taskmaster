import { env } from "@/env.mjs";
import { Client, Databases } from "appwrite";

const client = new Client()
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setEndpoint(env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT);

export const db = new Databases(client);
