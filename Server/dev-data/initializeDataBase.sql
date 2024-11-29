-- Insert data into Users
INSERT INTO Users (username, password, email, ProfilePhoto, ProfileName, role)
VALUES 
    ('admin_user', 'hashed_password1', 'admin@example.com', NULL, 'Admin User', 'admin'),
    ('traveller_user', 'hashed_password2', 'traveller@example.com', NULL, 'Traveller User', 'traveller'),
    ('agency_user', 'hashed_password3', 'agency@example.com', NULL, 'Agency User', 'travel_agency');

-- Insert data into Admins
INSERT INTO Admins (ADMIN_ID)
VALUES 
    (1); -- Corresponds to the USER_ID of the admin user

-- Insert data into Traveller
INSERT INTO Traveller (TRAVELLER_ID, Points, NumberOfTrips)
VALUES 
    (2, 100, 5); -- Corresponds to the USER_ID of the traveller user

-- Insert data into TravelAgency
INSERT INTO TravelAgency (TravelAgency_ID, Address, Location, PhoneNumber, Email, Rate, Description, Country)
VALUES 
    (3, '123 Main St', 'Cairo', '123456789', 'agency@example.com', 4.5, 'Trusted travel agency', 'Egypt'); -- Corresponds to the USER_ID of the travel agency

-- Insert data into Trip
INSERT INTO Trip (Description, Price, MaxSeats, Destinition, Duration, StartLocation, TravelAgency_ID)
VALUES 
    ('Luxor and Aswan trip', 500.00, 30, 'Luxor and Aswan', '5 days', 'Cairo', 3);

-- Insert data into Tickets
INSERT INTO Tickets (Date, Price, NumberOfSeats, TRAVELLER_ID, TRIP_ID)
VALUES 
    (CURRENT_DATE, 500.00, 1, 2, 1);

-- Insert data into QA
INSERT INTO QA (Question, Answer, TRAVEL_AGENCY_ID, DATE, TIME)
VALUES 
    ('What are the available trips?', 'We offer trips to Luxor and Aswan.', 3, CURRENT_DATE, CURRENT_TIME);

-- Insert data into Rewards
INSERT INTO Rewards (ADMIN_ID, PHOTO, Description, PointsNeeded)
VALUES 
    (1, 'reward_photo.png', 'Free trip to Luxor and Aswan', 500);

-- Insert data into Policies
INSERT INTO Policies (ADMIN_ID, Description, Title)
VALUES 
    (1, 'All bookings are non-refundable.', 'Booking Policy');

-- Insert data into Blogs
INSERT INTO Blogs (Title, Content, Date, Time, USER_ID)
VALUES 
    ('Top 10 Destinations in Egypt', 'Explore the best places to visit.', CURRENT_DATE, CURRENT_TIME, 3);

-- Insert data into Messages
INSERT INTO Messages (SENDER_ID, RECEIVER_ID, CONTENT, DATE, TIME)
VALUES 
    (2, 3, 'I am interested in booking a trip.', CURRENT_DATE, CURRENT_TIME);

-- Insert data into GetReward
INSERT INTO GetReward (REWARD_ID, TRAVELLER_ID)
VALUES 
    (1, 2);

-- Insert data into Promote
INSERT INTO Promote (TravelAgency_ID, Trip_ID, EXPIRY_DATE, PRECENTAGE)
VALUES 
    (3, 1, CURRENT_DATE + INTERVAL '30 days', 20.0);

-- Insert data into Review
INSERT INTO Review (TRAVELLER_ID, TRAVEL_AGENCY_ID, RATE, REVIEW, DATE)
VALUES 
    (2, 3, 5.0, 'Amazing experience!', CURRENT_DATE);

-- Insert data into Report
INSERT INTO Report (TRAVELLER_ID, TRAVEL_AGENCY_ID, DESCRIPTION, DATE)
VALUES 
    (2, 3, 'Delayed trip start time.', CURRENT_DATE);

-- Insert data into TripPhotos
INSERT INTO TripPhotos (TRIP_ID, PHOTO)
VALUES 
    (1, 'trip_photo.jpg');
