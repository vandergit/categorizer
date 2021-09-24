Smart ToDo List
===============

## Project Setup

The following steps are neccesary to run the app.

1. Clone your copy of the repo to your dev machine
2. Create the DB and DB Roles
  - CREATE ROLE labber WITH LOGIN password 'labber';
  - CREATE DATABASE midterm OWNER labber;
3. Create the `.env` file and update it with your local information
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
4. Load the schema and seeds files with `npm run db:reset`
5. Install dependencies: `npm i`
6. Add your API keys to .env file (API_G=your key for google api
                                   API_W=your key for wolframalpha api
                                   API_O=your key for obdb api)
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Warnings & Tips

- This is a prototype
- Have fun!

## Dependencies

- Node 10.x
- NPM 5.x
- axios 0.21.4,
- body-parser 1.19.0,
- chalk 4.1.2,
- dotenv 10.0.0,
- ejs 3.1.6,
- express 4.17.1,
- morgan 1.10.0,
- node-sass-middleware 0.11.0,
- pg 8.7.1,
- pg-native 3.0.0,
- request-promise-native 1.0.9,
- string-similarity 4.0.4
- nodemon 2.0.12

## Screenshots & multimedia

![]()
![]()
