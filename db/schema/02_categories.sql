---------------------------------------------------------------------------
-- File             : ./schema/02_categories.sql
-- Author           : Polina, Jose, Jairo
-- Date             : Sep 24, 2021
-- Purpose          : Create categories master table for the app categories
-- Called by        : ./bin/resetdb.js
-- Affected table(s): categories
---------------------------------------------------------------------------
-- id         : Auto-incremented PK
-- description: Category name
---------------------------------------------------------------------------

DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE "categories" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "description" VARCHAR(255)
);
