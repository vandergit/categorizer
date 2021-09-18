DROP TABLE IF EXISTS activities CASCADE;

CREATE TABLE "activities" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
  "category_id" INTEGER NOT NULL REFERENCES "categories" ("id") ON DELETE CASCADE,
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW
);
