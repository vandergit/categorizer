-----------------------------------------------------------------------------
-- File             : ./schema/03_activities.sql
-- Author           : Polina, Jose, Jairo
-- Date             : Sep 24, 2021
-- Purpose          : Create activities table recording the ToDo List content
-- Called by        : ./bin/resetdb.js
-- Affected table(s): activities
-----------------------------------------------------------------------------
-- id         : Auto-incremented PK
-- user_id    : FK to users table
-- category_id: FK to categories table
-- description: ToDo activity from the user
-- created_at : Activity creation date (with time zone)
-----------------------------------------------------------------------------

DROP TABLE IF EXISTS activities CASCADE;

CREATE TABLE "activities" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
  "category_id" INTEGER NOT NULL REFERENCES "categories" ("id") ON DELETE CASCADE,
  "description" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
