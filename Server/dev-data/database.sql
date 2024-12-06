
CREATE TABLE Users 
(
    USER_ID SERIAL PRIMARY KEY ,
    username VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    ProfilePhoto VARCHAR(300),
    ProfileName VARCHAR(200),
    passwordchangedat TIMESTAMP,
    role VARCHAR(200) NOT NULL CHECK (role IN ('admin', 'traveller', 'travel_agency'))
);

CREATE TABLE Admins
(
    ADMIN_ID INT PRIMARY KEY ,
    Foreign Key (ADMIN_ID) REFERENCES Users(USER_ID) ON DELETE CASCADE
);

CREATE TABLE Traveller
(
    TRAVELLER_ID INT PRIMARY KEY ,
    Points INT DEFAULT 0 NOT NULL,
    NumberOfTrips INT DEFAULT 0 NOT NULL,
    Foreign Key (TRAVELLER_ID) REFERENCES Users(USER_ID) ON DELETE CASCADE
);
CREATE TABLE TravelAgency
(
    TravelAgency_ID INT PRIMARY KEY ,
    Address VARCHAR(200) NOT NULL,
    Location VARCHAR(200) NOT NULL,
    PhoneNumber VARCHAR(200) NOT NULL,
    Email VARCHAR(200) NOT NULL,
    Rate FLOAT DEFAULT 0 NOT NULL,
    Description VARCHAR(400) NOT NULL,
    Country VARCHAR(200) NOT NULL,
    Foreign Key (TravelAgency_ID) REFERENCES Users(USER_ID) ON DELETE CASCADE
);

CREATE TABLE Trip
(
    Trip_ID SERIAL PRIMARY KEY ,
    Description VARCHAR(400),
    Price FLOAT NOT NULL,
    MaxSeats INT NOT NULL,
    Destinition VARCHAR(200) NOT NULL,
    Duration VARCHAR(400) NOT NULL, ---we can make it composite to date start and date end
    StartLocation VARCHAR(200) NOT NULL,
    TravelAgency_ID INT NOT NULL,
    Foreign Key (TravelAgency_ID) REFERENCES TravelAgency(TravelAgency_ID) ON DELETE CASCADE
);
-- CREATE TABLE NOtification
-- (
--     NOTIFICATION_ID SERIAL PRIMARY KEY ,
--     Date DATE NOT NULL,
--     Time TIME NOT NULL,
--     Content VARCHAR(400) NOT NULL,
--     Status BOOLEAN DEFAULT FALSE NOT NULL,
--     TRAVELLER_ID INT NOT NULL,
--     Foreign Key (TRAVELLER_ID) REFERENCES Traveller(TRAVELLER_ID) ON DELETE CASCADE
-- );

CREATE TABLE Tickets 
(
    TICKET_ID SERIAL PRIMARY KEY ,
    Date DATE NOT NULL,
    Price FLOAT NOT NULL,
    NumberOfSeats INT DEFAULT 1 NOT NULL,
    TRAVELLER_ID INT NOT NULL,
    TRIP_ID INT NOT NULL,
    Foreign Key (TRAVELLER_ID) REFERENCES Traveller(TRAVELLER_ID) ON DELETE CASCADE,
    Foreign Key (TRIP_ID) REFERENCES Trip(Trip_ID) ON DELETE CASCADE
);


CREATE TABLE QA
(
    QUESTION_ID SERIAL PRIMARY KEY ,
    Question VARCHAR(1000) NOT NULL,
    Answer VARCHAR(1000) NOT NULL,
    TRAVEL_AGENCY_ID INT NOT NULL,
    Foreign Key (TRAVEL_AGENCY_ID) REFERENCES TravelAgency(TravelAgency_ID) ON DELETE CASCADE,
    DATE DATE NOT NULL,
    TIME TIME NOT NULL
);

CREATE TABLE Rewards
(
    REWARD_ID SERIAL PRIMARY KEY,               -- Unique identifier for the reward
    ADMIN_ID INT,                               -- Foreign key to Admins table
    PHOTO VARCHAR(200) NOT NULL,               -- Photo of the reward
    Description VARCHAR(400) NOT NULL,         -- Description of the reward
    PointsNeeded INT NOT NULL,                 -- Points needed to redeem the reward
    Type VARCHAR(100) NOT NULL CHECK (Type IN ('general', 'promotion', 'free trip')), -- Type of the reward
    FOREIGN KEY (ADMIN_ID) REFERENCES Admins(ADMIN_ID) ON DELETE SET NULL -- Set admin to NULL if deleted
);

