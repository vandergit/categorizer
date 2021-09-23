-----------------------------------------------------------------------------
-- File             : ./seeds/03_activities.sql
-- Author           : Polina, Jose, Jairo
-- Date             : Sep 24, 2021
-- Purpose          : Populate activities table with initial dataset
-- Called by        : ./bin/resetdb.js
-- Affected table(s): activities
-----------------------------------------------------------------------------

insert into activities (user_id, category_id, description, created_at) values (1, 3, 'The Picture of Dorian Gray', '2020-10-03T09:34:49Z');
insert into activities (user_id, category_id, description, created_at) values (1, 1, 'The Matrix', '2021-05-24T21:41:37Z');
insert into activities (user_id, category_id, description, created_at) values (1, 2, 'The Keg', '2021-06-11T16:06:04Z');
insert into activities (user_id, category_id, description, created_at) values (1, 4, 'PS5 videogame', '2021-09-03T21:30:45Z');
