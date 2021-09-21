DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE "users" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "email" VARCHAR(255),
  "password" VARCHAR(255),
  "created_at" DATE DEFAULT now()
);
