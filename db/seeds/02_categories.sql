-----------------------------------------------------------------------------
-- File             : ./seeds/02_categories.sql
-- Author           : Polina, Jose, Jairo
-- Date             : Sep 24, 2021
-- Purpose          : Populate categories table with initial dataset
-- Called by        : ./bin/resetdb.js
-- Affected table(s): categories
-----------------------------------------------------------------------------

insert into categories (description) values ('Films-Series');
insert into categories (description) values ('Restaurants');
insert into categories (description) values ('Books');
insert into categories (description) values ('Products');
