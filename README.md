# Description


## Development
|steps| syntax|
|-----|-----|
| 1 - Clone repo | ```git clone -- https://github.com/mejialaguna/shopWithMe.git``` |
| 2 - rename .envTemplate to .env and  change the env variables to your own | ```npm install``` |
| 3 - install dependencies | ```npm install``` |
| 4 - start DB with docker | ```docker-compose up -d``` |
| 5 - prisma migration | ```npx prisma migrate dev``` |
| 6 - prisma migration | ```npx prisma db seed`` |
| 7 - start dev server | ```npm run dev``` |
| 8 - check if the seeding was successfull | ```npx prisma studio``` |

## Note i added a new field to the pet table and i end up using "npx prisma db push" (this is not recommended)

i am using docker to be able to use tables plus(local way to see postgres db)

create a docker-componse.yml file
add your docker setup
create .env file and create the env var that you need to start docker. eg

DB_USER=postgres
DB_NAME=petShop
DB_PASSWORD=123456JLML

run docker compose up -d