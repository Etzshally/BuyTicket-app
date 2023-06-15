# Event Ticketing System

The Event Ticketing System is a web application that allows users to purchase tickets for various events, conferences, parties, and more. The app is built using the MERN stack (MongoDB, Express.js, React, and Node.js) and integrates the Stripe payment method for secure and convenient transactions.

## Features

- View available events with event details such as name, date, location, and ticket price.
- Select an event and proceed to the ticket purchasing page.
- Securely process payments using Stripe's payment gateway.
- Receive payment confirmation and success/error messages.
- Admin-only access to add new events.

## Installation

Follow the instructions below to set up and run the Event Ticketing System locally on your machine.

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine.
- MongoDB should be installed and running.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/etzshally/event-ticketing-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd event-ticketing-system
   ```

3. Install the server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Install the client dependencies:

   ```bash
   cd ../client
   npm install
   ```

5. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Add the following environment variables to the `.env` file:
     - `MONGODB_URI`: Connection URI for your MongoDB database.
     - `STRIPE_SECRET_KEY`: Secret key for your Stripe account.
     - Example:

     ```bash
     MONGODB_URI=mongodb://localhost/event-ticketing-system
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```

6. Start the development server:

   - In the `server` directory, run:

     ```bash
     npm start
     ```

   - In the `client` directory, run:

     ```bash
     npm start
     ```

   This will start the server and client development servers concurrently.

7. Open your browser and visit `http://localhost:3000` to access the Event Ticketing System web app.

## Usage

- As an admin:
  - Login to the admin account (hardcoded admin credentials or implement your own admin authentication mechanism).
  - Add new events to the system through the admin interface.
- As a user:
  - Browse the available events on the home page.
  - Select an event to view more details.
  - Proceed to the ticket purchasing page.
  - Enter your payment details using the Stripe integration.
  - Receive a payment confirmation or error message.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## Acknowledgements

- [Stripe](https://stripe.com) - Payment gateway integration.
- [React](https://reactjs.org) - JavaScript library for building user interfaces.
- [Express.js](https://expressjs.com) - Web application framework for Node.js.
- [Node.js](https://nodejs.org) - JavaScript runtime environment.
- [MongoDB](https://www.mongodb.com) - NoSQL database.
