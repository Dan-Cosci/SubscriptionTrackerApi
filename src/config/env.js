import { config } from 'dotenv';

config({path:`./src/.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
  PORT, SERVER_URL, 
  NODE_ENV, 
  DB_URI, JWT_SECRET, 
  JWT_EXPIRES_IN, ARCJET_KEY,
  ARCJET_ENV, 
  QSTASH_TOKEN, QSTASH_URL
} = process.env;