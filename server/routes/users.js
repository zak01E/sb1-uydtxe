import express from 'express';
import { z } from 'zod';
import { db } from '../database.js';

const router = express.Router();

// Validation schema for user registration
const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional()
});

// Register new user
router.post('/register', async (req, res) => {
  try {
    const user = userSchema.parse(req.body);
    
    // Check if email already exists
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', user.email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // In a real application, hash the password before storing
    const result = await db.run(`
      INSERT INTO users (firstName, lastName, email, password, phone)
      VALUES (?, ?, ?, ?, ?)
    `, [
      user.firstName,
      user.lastName,
      user.email,
      user.password, // Should be hashed in production
      user.phone
    ]);

    res.status(201).json({
      id: result.lastID,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.get('SELECT * FROM users WHERE email = ?', email);
    
    if (!user || user.password !== password) { // In production, compare hashed passwords
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In a real application, generate and return a JWT token
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user favorites
router.get('/:userId/favorites', async (req, res) => {
  try {
    const favorites = await db.all(`
      SELECT p.*, pi.imageUrl as primaryImage
      FROM favorites f
      JOIN properties p ON f.propertyId = p.id
      LEFT JOIN property_images pi ON p.id = pi.propertyId AND pi.isPrimary = 1
      WHERE f.userId = ?
    `, req.params.userId);

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add property to favorites
router.post('/:userId/favorites/:propertyId', async (req, res) => {
  try {
    const result = await db.run(`
      INSERT INTO favorites (userId, propertyId)
      VALUES (?, ?)
    `, [req.params.userId, req.params.propertyId]);

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove property from favorites
router.delete('/:userId/favorites/:propertyId', async (req, res) => {
  try {
    const result = await db.run(`
      DELETE FROM favorites
      WHERE userId = ? AND propertyId = ?
    `, [req.params.userId, req.params.propertyId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;