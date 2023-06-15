const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('your_stripe_secret_key');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB configuration and connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/event-ticketing-system', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Ticket schema
const TicketSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  price: { type: Number, required: true }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
};

// Routes

// User signup
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ user: { id: user._id } }, 'secret_key');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all tickets
app.get('/tickets', authenticateUser, async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new ticket (admin only)
app.post('/tickets', authenticateUser, async (req, res) => {
  try {
    const { eventName, price } = req.body;

    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to add a ticket' });
    }

    const newTicket = new Ticket({ eventName, price });
    await newTicket.save();

    res.status(200).json({ message: 'Ticket added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a ticket (admin only)
app.delete('/tickets/:id', authenticateUser, async (req, res) => {
  try {
    const ticketId = req.params.id;

    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to delete a ticket' });
    }

    await Ticket.findByIdAndDelete(ticketId);

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Stripe payment
app.post('/payment', authenticateUser, async (req, res) => {
  try {
    const { token, amount, eventName } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: `Ticket purchase for ${eventName}`,
      confirm: true,
      payment_method: token.id,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
