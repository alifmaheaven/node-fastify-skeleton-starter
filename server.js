import { config } from 'dotenv'
config()
import build from './app.js';

// variable

const app = await build({ logger: false });

try {
  await app.listen({ port: process.env.PORT || 5000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}