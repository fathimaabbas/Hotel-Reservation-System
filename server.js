const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
/*
app.get('/hotels', async (req, res) => {
    try {
        // Query to select all hotels
        const [rows] = await db.query('SELECT * FROM Hotel');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});*/

app.get('/hotels-rating', async (req, res) => {
    const searchQuery = req.query.search || '';
    try {
        let query = `
            SELECT
                h.Hotelid,
                h.HotelName,
                h.Location,
                h.Email,
                h.Phone,
                h.ImageUrl,
                ROUND(AVG(r.Rating), 1) AS rating,
                COUNT(r.Rating) AS ReviewCount
            FROM Hotel h
            LEFT JOIN Review r ON h.Hotelid = r.Hotelid
        `;

        const values = [];
        if (searchQuery) {
            query += ` WHERE h.HotelName LIKE ? OR h.Location LIKE ?`;
            values.push(`%${searchQuery}%`, `%${searchQuery}%`);
        }

        query += ` GROUP BY h.Hotelid
                   HAVING AVG(r.Rating) >= 7.5
                   ORDER BY h.HotelName ASC;`;

        const [rows] = await db.query(query, values);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Search hotels by location and room type
app.get('/search', async (req, res) => {
  const { location, roomtype } = req.query;

  try {
    let query = `
      SELECT DISTINCT h.Hotelid, h.HotelName, h.Location, h.Email, h.Phone, h.ImageUrl
      FROM Hotel h
      JOIN Room r ON h.Hotelid = r.Hotelid
      JOIN RoomType rt ON r.RoomTypeid = rt.RoomTypeid
      WHERE 1=1     
    `;
    let values = [];

     if (location) {
      query += " AND h.Location LIKE ?";
      // FIX: Use a template literal to correctly format the string
      values.push(`%${location}%`);
    }

    if (roomtype) {
      query += " AND rt.TypeName LIKE ?";
      // FIX: Use a template literal to correctly format the string
      values.push(`%${roomtype}%`);
    }


    const [rows] = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// 1️⃣ Get all hotels with average rating and concatenated reviews
app.get('/hotels', async (req, res) => {
    const searchQuery = req.query.search || '';
    try {
        let query = `
            SELECT
                h.Hotelid,
                h.HotelName,
                h.Location,
                h.Email,
                h.Phone,
                h.ImageUrl,
                ROUND(AVG(r.Rating), 1) AS rating,
                COUNT(r.Rating) AS ReviewCount
            FROM Hotel h
            LEFT JOIN Review r ON h.Hotelid = r.Hotelid
        `;
        const values = [];
        if (searchQuery) {
            query += ` WHERE h.HotelName LIKE ? OR h.Location LIKE ?`;
            values.push(`%${searchQuery}%`, `%${searchQuery}%`);
        }
        query += ' GROUP BY h.Hotelid ORDER BY h.HotelName ASC';
        const [rows] = await db.query(query, values);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 2️⃣ Search hotels by location (optional, separate endpoint)
app.get('/search', async (req,res)=>{
    const { location } = req.query;
    try{
        let query = `
            SELECT h.Hotelid, h.HotelName, h.Location, h.Email, h.Phone
            FROM Hotel h
            WHERE 1=1
        `;
        let values = [];

        if(location){
            query += " AND h.Location LIKE ?";
            values.push(`%${location}%`);
        }

        const [rows] = await db.query(query, values);
        res.json(rows);
    } catch(err){
        console.error(err);
        res.status(500).send('Database error');
    }
});

// 3️⃣ Get all reviews for a specific hotel
app.get('/reviews', async (req,res)=>{
    const hotelId = req.query.hotelId;
    if(!hotelId) return res.status(400).send('hotelId is required');

    try{
        const [rows] = await db.query('SELECT Comment, Rating FROM Review WHERE Hotelid = ?', [hotelId]);
        res.json(rows);
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 4️⃣ Submit a new review (POST)
app.post('/reviews', async (req,res)=>{
    const { hotelId, comment, rating } = req.body;
    if(!hotelId || !comment || !rating) return res.status(400).send('Missing data');

    try{
        await db.query(
            'INSERT INTO Review (Hotelid, Comment, Rating) VALUES (?, ?, ?)',
            [hotelId, comment, rating]
        );
        res.sendStatus(200);
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// --- Get all rooms of a specific hotel ---
app.get('/rooms', async (req, res) => {
  const { hotelId } = req.query;
  if (!hotelId) {
    return res.status(400).json({ error: 'Missing hotelId' });
  }

  try {
    const [rooms] = await db.query(
      `SELECT r.Roomid, r.Status, r.RoomImage, rt.TypeName, rt.Capacity
       FROM Room r
       JOIN RoomType rt ON r.RoomTypeid = rt.RoomTypeid
       WHERE r.Hotelid = ?
       ORDER BY r.Roomid`,
      [hotelId]
    );

    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/reserve', async (req, res) => {
    const { customerName, email, phone, roomId } = req.body;

    if (!customerName || !email || !phone || !roomId) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    try {
        const query = 'INSERT INTO Appointment (CustomerName, Email, Phone, Roomid) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [customerName, email, phone, roomId]);

        // You can get the auto-generated Appointmentid here if needed
        res.status(201).json({ message: 'Reservation created.', id: result.insertId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});



/*const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies from POST requests

// 1️⃣ Get all hotels for the homepage with average rating and total reviews
app.get('/hotels', async (req, res) => {
    const searchQuery = req.query.search || '';
    try {
        let query = `
            SELECT
                h.Hotelid,
                h.HotelName,
                h.Location,
                h.Email,
                h.Phone,
                h.ImageUrl,
                ROUND(AVG(r.Rating), 1) AS AverageRating,
                COUNT(r.Rating) AS ReviewCount
            FROM Hotel h
            LEFT JOIN Review r ON h.Hotelid = r.Hotelid
        `;
        const values = [];
        if (searchQuery) {
            query += ` WHERE h.HotelName LIKE ? OR h.Location LIKE ?`;
            values.push(`%${searchQuery}%`, `%${searchQuery}%`);
        }
        query += ' GROUP BY h.Hotelid';
        const [rows] = await db.query(query, values);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 2️⃣ Search for hotels with specific location and room type
app.get('/search', async (req, res) => {
    const { location, roomtype } = req.query;
    try {
        let query = `
            SELECT DISTINCT h.*, rt.TypeName, rt.Capacity
            FROM Hotel h
            JOIN Room r ON h.Hotelid = r.Hotelid
            JOIN RoomType rt ON r.RoomTypeid = rt.RoomTypeid
            WHERE 1=1
        `;
        let values = [];

        if (location) {
            query += " AND h.Location LIKE ?";
            values.push(`%${location}%`);
        }

        if (roomtype) {
            query += " AND rt.TypeName LIKE ?";
            values.push(`%${roomtype}%`);
        }

        const [rows] = await db.query(query, values);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

// 3️⃣ Get all reviews for a specific hotel ID
app.get('/reviews', async (req, res) => {
    const { hotelId } = req.query;
    if (!hotelId) return res.status(400).send('hotelId is required');

    try {
        const [rows] = await db.query('SELECT Comment, Rating FROM Review WHERE Hotelid = ?', [hotelId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 4️⃣ Submit a new review
app.post('/reviews', async (req, res) => {
    const { hotelId, comment, rating } = req.body;
    if (!hotelId || !comment || !rating) return res.status(400).send('Missing data');

    try {
        await db.query(
            'INSERT INTO Review (Hotelid, Comment, Rating) VALUES (?, ?, ?)',
            [hotelId, comment, rating]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});*/