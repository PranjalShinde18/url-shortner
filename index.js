import express from 'express';

import urlRoute from './routes/url.js';

const app = express();

app.use(express.json());

const PORT = 8001;

import db from './db.js';

app.use("/url", urlRoute)

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})