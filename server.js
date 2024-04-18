import { config } from 'dotenv'
config()
import build from './app.js';

// variable

const app = await build({ 
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
 });

try {
  await app.listen({ port: process.env.PORT || 5000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}