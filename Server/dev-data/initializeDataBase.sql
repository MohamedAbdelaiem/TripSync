-- Insert initial data into Users
INSERT INTO Users (username, password, email, ProfilePhoto, ProfileName)
VALUES 
('admin1', 'hashed_password1', 'admin1@example.com', NULL, 'Admin One'),
('traveller1', 'hashed_password2', 'traveller1@example.com', NULL, 'Traveller One'),
('traveller2', 'hashed_password3', 'traveller2@example.com', NULL, 'Traveller Two'),
('agency1', 'hashed_password4', 'agency1@example.com', NULL, 'Agency One');

-- Insert initial data into Admins
INSERT INTO Admins (ADMIN_ID)
VALUES (1);

-- Insert initial data into Traveller
INSERT INTO Traveller (TRAVELLER_ID, Points, NumberOfTrips)
VALUES 
(2, 100, 5),
(3, 200, 10);

-- Insert initial data into TravelAgency
INSERT INTO TravelAgency (TravelAgency_ID, Address, Location, PhoneNumber, Email, Rate, Description, Country)
VALUES 
(4, '123 Main St', 'City A', '1234567890', 'agency1@example.com', 4.5, 'Leading travel agency', 'Country X');

-- Insert initial data into Trip
INSERT INTO Trip (Description, Price, MaxSeats, Destinition, Duration, StartLocation, TravelAgency_ID)
VALUES 
('Mountain adventure trip', 200.0, 20, 'Mountain Base', '3 days', 'City A', 4),
('Beach holiday trip', 150.0, 30, 'Sunny Beach', '2 days', 'City B', 4);

-- Insert initial data into Tickets
INSERT INTO Tickets (Date, Price, NumberOfSeats, TRAVELLER_ID, TRIP_ID)
VALUES 
('2024-12-01', 200.0, 2, 2, 1),
('2024-12-02', 150.0, 1, 3, 2);

-- Insert initial data into QA
INSERT INTO QA (Question, Answer, TRAVEL_AGENCY_ID, DATE, TIME)
VALUES 
('What is the cancellation policy?', 'Full refund within 24 hours of booking', 4, '2024-11-27', '10:00:00'),
('Are meals included?', 'Yes, all meals are included', 4, '2024-11-28', '14:00:00');

-- Insert initial data into Rewards
INSERT INTO Rewards (ADMIN_ID, PHOTO, Description, PointsNeeded)
VALUES 
(1, 'reward1.jpg', 'Free trip voucher', 500),
(1, 'reward2.jpg', 'Discount coupon', 300);

-- Insert initial data into Policies
INSERT INTO Policies (ADMIN_ID, Description, Title)
VALUES 
(1, 'All trips must be booked 7 days in advance.', 'Booking Policy'),
(1, 'Cancellations are allowed up to 48 hours before the trip.', 'Cancellation Policy');

-- Insert initial data into Blogs
INSERT INTO Blogs (Title, Content, Date, Time, USER_ID)
VALUES 
('Top 5 travel destinations', 'Explore the best travel destinations this year!', '2024-11-25', '12:00:00', 4),
('Travel tips for beginners', 'Essential tips for first-time travelers.', '2024-11-26', '16:00:00', 4);

-- Insert initial data into Messages
INSERT INTO Messages (SENDER_ID, RECEIVER_ID, CONTENT, DATE, TIME)
VALUES 
(2, 4, 'Can you recommend a trip?', '2024-11-27', '09:00:00'),
(4, 2, 'Sure, I recommend the Mountain adventure trip.', '2024-11-27', '10:00:00');

-- Insert initial data into GetReward
INSERT INTO GetReward (REWARD_ID, TRAVELLER_ID)
VALUES 
(1, 2),
(2, 3);

-- Insert initial data into Promote
INSERT INTO Promote (TravelAgency_ID, Trip_ID, EXPIRY_DATE, PRECENTAGE)
VALUES 
(4, 1, '2024-12-15', 10.0),
(4, 2, '2024-12-20', 15.0);

-- Insert initial data into Review
INSERT INTO Review (TRAVELLER_ID, TRAVEL_AGENCY_ID, RATE, REVIEW, DATE)
VALUES 
(2, 4, 5.0, 'Amazing experience!', '2024-11-27'),
(3, 4, 4.0, 'Great trip but could improve meals.', '2024-11-28');

-- Insert initial data into Report
INSERT INTO Report (TRAVELLER_ID, TRAVEL_AGENCY_ID, DESCRIPTION, DATE)
VALUES 
(2, 4, 'The trip was delayed by 2 hours.', '2024-11-27'),
(3, 4, 'Unclear instructions about the meeting point.', '2024-11-28');

-- Insert initial data into TripPhotos
INSERT INTO TripPhotos (TRIP_ID, PHOTO)
VALUES 
(1, 'mountain_trip.jpg'),
(2, 'beach_trip.jpg');
