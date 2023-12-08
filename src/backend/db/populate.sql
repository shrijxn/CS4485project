insert into Person (email, firstName, middleName, lastName, usertype, phonenum, criminal, photo)
values ('example1@gmail.com', 'Harry','Julius', 'Batch', 'tutor', '123-456-7890', 'false', 'ship.jpg'),
('example2@gmail.com', 'Emily','James', 'Squire', 'tutor', '321-654-0987', 'false', 'ship.jpg'),
('example3@gmail.com', 'Sarah','Fred', 'Nguyen', 'student', '000-000-0000', 'false', 'ship.jpg'),
('example4@gmail.com', 'Chris','Edward', 'Khan', 'tutor', '', 'false', 'ship.jpg'),
('example5@gmail.com', 'Ethan','Robert', 'Smith', 'student', '', 'false', 'ship.jpg'),
('example6@gmail.com', 'Ryan','Mekk', 'To', 'tutor', '111-111-1111', 'false', 'ship.jpg'),
('example7@gmail.com', 'Justin','Peter', 'Knox', 'tutor', '', 'false', 'ship.jpg'),
('example8@gmail.com', 'Omar','Will', 'Calliope', 'student', '222-222-2222', 'false', 'ship.jpg'),
('testFavTutor@email.com', 'Tutorman','', 'MrTutor', 'tutor', '', 'false', 'ship.jpg'),
('testFavStudent@email.com', 'Studentman','', 'MrStudent', 'student', '', 'false', 'mountains.jpg'),
('example9@gmail.com', 'Kyle','David', 'Persephone', 'student', '', 'false', 'ship.jpg');

/*Generic Passwords using the SHA1 Hash, password shouldn't be stored in this case. Adjustments 
will be done once we finalize hashing and direction
*/
insert into Login (email, hashedpass)
values ('example1@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8'),
('example2@gmail.com', 'cbfdac6008f9cab4083784cbd1874f76618d2a97'),
('example3@gmail.com', 'efdb862d5f5ea6aa2baa74c1c53b43985b3193e3'),
('example4@gmail.com', 'b901fb770e777abbb1598859989fcdf87fd10536'),
('example5@gmail.com', '5a22b69f622796d44e153f2c3a9c3baddfecfbb2'),
('example6@gmail.com', '760a7ac80c50895e42610e8814f90ceb4a5d3497'),
('example7@gmail.com', '629c16a4580d234768dbb1acdc5aa28b62e1c678'),
('example8@gmail.com', '0167bbf5aa9e9c0c005b2c62e0191b73a1e34df0'),
('example9@gmail.com', '08810e07d728f0d88d51cab24bfae7cac83f9ec0'),
('testFavTutor@email.com', '$2b$12$6PxGJvJZy.Klw2.Y.f6ZAeoV3l8QrHiupHJoTSAI77W9keCc6puEG'),
('testFavStudent@email.com', '$2b$12$8UsvY4.AxcX3kDTxwo7vMegwx4/9ECWPCnpA99P9IqKcub32mhONG');
/*
unhashed passwords that won't follow password requirements, testing purposes only
(example1@gmail.com, password)
(example2@gmail.com, password123)
(example3@gmail.com, testing12)
(example4@gmail.com, data)
(example5@gmail.com, computer!)
(example6@gmail.com, frog312421)
(example7@gmail.com, frogJam!)
(example8@gmail.com, databases)
(example9@gmail.com, Wordpass)
*/

insert into Subject_List (email, classname)
values ('example1@gmail.com', 'History'),
('example2@gmail.com', 'History'),
('example4@gmail.com', 'History'),
('example6@gmail.com', 'Math');

insert into Favorite_Tutor (student_email, tutor_email)
values ('testFavStudent@email.com', 'testFavTutor@email.com'),
('example3@gmail.com', 'example2@gmail.com'),
('example5@gmail.com', 'example6@gmail.com');


insert into Schedules (t_email, s_email, subject, date, time)
values ('testFavTutor@email.com', 'testFavStudent@email.com', 'Math', '2023-11-09', '1pm-2pm');

insert into Subject_List(email, classname)
values('testFavTutor@email.com', 'Math'),
('testFavTutor@email.com', 'Biology');

insert into Tutor_Availability(email, times)
values('testFavTutor@email.com', '2am-3am'),
('testFavTutor@email.com', '5pm-6pm');

insert into Tutoring_Hours (email, hours)
values ('example1@gmail.com', 0),
('testFavStudent@email.com', 6),
('testFavTutor@email.com', 10);

insert into About_Me (email, about_me)
values ('example1@gmail.com', 'This is me!');

insert into Profile_Pic (email, picname)
values ('example1@gmail.com', 'John.png');
