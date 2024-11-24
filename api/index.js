import dotenv from 'dotenv'
dotenv.config()

import { InstantiatePrismaClient } from 'steelservice-domain'

(async () => {
  const PC = InstantiatePrismaClient();
  console.log('@@@@@@@@@@@, ', await PC.country.findMany())
})()


