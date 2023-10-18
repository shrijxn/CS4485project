insert into Person (email, firstName, middleName, lastName, usertype)
values ('example1@gmail.com', 'Harry','Julius', 'Batch', 'tutor'),
('example2@gmail.com', 'Emily','James', 'Squire', 'tutor'),
('example3@gmail.com', 'Sarah','Fred', 'Nguyen', 'student'),
('example4@gmail.com', 'Chris','Edward', 'Khan', 'tutor'),
('example5@gmail.com', 'Ethan','Robert', 'Smith', 'student'),
('example6@gmail.com', 'Ryan','Mekk', 'To', 'tutor'),
('example7@gmail.com', 'Justin','Peter', 'Knox', 'tutor'),
('example8@gmail.com', 'Omar','Will', 'Calliope', 'student'),
('example9@gmail.com', 'Kyle','David', 'Persephone', 'student');

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
('example9@gmail.com', '08810e07d728f0d88d51cab24bfae7cac83f9ec0');
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

