# Description


## Development
|steps| syntax|
|-----|-----|
| 1 - Clone repo | ```git clone -- https://github.com/mejialaguna/shopWithMe.git``` |
| 2 - rename .envTemplate to .env and  change the env variables to your own | ```npm install``` |
| 3 - install dependencies | ```npm install``` |
| 4 - prisma migration | ```npx prisma migrate dev``` |
| 5 - prisma migration | ```npx prisma db seed`` |
| 6 - start dev server | ```npm run dev``` |
| 6 - check if the seeding was successfull | ```npx prisma studio``` |

## Note i added a new field to the pet table and i end up using "npx prisma db push" (this is not recommended)