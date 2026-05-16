CREATE DATABASE HotelReservationDB;
USE HotelReservationDB;

CREATE TABLE Hotel(Hotelid varchar(5) primary key, HotelName varchar(20), Location varchar(10), Email varchar(30), Phone varchar(10), ImageUrl varchar(50));

INSERT INTO Hotel(Hotelid, HotelName, Location, Email, Phone, ImageUrl) VALUES
-- Location 1: Goa
('H001', 'Sea View Resort', 'Goa', 'seaview@gmail.com', '9876543210', 'images/goa1.jpg'),
('H002', 'Beachside Inn', 'Goa', 'beachside@gmail.com', '9876543211', 'images/goa2.jpg'),
('H003', 'Sunset Hotel', 'Goa', 'sunset@gmail.com', '9876543212', 'images/goa3.jpg'),

-- Location 2: Mumbai
('H004', 'City Lights Hotel', 'Mumbai', 'citylights@gmail.com', '9876543220', 'images/mumbai1.jpg'),
('H005', 'Marine Drive Inn', 'Mumbai', 'marinedrive@gmail.com', '9876543221', 'images/mumbai2.jpg'),
('H006', 'Gateway Suites', 'Mumbai', 'gateway@gmail.com', '9876543222', 'images/mumbai3.jpg'),

-- Location 3: Delhi
('H007', 'Red Fort Hotel', 'Delhi', 'redfort@gmail.com', '9876543230', 'images/delhi1.jpg'),
('H008', 'Connaught Place Inn', 'Delhi', 'cpinn@gmail.com', '9876543231', 'images/delhi2.jpg'),
('H009', 'Lotus Hotel', 'Delhi', 'lotus@gmail.com', '9876543232', 'images/delhi3.jpg'),

-- Location 4: Bangalore
('H010', 'Silicon Suites', 'Bangalore', 'silicon@gmail.com', '9876543240', 'images/blr1.jpg'),
('H011', 'Garden City Inn', 'Bangalore', 'gardencity@gmail.com', '9876543241', 'images/blr2.jpg'),
('H012', 'Tech Park Hotel', 'Bangalore', 'techpark@gmail.com', '9876543242', 'images/blr3.jpg'),

-- Location 5: Chennai
('H013', 'Marina Bay Hotel', 'Chennai', 'marinabay@gmail.com', '9876543250', 'images/chenna1.jpg'),
('H014', 'Temple View Inn', 'Chennai', 'templeview@gmail.com', '9876543251', 'images/chenna2.jpg'),
('H015', 'Bayfront Suites', 'Chennai', 'bayfront@gmail.com', '9876543252', 'images/chenna3.jpg');

CREATE TABLE RoomType(RoomTypeid varchar(5) primary key, TypeName varchar(30), Capacity int);

INSERT INTO RoomType(RoomTypeid, TypeName, Capacity) VALUES
('RT1', 'King', 2),
('RT2', 'Queen', 2),
('RT3', 'Single', 1),
('RT4', 'Studio', 2),
('RT5', 'Suite', 4),
('RT6', 'Deluxe', 3),
('RT7', 'Executive', 4);

CREATE TABLE Room(Roomid varchar(7) primary key, Status enum('Available', 'Booked') default 'Available', Hotelid varchar(5), RoomTypeid varchar(5), foreign key (Hotelid) references Hotel(Hotelid), foreign key (RoomTypeid) references RoomType(RoomTypeid));

-- Rooms for H001-H003 (Goa)

INSERT INTO Room(Roomid, Hotelid, RoomTypeid) VALUES

('H001R01','H001','RT3'),('H001R02','H001','RT3'),('H001R03','H001','RT4'),('H001R04','H001','RT3'),('H001R05','H001','RT4'),

('H002R01','H002','RT1'),('H002R02','H002','RT2'),('H002R03','H002','RT2'),('H002R04','H002','RT3'),('H002R05','H002','RT1'),

('H003R01','H003','RT5'),('H003R02','H003','RT6'),('H003R03','H003','RT7'),('H003R04','H003','RT5'),('H003R05','H003','RT7');



-- Rooms for H004-H006 (Kerala)

INSERT INTO Room(Roomid, Hotelid, RoomTypeid) VALUES

('H004R01','H004','RT3'),('H004R02','H004','RT3'),('H004R03','H004','RT4'),('H004R04','H004','RT3'),('H004R05','H004','RT4'),

('H005R01','H005','RT1'),('H005R02','H005','RT2'),('H005R03','H005','RT2'),('H005R04','H005','RT3'),('H005R05','H005','RT1'),

('H006R01','H006','RT5'),('H006R02','H006','RT6'),('H006R03','H006','RT7'),('H006R04','H006','RT5'),('H006R05','H006','RT7');



-- Rooms for H007-H009 (Manali)

INSERT INTO Room(Roomid, Hotelid, RoomTypeid) VALUES

('H007R01','H007','RT3'),('H007R02','H007','RT3'),('H007R03','H007','RT4'),('H007R04','H007','RT3'),('H007R05','H007','RT4'),

('H008R01','H008','RT1'),('H008R02','H008','RT2'),('H008R03','H008','RT2'),('H008R04','H008','RT3'),('H008R05','H008','RT1'),

('H009R01','H009','RT5'),('H009R02','H009','RT6'),('H009R03','H009','RT7'),('H009R04','H009','RT5'),('H009R05','H009','RT7');



-- Rooms for H010-H012 (Mumbai)

INSERT INTO Room(Roomid, Hotelid, RoomTypeid) VALUES

('H010R01','H010','RT3'),('H010R02','H010','RT3'),('H010R03','H010','RT4'),('H010R04','H010','RT3'),('H010R05','H010','RT4'),

