import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
export function createRateLimits(redis, makeStore = prefix => new RedisStore({ prefix, sendCommand: (...args) => redis.call(...args) })) {
 const common = { standardHeaders: 'draft-8', legacyHeaders: false, passOnStoreError: false };
 return {
  api: rateLimit({ ...common, windowMs: 60_000, limit: 600, store: makeStore('bishops:rl:api:'), message: { message: 'Too many requests. Please wait one minute and try again.' } }),
  auth: rateLimit({ ...common, windowMs: 15 * 60_000, limit: 10, store: makeStore('bishops:rl:auth:'), message: { message: 'Too many sign-in attempts. Please wait fifteen minutes and try again.' } }),
 };
}

