DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE "users" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "first_name" VARCHAR[255],
  "last_name" VARCHAR[255],
  "email" VARCHAR[255],
  "password" VARCHAR[255],
  "created_at" DATE DEFAULT TODAY
);