('H011R01','H011','RT1'),('H011R02','H011','RT2'),('H011R03','H011','RT2'),('H011R04','H011','RT3'),('H011R05','H011','RT1'),

('H012R01','H012','RT5'),('H012R02','H012','RT6'),('H012R03','H012','RT7'),('H012R04','H012','RT5'),('H012R05','H012','RT7');



-- Rooms for H013-H015 (Delhi)

INSERT INTO Room(Roomid, Hotelid, RoomTypeid) VALUES

('H013R01','H013','RT3'),('H013R02','H013','RT3'),('H013R03','H013','RT4'),('H013R04','H013','RT3'),('H013R05','H013','RT4'),

('H014R01','H014','RT1'),('H014R02','H014','RT2'),('H014R03','H014','RT2'),('H014R04','H014','RT3'),('H014R05','H014','RT1'),

('H015R01','H015','RT5'),('H015R02','H015','RT6'),('H015R03','H015','RT7'),('H015R04','H015','RT5'),('H015R05','H015','RT7');

CREATE TABLE Price(Hotelid varchar(5), RoomTypeid varchar(5), RoomCharge int, primary key(Hotelid, RoomTypeid), foreign key (Hotelid) references Hotel(Hotelid), foreign key (RoomTypeid) references RoomType(RoomTypeid));

INSERT INTO Price (Hotelid, RoomTypeid, RoomCharge) VALUES
('H001','RT3',3000),('H001','RT4',3500),
('H002','RT3',3000),('H002','RT1',2500),('H002','RT2',3000),
('H003','RT5',4000),('H003','RT6',4500),('H003','RT7',5000);

INSERT INTO Price (Hotelid, RoomTypeid, RoomCharge) VALUES
('H004','RT3',3000),('H004','RT4',3300),
('H005','RT1',1800),('H005','RT2',2300),('H005','RT3',2800),
('H006','RT5',3800),('H006','RT6',4300),('H006','RT7',4800);

INSERT INTO Price (Hotelid, RoomTypeid, RoomCharge) VALUES
('H007','RT3',2500),('H007','RT4',3000),
('H008','RT1',1500),('H008','RT2',2000),('H008','RT3',2500),
('H009','RT5',3500),('H009','RT6',4000),('H009','RT7',4500);

INSERT INTO Price (Hotelid, RoomTypeid, RoomCharge) VALUES
('H010','RT3',3500),('H010','RT4',4000),
('H011','RT1',2500),('H011','RT2',3000),('H011','RT3',3500),
('H012','RT5',4500),('H012','RT6',5000),('H012','RT7',5500);

INSERT INTO Price (Hotelid, RoomTypeid, RoomCharge) VALUES
('H013','RT3',3200),('H013','RT4',3700),
('H014','RT1',2200),('H014','RT2',2700),('H014','RT3',3200),
('H015','RT5',4200),('H015','RT6',4700),('H015','RT7',5200);

CREATE TABLE Appointment(Appointmentid int auto_increment primary key, CustomerName varchar(20), Email varchar(30), Phone varchar(10), Roomid varchar(7), foreign key (Roomid) references Room(Roomid));

CREATE TABLE Review(Hotelid varchar(5), Comment text, Rating int check(Rating between 1 and 10), foreign key (Hotelid) references Hotel(Hotelid));

INSERT INTO Review(Hotelid, Comment, Rating) VALUES
('H001', 'Its devika, didnot meet my expectations.', 6),
('H001', 'Rooms were clean but service was slow.', 7),
('H002', 'Excellent location, very comfortable.', 8),
('H002', 'Good hotel, but food could improve.', 6),
('H003', 'Staff were friendly and helpful.', 8),
('H003', 'Iam pathuu i am not thallal it was nice experience', 10),
('H004', 'Peaceful and scenic, loved it.', 10),
('H004', 'Good experience but slightly expensive.', 7),
('H005', 'Very relaxing stay near the river.', 9),
('H005', 'Rooms were okay, service average.', 6),
('H006', 'Beautiful resort with great amenities.', 10),
('H006', 'Enjoyed the stay, staff very polite.', 8),
('H007', 'Cozy rooms and great mountain view.', 9),
('H007', 'Good location, rooms need maintenance.', 6),
('H008', 'Excellent hotel, worth the price.', 9),
('H008', 'Rooms were small but comfortable.', 7),
('H009', 'Very bad experience.', 4),
('H009', 'Nice resort, could improve breakfast.', 8),
('H010', 'Centrally located and very clean.', 8),
('H010', 'Staff were helpful, rooms fine.', 7),
('H011', 'Good view and spacious rooms.', 9),
('H011', 'Staffs were rude and Room were not clean.', 3),
('H012', 'Modern hotel, very comfortable.', 9),
('H012', 'Nice hotel but noisy surroundings.', 7),
('H013', 'Royal feel, excellent staff.', 10),
('H013', 'Rooms were neat, great location.', 9),
('H014', 'I am Krisz,Good hotel, amenities were nice.', 8),
('H014', 'Rooms were okay, price slightly high.', 6),
('H015', 'I had bad experience from staff.', 1),
('H015', 'Staff polite, overall good experience.', 8);

alter table Room add column RoomImage varchar(50);
SET SQL_SAFE_UPDATES = 0;
UPDATE Room
SET RoomImage = CASE RoomTypeid
    WHEN 'RT1' THEN 'images/king.jpg'
    WHEN 'RT2' THEN 'images/queen.jpg'
    WHEN 'RT3' THEN 'images/single.jpg'
    WHEN 'RT4' THEN 'images/studio.jpg'
    WHEN 'RT5' THEN 'images/suite.jpg'
    WHEN 'RT6' THEN 'images/deluxe.jpg'
    WHEN 'RT7' THEN 'images/executive.jpg'
END;