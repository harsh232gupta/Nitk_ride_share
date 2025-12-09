const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/Db');
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',                // dev
  'https://nitk-rideshare.vercel.app'      // replace later with real Vercel URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/rides', require('./Routes/rideRoutes'));



app.listen(PORT, () => {
  

    console.log(`Server is running on ${PORT}`)
})