CREATE TABLE Policies
(
    POLICY_ID SERIAL PRIMARY KEY ,
    ADMIN_ID INT,
    Description VARCHAR(1000) NOT NULL,
    Title VARCHAR(200) NOT NULL,
    Foreign Key (ADMIN_ID) REFERENCES Admins(ADMIN_ID) ON DELETE SET NULL
);


CREATE TABLE Blogs
(
    BLOG_ID SERIAL PRIMARY KEY ,
    Content VARCHAR(1000),
    Date DATE NOT NULL,
    Time TIME NOT NULL,
	PHOTO VARCHAR(500),
    USER_ID INT NOT NULL,
    Foreign Key (USER_ID) REFERENCES Users(USER_ID) ON DELETE CASCADE
);


CREATE TABLE Messages
(
    SENDER_ID INT NOT NULL,
    RECEIVER_ID INT NOT NULL,
    PRIMARY KEY (SENDER_ID, RECEIVER_ID),
    CONTENT VARCHAR(1000) NOT NULL,
    DATE DATE NOT NULL,
    TIME TIME NOT NULL,
    FOREIGN KEY (SENDER_ID) REFERENCES Users(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (RECEIVER_ID) REFERENCES Users(USER_ID) ON DELETE CASCADE
);

CREATE TABLE GetReward
(
    REWARD_ID INT,
    TRAVELLER_ID INT,
    PRIMARY KEY (REWARD_ID, TRAVELLER_ID),
    FOREIGN KEY (REWARD_ID) REFERENCES Rewards(REWARD_ID) ON DELETE CASCADE,
    FOREIGN KEY (TRAVELLER_ID) REFERENCES Traveller(TRAVELLER_ID) ON DELETE CASCADE
);

CREATE TABLE Promote
(
    TravelAgency_ID INT NOT NULL,
    Trip_ID INT PRIMARY KEY NOT NULL,
    EXPIRY_DATE DATE NOT NULL,
    PRECENTAGE FLOAT NOT NULL,
    FOREIGN KEY (TravelAgency_ID) REFERENCES TravelAgency(TravelAgency_ID) ON DELETE CASCADE,
    FOREIGN KEY (Trip_ID) REFERENCES Trip(Trip_ID) ON DELETE CASCADE
);

CREATE TABLE Review
(
    TRAVELLER_ID INT NOT NULL,
    TRAVEL_AGENCY_ID INT NOT NULL,
    PRIMARY KEY (TRAVELLER_ID, TRAVEL_AGENCY_ID),
    RATE FLOAT NOT NULL,
    REVIEW VARCHAR(1000) ,
    DATE DATE NOT NULL,
    FOREIGN KEY (TRAVELLER_ID) REFERENCES Traveller(TRAVELLER_ID) ON DELETE CASCADE,
    FOREIGN KEY (TRAVEL_AGENCY_ID) REFERENCES TravelAgency(TravelAgency_ID) ON DELETE CASCADE
);

CREATE TABLE Report
(
    TRAVELLER_ID INT NOT NULL,
    TRAVEL_AGENCY_ID INT NOT NULL,
    PRIMARY KEY (TRAVELLER_ID, TRAVEL_AGENCY_ID),
    DESCRIPTION VARCHAR(1000) NOT NULL,
    DATE DATE NOT NULL,
    FOREIGN KEY (TRAVELLER_ID) REFERENCES Traveller(TRAVELLER_ID) ON DELETE CASCADE,
    FOREIGN KEY (TRAVEL_AGENCY_ID) REFERENCES TravelAgency(TravelAgency_ID) ON DELETE CASCADE
);

CREATE TABLE TripPhotos
(
    TRIP_ID INT NOT NULL,
    PHOTO VARCHAR(200) NOT NULL,
    PRIMARY KEY (TRIP_ID, PHOTO),
    FOREIGN KEY (TRIP_ID) REFERENCES Trip(Trip_ID) ON DELETE CASCADE
);