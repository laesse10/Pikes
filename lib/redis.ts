import "server-only";
import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/** The Upstash Redis client, or null where no store is connected (e.g. a fresh clone). */
export function redis(): Redis | null {
  if (client === undefined) {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    client = url && token ? Redis.fromEnv() : null;
  }
  return client;
}
