import express from 'express';
import placesRoutes from './routes/places.routes';
const app = express();




app.get('/', (req, res) => {
  res.send('Hello World!');
});

import { pool } from "./db";

pool.query("SELECT 1")
  .then(() => console.log("✅ Database connected"))
  .catch(console.error);






app.use(express.json());
app.use('/places', placesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});