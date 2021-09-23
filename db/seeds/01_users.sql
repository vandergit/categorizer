-----------------------------------------------------------------------------
-- File             : ./seeds/01_users.sql
-- Author           : Polina, Jose, Jairo
-- Date             : Sep 24, 2021
-- Purpose          : Populate users table with initial dataset
-- Called by        : ./bin/resetdb.js
-- Affected table(s): users
-----------------------------------------------------------------------------
insert into users (email, password, created_at) values ('kadams0@cnn.com', 'kBCkshDU5e0', '2021-05-31');
insert into users (email, password, created_at) values ('pskrobot@pcworld.com', 'gnq4WMi', '2021-08-23');
insert into users (email, password, created_at) values ('jbautista@ocn.ne.jp', 'cSOxqFcnJ5w', '2020-09-24');
insert into users (email, password, created_at) values ('jaguirre@oakley.com', 'fnHuRugx2Q', '2021-03-13');
insert into users (email, password, created_at) values ('rdannohl4@barnesandnoble.com', '97kH3LlAYHr', '2020-12-23');
