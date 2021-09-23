---------------------------------------------------------------------
-- File             : ./schema/01_users.sql
-- Author           : Polina, Jose, Jairo
-- Date             : Sep 24, 2021
-- Purpose          : Create users table holding registered customers
-- Called by        : ./bin/resetdb.js
-- Affected table(s): users
---------------------------------------------------------------------
-- id        : Auto-incremented PK
-- email     : Electronic mail used as app username
-- password  : Secret string to auntheticate users
---------------------------------------------------------------------

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE "users" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "email" VARCHAR(255),
  "password" VARCHAR(255)
);
