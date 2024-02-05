// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

let apartments = [
  { id: 1, name: 'Apartment A', description: 'A cozy apartment in the city center', price: 1000, image : 'test' },
  { id: 2, name: 'Apartment B', description: 'Spacious apartment with a great view', price: 1500, image : 'test' },
  { id: 3, name: 'Apartment C', description: 'Modern apartment near the park', price: 1200, image : 'test' }
];

app.use(bodyParser.json());
app.use(cors());

app.get('/apartments', (req: Request, res: Response) => {
  res.json(apartments);
});

app.get('/apartments/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const apartment = apartments.find((apt) => apt.id === parseInt(id));
  if (apartment) {
    res.json(apartment);
  } else {
    res.status(404).json({ message: 'Apartment not found' });
  }
});


app.post('/apartments', (req: Request, res: Response) => {
  const { name, description, price, image } = req.body;
  if (!name || !description || !price) {
    res.status(400).json({ message: 'Please provide name, description, and price for the apartment' });
  } else {
    const id = apartments.length + 1;
    const newApartment = { id, name, description, price, image };
    apartments.push(newApartment);
    res.status(201).json(newApartment);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
