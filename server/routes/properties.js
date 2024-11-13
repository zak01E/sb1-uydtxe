import express from 'express';
import { z } from 'zod';
import { db } from '../database.js';

const router = express.Router();

// Validation schema for property
const propertySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  type: z.enum(['house', 'apartment', 'land']),
  price: z.number().positive(),
  surface: z.number().positive(),
  rooms: z.number().optional(),
  bathrooms: z.number().optional(),
  location: z.string(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  userId: z.number()
});

// Get all properties with filters
router.get('/', async (req, res) => {
  try {
    const {
      type,
      minPrice,
      maxPrice,
      minSurface,
      maxSurface,
      rooms,
      city,
      limit = 10,
      offset = 0
    } = req.query;

    let query = `
      SELECT p.*, pi.imageUrl as primaryImage, u.firstName, u.lastName
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.propertyId AND pi.isPrimary = 1
      LEFT JOIN users u ON p.userId = u.id
      WHERE 1=1
    `;
    const params = [];

    if (type) {
      query += ` AND p.type = ?`;
      params.push(type);
    }
    if (minPrice) {
      query += ` AND p.price >= ?`;
      params.push(minPrice);
    }
    if (maxPrice) {
      query += ` AND p.price <= ?`;
      params.push(maxPrice);
    }
    if (minSurface) {
      query += ` AND p.surface >= ?`;
      params.push(minSurface);
    }
    if (maxSurface) {
      query += ` AND p.surface <= ?`;
      params.push(maxSurface);
    }
    if (rooms) {
      query += ` AND p.rooms = ?`;
      params.push(rooms);
    }
    if (city) {
      query += ` AND p.city LIKE ?`;
      params.push(`%${city}%`);
    }

    query += ` ORDER BY p.createdAt DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const properties = await db.all(query, params);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await db.get(`
      SELECT p.*, GROUP_CONCAT(pi.imageUrl) as images
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.propertyId
      WHERE p.id = ?
      GROUP BY p.id
    `, req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Convert images string to array
    property.images = property.images ? property.images.split(',') : [];

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new property
router.post('/', async (req, res) => {
  try {
    const property = propertySchema.parse(req.body);
    
    const result = await db.run(`
      INSERT INTO properties (
        title, description, type, price, surface, rooms, bathrooms,
        location, address, city, postalCode, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      property.title,
      property.description,
      property.type,
      property.price,
      property.surface,
      property.rooms,
      property.bathrooms,
      property.location,
      property.address,
      property.city,
      property.postalCode,
      property.userId
    ]);

    res.status(201).json({ id: result.lastID, ...property });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update property
router.put('/:id', async (req, res) => {
  try {
    const property = propertySchema.parse(req.body);
    
    const result = await db.run(`
      UPDATE properties SET
        title = ?, description = ?, type = ?, price = ?, surface = ?,
        rooms = ?, bathrooms = ?, location = ?, address = ?, city = ?,
        postalCode = ?
      WHERE id = ? AND userId = ?
    `, [
      property.title,
      property.description,
      property.type,
      property.price,
      property.surface,
      property.rooms,
      property.bathrooms,
      property.location,
      property.address,
      property.city,
      property.postalCode,
      req.params.id,
      property.userId
    ]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Property not found or unauthorized' });
    }

    res.json({ id: req.params.id, ...property });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run(
      'DELETE FROM properties WHERE id = ? AND userId = ?',
      [req.params.id, req.body.userId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Property not found or unauthorized' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;