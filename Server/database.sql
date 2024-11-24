-- Creating the Database Schema for PostgreSQL

-- Table: User
CREATE TABLE "User" (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

-- Table: Admin
CREATE TABLE "Admin" (
    AdminID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

-- Table: Traveller
CREATE TABLE Traveller (
    TravellerID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    Points INT DEFAULT 0,
    NumberOfTrips INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

-- Table: Notification
CREATE TABLE Notification (
    NotificationID SERIAL PRIMARY KEY,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Content TEXT NOT NULL,
    State VARCHAR(50),
    TravellerID INT NOT NULL,
    FOREIGN KEY (TravellerID) REFERENCES Traveller(TravellerID) ON DELETE CASCADE
);

-- Table: Tickets
CREATE TABLE Tickets (
    TicketID SERIAL PRIMARY KEY,
    PurchaseDate DATE NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    TravellerID INT NOT NULL,
    TravelAgencyID INT NOT NULL,
    FOREIGN KEY (TravellerID) REFERENCES Traveller(TravellerID) ON DELETE CASCADE,
    FOREIGN KEY (TravelAgencyID) REFERENCES TravelAgency(TravelAgencyID) ON DELETE CASCADE
);

-- Table: TravelAgency
CREATE TABLE TravelAgency (
    TravelAgencyID SERIAL PRIMARY KEY,
    Address TEXT NOT NULL,
    Location VARCHAR(255),
    Name VARCHAR(255) NOT NULL,
    Rate DECIMAL(3, 2) DEFAULT 0.00,
    Description TEXT,
    Website VARCHAR(255),
    Phone VARCHAR(15),
    Country VARCHAR(50)
);

-- Table: Q&A
CREATE TABLE QandA (
    QuestionID SERIAL PRIMARY KEY,
    Question TEXT NOT NULL,
    Answer TEXT,
    Date DATE NOT NULL,
    Time TIME NOT NULL
);

-- Table: Rewards
CREATE TABLE Rewards (
    RewardID SERIAL PRIMARY KEY,
    AdminID INT NOT NULL,
    Photo TEXT,
    Description TEXT NOT NULL,
    Points INT NOT NULL,
    PointsPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (AdminID) REFERENCES "Admin"(AdminID) ON DELETE CASCADE
);

-- Table: Policy
CREATE TABLE Policy (
    PolicyID SERIAL PRIMARY KEY,
    AdminID INT NOT NULL,
    Item TEXT NOT NULL,
    Description TEXT NOT NULL,
    FOREIGN KEY (AdminID) REFERENCES "Admin"(AdminID) ON DELETE CASCADE
);

-- Table: Trip
CREATE TABLE Trip (
    TripID SERIAL PRIMARY KEY,
    AvailableSeats INT NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    MaxSeats INT NOT NULL,
    Destination TEXT NOT NULL,
    Duration INT NOT NULL,
    TravelAgencyID INT NOT NULL,
    FOREIGN KEY (TravelAgencyID) REFERENCES TravelAgency(TravelAgencyID) ON DELETE CASCADE
);

-- Table: Blogs
CREATE TABLE Blogs (
    BlogID SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    Photo TEXT,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

-- Table: Profile
CREATE TABLE Profile (
    ProfileID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    Photo TEXT,
    Posts TEXT,
    Followers INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

-- Table: Message
CREATE TABLE Message (
    MessageID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    Content TEXT NOT NULL,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

-- Table: Make_Questions_Admin
CREATE TABLE Make_Questions_Admin (
    AdminID INT NOT NULL,
    QuestionID INT NOT NULL,
    FOREIGN KEY (AdminID) REFERENCES "Admin"(AdminID) ON DELETE CASCADE,
    FOREIGN KEY (QuestionID) REFERENCES QandA(QuestionID) ON DELETE CASCADE,
    PRIMARY KEY (AdminID, QuestionID)
);

-- Table: Get_Reward
CREATE TABLE Get_Reward (
    RewardID INT NOT NULL,
    TravellerID INT NOT NULL,
    FOREIGN KEY (RewardID) REFERENCES Rewards(RewardID) ON DELETE CASCADE,
    FOREIGN KEY (TravellerID) REFERENCES Traveller(TravellerID) ON DELETE CASCADE,
    PRIMARY KEY (RewardID, TravellerID)
);

-- Table: Make_Questions_Agency
CREATE TABLE Make_Questions_Agency (
    TravelAgencyID INT NOT NULL,
    QuestionID INT NOT NULL,
    FOREIGN KEY (TravelAgencyID) REFERENCES TravelAgency(TravelAgencyID) ON DELETE CASCADE,
    FOREIGN KEY (QuestionID) REFERENCES QandA(QuestionID) ON DELETE CASCADE,
    PRIMARY KEY (TravelAgencyID, QuestionID)
);

-- Table: Promote
CREATE TABLE Promote (
    TravelAgencyID INT NOT NULL,
    TripID INT NOT NULL,
    Campaign TEXT,
    Percentage DECIMAL(5, 2),
    FOREIGN KEY (TravelAgencyID) REFERENCES TravelAgency(TravelAgencyID) ON DELETE CASCADE,
    FOREIGN KEY (TripID) REFERENCES Trip(TripID) ON DELETE CASCADE,
    PRIMARY KEY (TravelAgencyID, TripID)
);

-- Table: Review
CREATE TABLE Review (
    TravellerID INT NOT NULL,
    TravelAgencyID INT NOT NULL,
    Description TEXT,
    Date DATE NOT NULL,
    Rate DECIMAL(3, 2),
    FOREIGN KEY (TravellerID) REFERENCES Traveller(TravellerID) ON DELETE CASCADE,
    FOREIGN KEY (TravelAgencyID) REFERENCES TravelAgency(TravelAgencyID) ON DELETE CASCADE,
    PRIMARY KEY (TravellerID, TravelAgencyID)
);

-- Table: Report
CREATE TABLE Report (
    TravellerID INT NOT NULL,
    Description TEXT NOT NULL,
    Date DATE NOT NULL,
    FOREIGN KEY (TravellerID) REFERENCES Traveller(TravellerID) ON DELETE CASCADE,
    PRIMARY KEY (TravellerID, Date)
);

-- Table: Reviewed_By
CREATE TABLE Reviewed_By (
    TravellerID INT NOT NULL,
    TripID INT NOT NULL,
    Description TEXT,
    Date DATE NOT NULL,
    Rate DECIMAL(3, 2),
    FOREIGN KEY (TravellerID) REFERENCES Traveller(TravellerID) ON DELETE CASCADE,
    FOREIGN KEY (TripID) REFERENCES Trip(TripID) ON DELETE CASCADE,
    PRIMARY KEY (TravellerID, TripID)
);

-- Table: Trips_Photos
CREATE TABLE Trips_Photos (
    TripID INT NOT NULL,
    Photo TEXT NOT NULL,
    FOREIGN KEY (TripID) REFERENCES Trip(TripID) ON DELETE CASCADE,
    PRIMARY KEY (TripID, Photo)
);
