# TripSync

This project is a full-stack web application built using **React** for the frontend, **Node.js** for the backend, and **PostgreSQL** as the database. It is designed to provide travel-related services, including user registration, travel agency profiles, tour bookings, blogs, and reviews.

## Features

- **User Management**:
  - User authentication (Sign-in and Register).
  - Role-based functionalities (Traveler, Travel Agency, Admin).

- **Travel Agencies**:
  - Travel agency registration and profile management.
  - Display and manage agency tours.

- **Tours**:
  - Browse tours by location, duration, and pricing.
  - Add, edit, and delete tours (for authorized users).
  - Booking interface for travelers.

- **Blog System**:
  - Blog browsing and writing functionalities.
  - Traveler and agency-related blogs.

- **Reviews & Ratings**:
  - Leave reviews for tours, travel agencies, and users.

- **Admin Panel**:
  - Manage agencies, users, and reported content.

- **Miscellaneous**:
  - Responsive design.
  - Dynamic routing for pages like travel agency profiles, trip details, and more.

## Prerequisites

To run this project locally, you will need the following:

1. **Node.js** (v16+)
2. **PostgreSQL** database
3. A modern web browser

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
   ```

2. **Install dependencies**:
   Navigate to both `frontend` and `backend` folders and run:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Create a PostgreSQL database.
   - Update the database connection details in the `backend` configuration file.

4. **Run migrations** (if applicable):
   ```bash
   npm run migrate
   ```

5. **Start the development servers**:
   - For the backend:
     ```bash
     npm start
     ```
   - For the frontend:
     ```bash
     npm start
     ```

6. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

- **Frontend**: Contains React components, pages, and assets.
- **Backend**: Node.js server, routes, and database integration.

### Key Files

- **App.js**: Main React component for routing.
- **userContext.js**: Context API for user authentication and state management.
- **Tours.js**: Handles tours listing and interactions.
- **TravelAgencyProfile.js**: Component for displaying travel agency details.
- **routes/**: Backend API endpoints.

## Scripts

### Frontend

- **`npm start`**: Start the development server.
- **`npm build`**: Build the project for production.

### Backend

- **`npm start`**: Start the backend server.
- **`npm run migrate`**: Run database migrations.

## Contributing

Feel free to fork this repository and contribute by submitting pull requests. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.



Thank you for using our travel application! We hope it enhances your travel experiences.

