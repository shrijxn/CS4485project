DROP TABLE IF EXISTS Login;
DROP TABLE IF EXISTS Person CASCADE;
DROP TABLE IF EXISTS Subject_List;
DROP TABLE IF EXISTS About_Me;
DROP TABLE IF EXISTS Tutor_Availability;
DROP TABLE IF EXISTS Favorite_Tutor;
DROP TABLE IF EXISTS Schedules;
DROP TABLE IF EXISTS Profile_Pic;
DROP TABLE IF EXISTS Tutoring_Hours;

CREATE TABLE Person (
    email varchar(30) not null,
    firstName varchar(20) not null,
    middleName varchar(20) null,
    lastName varchar(20) not null,
    usertype varchar(7) not null,
    phonenum varchar(14) null,
    criminal varchar(6) not null,

    PRIMARY KEY (email)
);

CREATE TABLE Login (
    email varchar(30) not null,
    hashedpass varchar(64) not null,

    PRIMARY KEY (email),
    FOREIGN KEY (email) REFERENCES Person (email)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Subject_List (
	email varchar(30) not null,
	classname varchar(30) not null,
	
	FOREIGN KEY (email) REFERENCES Person (email)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE About_Me (
	email varchar(30) not null,
	about_me varchar(500),
	
	PRIMARY KEY (email),
	FOREIGN KEY (email) REFERENCES Person (email)
);

--Place holder for now, quite complex so might need so updates
CREATE TABLE Tutor_Availability (
	email varchar(30) not null,
	--parse each day individually for now, will figure out more elegant solution
	days varchar(50) not null,
	--not sure how time would work, will update as we figure something out
	times varchar(50) not null,
	
	FOREIGN KEY (email) REFERENCES Person (email)
);

CREATE TABLE Profile_Pic (
	email varchar(30) not null,
	picname varchar(30) not null,
	
	FOREIGN KEY (email) REFERENCES Person (email)
);

CREATE TABLE Schedules (
	t_email varchar(30) not null,
	s_email	varchar(30) not null,
	subject varchar(30) not null,
	day varchar(10) not null,
	start_time varchar(10) not null,
	end_time varchar(10) not null,

	FOREIGN KEY (t_email) REFERENCES Person (email),
	FOREIGN KEY (s_email) REFERENCES Person (email)
);

--Have to differentiate between emails, will need to make sure backend does this
CREATE TABLE Favorite_Tutor (
	student_email varchar(30) not null,
	tutor_email varchar(30) not null,
	
	PRIMARY KEY (student_email, tutor_email),
	FOREIGN KEY (student_email) REFERENCES Person (email),
	FOREIGN KEY (tutor_email) REFERENCES Person (email)
);

CREATE TABLE Tutoring_Hours (
	email varchar(30) not null,
	hours varchar(10) not null,
	
	PRIMARY KEY (email),
	FOREIGN KEY (email) REFERENCES Person(email)
);

CREATE VIEW tutors AS SELECT * FROM Person WHERE usertype = 'tutor';
CREATE VIEW students AS SELECT * FROM Person WHERE usertype = 'student';
